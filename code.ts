// Figma Plugin Code (code.ts)
// 로컬 데이터는 별도 모듈에서 import하여 관리합니다.
import { ICON_DB as ICON_DB_DATA, IconMappingRow } from "./data/icon-db";
import { NODE_ID_MAP as NODE_ID_MAP_DATA } from "./data/node-id-map";

// -----------------------------------------------------------
// 1. 초기 설정 및 상수
// -----------------------------------------------------------

figma.showUI(__html__, { width: 360, height: 550, title: "아이콘 매핑 제안" });

type MatchType = "exact" | "concept" | "synonym";

interface MatchDetail {
  inputToken: string | null;
  matchedKeyword: string;
  matchType: MatchType;
  similarity: number;
}

interface MatchCandidate {
  row: IconMappingRow;
  score: number;
  detail: MatchDetail;
}

interface AssetGroup {
  keyword: string;
  position: number;
  assets: string[];
}

type AssetCombination = string[];

interface MissingKeywordSuggestion {
  missing: string;
  related_keywords: Array<{
    keyword: string;
    similarity: number;
  }>;
}

interface SuggestionResult {
  keywords: string[];
  asset_ids: string[];
  asset_combinations: AssetCombination[];
  confidence_score: number;
  input_keywords: string[];
  missing_keywords: string[];
  missing_keyword_suggestions: MissingKeywordSuggestion[];
  match_details: MatchDetail[];
}

const ICON_DB: IconMappingRow[] = ICON_DB_DATA;
const SPECIAL_CHART_ASSETS = ["Icon/Data/Chart_Pie", "Icon/Data/Chart_Bar"];
const SPECIAL_ALERT_ASSET = "Icon/Alert/Warning_Badge";
const DEFAULT_ICON_SIZE = 320;
const NODE_ID_MAP: Record<string, string> = NODE_ID_MAP_DATA;

const FEATURE_LAYER_PRIORITY: Record<string, number> = {
  invisible: 6,
  badge_1: 5,
  bg: 0,
  metaphor: 1,
};

const componentCache = new Map<string, ComponentNode | null>();

function getComponentNode(assetName: string): ComponentNode | null {
  if (componentCache.has(assetName)) {
    return componentCache.get(assetName) ?? null;
  }

  let component: ComponentNode | null = null;

  // NOTE: documentAccess가 dynamic-page라 getNodeById*를 사용할 수 없어
  // 현재 페이지에서 이름으로만 컴포넌트를 찾습니다.
  component = figma.currentPage.findOne(
    (node) => node.type === "COMPONENT" && node.name.includes(assetName)
  ) as ComponentNode | null;

  if (!component) {
    const featureName = assetName.split("/").pop();
    if (featureName) {
      component = figma.currentPage.findOne(
        (node) => node.type === "COMPONENT" && node.name.includes(featureName)
      ) as ComponentNode | null;
    }
  }

  componentCache.set(assetName, component ?? null);
  return component;
}

function isAssetAvailable(assetName: string): boolean {
  return Boolean(assetName && getComponentNode(assetName));
}

// -----------------------------------------------------------
// 2. 로컬 매핑 기반 아이콘 추천 로직
// -----------------------------------------------------------

function normalizeMenuName(menuName: string): string {
  return menuName.replace(/[^가-힣a-zA-Z0-9]/g, "").toLowerCase();
}

function extractInputKeywords(menuName: string): string[] {
  const normalized = normalizeMenuName(menuName);
  const keywords = new Set<string>();
  for (const row of ICON_DB) {
    const keywordNormalized = normalizeMenuName(row.keyword);
    if (!keywordNormalized) continue;
    if (normalized.includes(keywordNormalized)) {
      keywords.add(row.keyword);
    }
  }
  return Array.from(keywords);
}

function identifyMissingKeywords(
  menuName: string,
  matchedKeywords: string[]
): string[] {
  const normalized = normalizeMenuName(menuName);
  if (!normalized) return [];

  let residual = normalized;
  const sortedMatched = matchedKeywords
    .map((keyword) => normalizeMenuName(keyword))
    .filter(Boolean)
    .sort((a, b) => b.length - a.length);

  for (const keyword of sortedMatched) {
    residual = residual.split(keyword).join(" ");
  }

  const tokens =
    residual
      .split(/[^가-힣a-zA-Z0-9]+/g)
      .map((token) => token.trim())
      .filter((token) => token.length >= 2) ?? [];

  return Array.from(new Set(tokens));
}

function findRelatedKeywords(
  token: string,
  limit = 3
): MissingKeywordSuggestion["related_keywords"] {
  const normalizedToken = normalizeMenuName(token);
  if (!normalizedToken) return [];

  const scored: MissingKeywordSuggestion["related_keywords"] = [];

  for (const row of ICON_DB) {
    const keywordNormalized = normalizeMenuName(row.keyword);
    let bestScore = 0;

    if (keywordNormalized) {
      if (
        normalizedToken.includes(keywordNormalized) ||
        keywordNormalized.includes(normalizedToken)
      ) {
        bestScore = Math.max(bestScore, 0.7);
      }
      bestScore = Math.max(
        bestScore,
        getSimilarityScore(normalizedToken, keywordNormalized)
      );
    }

    for (const conceptToken of tokenizeConcept(row.concept)) {
      const conceptNormalized = normalizeMenuName(conceptToken);
      if (!conceptNormalized) continue;
      if (
        normalizedToken.includes(conceptNormalized) ||
        conceptNormalized.includes(normalizedToken)
      ) {
        bestScore = Math.max(bestScore, 0.6);
      }
      bestScore = Math.max(
        bestScore,
        getSimilarityScore(normalizedToken, conceptNormalized)
      );
    }

    if (bestScore >= 0.25) {
      scored.push({
        keyword: row.keyword,
        similarity: Number(bestScore.toFixed(2)),
      });
    }
  }

  scored.sort(
    (a, b) => b.similarity - a.similarity || a.keyword.localeCompare(b.keyword)
  );

  return scored.slice(0, limit);
}

function buildMissingKeywordSuggestions(
  menuName: string,
  matchedKeywords: string[]
): MissingKeywordSuggestion[] {
  const missing = identifyMissingKeywords(menuName, matchedKeywords);
  return missing.map((token) => ({
    missing: token,
    related_keywords: findRelatedKeywords(token),
  }));
}

function getBigrams(text: string): string[] {
  if (!text) return [];
  if (text.length === 1) return [text];
  const grams: string[] = [];
  for (let i = 0; i < text.length - 1; i += 1) {
    grams.push(text.slice(i, i + 2));
  }
  return grams;
}

function getSimilarityScore(source: string, target: string): number {
  const sourceNorm = normalizeMenuName(source);
  const targetNorm = normalizeMenuName(target);
  const gramsA = getBigrams(sourceNorm);
  const gramsB = getBigrams(targetNorm);
  if (gramsA.length === 0 || gramsB.length === 0) {
    return 0;
  }
  const setA = new Set(gramsA);
  const setB = new Set(gramsB);
  let intersection = 0;
  for (const gram of setA) {
    if (setB.has(gram)) {
      intersection += 1;
    }
  }
  const union = setA.size + setB.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

function tokenizeConcept(concept: string): string[] {
  return concept
    .split(",")
    .map((token) => token.trim().toLowerCase().replace(/\s+/g, ""))
    .filter(Boolean);
}

function findMatchCandidates(menuName: string): MatchCandidate[] {
  const normalized = normalizeMenuName(menuName);
  const candidates: MatchCandidate[] = [];

  for (const row of ICON_DB) {
    const keywordNormalized = normalizeMenuName(row.keyword);
    let bestScore = 0;
    let bestDetail: MatchDetail | null = null;

    if (keywordNormalized && normalized.includes(keywordNormalized)) {
      bestScore = 1;
      bestDetail = {
        inputToken: row.keyword,
        matchedKeyword: row.keyword,
        matchType: "exact",
        similarity: 1,
      };
    } else if (keywordNormalized) {
      const similarity = getSimilarityScore(normalized, keywordNormalized);
      if (similarity > bestScore) {
        bestScore = similarity;
        bestDetail = {
          inputToken: null,
          matchedKeyword: row.keyword,
          matchType: "synonym",
          similarity,
        };
      }
    }

    const conceptTokens = tokenizeConcept(row.concept);
    for (const token of conceptTokens) {
      const tokenNormalized = normalizeMenuName(token);
      if (!tokenNormalized) continue;

      // When the input exactly matches another keyword (e.g., "설정"),
      // avoid treating a concept token of a different keyword (e.g., 관리의 "설정") as a match.
      if (normalized === tokenNormalized && keywordNormalized !== normalized) {
        continue;
      }

      if (normalized.includes(tokenNormalized)) {
        const conceptScore = 0.9;
        if (conceptScore > bestScore) {
          bestScore = conceptScore;
          bestDetail = {
            inputToken: token,
            matchedKeyword: row.keyword,
            matchType: "concept",
            similarity: conceptScore,
          };
        }
      } else {
        const similarity = getSimilarityScore(normalized, tokenNormalized);
        if (similarity > bestScore) {
          bestScore = similarity;
          bestDetail = {
            inputToken: token,
            matchedKeyword: row.keyword,
            matchType: "synonym",
            similarity,
          };
        }
      }
    }

    if (bestDetail && bestScore >= 0.35) {
      candidates.push({
        row,
        score: bestScore,
        detail: {
          ...bestDetail,
          similarity: Number(bestScore.toFixed(2)),
        },
      });
    }
  }

  return candidates.sort((a, b) => b.score - a.score);
}

function appendSpecialRuleAssets(menuName: string, assets: string[]): string[] {
  const normalized = normalizeMenuName(menuName);
  const result = [...assets];

  if (normalized.includes("별")) {
    const chartAsset =
      SPECIAL_CHART_ASSETS[assets.length % SPECIAL_CHART_ASSETS.length];
    if (isAssetAvailable(chartAsset)) {
      result.push(chartAsset);
    }
  }

  if (normalized.includes("미")) {
    if (isAssetAvailable(SPECIAL_ALERT_ASSET)) {
      result.push(SPECIAL_ALERT_ASSET);
    }
  }

  return result;
}

function getAssetZIndex(assetName: string): number {
  const parts = assetName.split("/");
  const feature = parts.length > 1 ? parts[1] : parts[0];
  return FEATURE_LAYER_PRIORITY[feature] ?? 0;
}

function getKeywordPosition(menuName: string, keyword: string): number {
  const index = menuName.indexOf(keyword);
  return index >= 0 ? index : -1;
}

function buildKeywordAssetGroups(
  menuName: string,
  rows: IconMappingRow[]
): AssetGroup[] {
  const groups: AssetGroup[] = [];

  for (const row of rows) {
    const position = getKeywordPosition(menuName, row.keyword);
    const assets = row.assets.filter(
      (assetId) => Boolean(assetId) && isAssetAvailable(assetId)
    );
    if (assets.length === 0) {
      continue;
    }
    groups.push({
      keyword: row.keyword,
      position,
      assets,
    });
  }

  groups.sort((a, b) => {
    const posA = a.position >= 0 ? a.position : Number.MAX_SAFE_INTEGER;
    const posB = b.position >= 0 ? b.position : Number.MAX_SAFE_INTEGER;
    if (posA === posB) {
      return a.keyword.localeCompare(b.keyword);
    }
    return posA - posB;
  });

  return groups;
}

function hasLayerConflict(assets: string[]): boolean {
  const seen = new Set<number>();
  for (const asset of assets) {
    const zIndex = getAssetZIndex(asset);
    if (seen.has(zIndex)) {
      return true;
    }
    seen.add(zIndex);
  }
  return false;
}

function computeAssetCombinations(groups: AssetGroup[]): AssetCombination[] {
  if (groups.length === 0) {
    return [];
  }

  let combinations: AssetCombination[] = [[]];

  for (const group of groups) {
    const next: AssetCombination[] = [];
    for (const combo of combinations) {
      for (const asset of group.assets) {
        const candidate = [...combo, asset];
        if (hasLayerConflict(candidate)) {
          continue;
        }
        next.push(candidate);
      }
    }
    combinations = next;
    if (combinations.length === 0) {
      break;
    }
  }

  return combinations;
}

async function createFallbackFrame(componentName: string): Promise<FrameNode> {
  const fallbackFrame = figma.createFrame();
  fallbackFrame.name = `${componentName} (FALLBACK)`;
  fallbackFrame.layoutMode = "VERTICAL";
  fallbackFrame.layoutSizingHorizontal = "FIXED";
  fallbackFrame.layoutSizingVertical = "FIXED";
  fallbackFrame.primaryAxisAlignItems = "CENTER";
  fallbackFrame.counterAxisAlignItems = "CENTER";
  fallbackFrame.paddingTop =
    fallbackFrame.paddingRight =
    fallbackFrame.paddingBottom =
    fallbackFrame.paddingLeft =
      16;
  fallbackFrame.itemSpacing = 12;
  fallbackFrame.fills = [
    { type: "SOLID", color: { r: 0.95, g: 0.95, b: 0.95 } },
  ];
  fallbackFrame.resize(DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE);

  const fallbackIcon = figma.createRectangle();
  fallbackIcon.name = "Placeholder Icon";
  fallbackIcon.resize(DEFAULT_ICON_SIZE - 32, DEFAULT_ICON_SIZE - 32);
  fallbackIcon.cornerRadius = 16;
  fallbackIcon.fills = [
    { type: "SOLID", color: { r: 0.85, g: 0.85, b: 0.85 } },
  ];

  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  const textNode = figma.createText();
  textNode.characters = componentName;
  textNode.fontSize = 18;
  textNode.fills = [{ type: "SOLID", color: { r: 0.3, g: 0.3, b: 0.3 } }];

  fallbackFrame.appendChild(fallbackIcon);
  fallbackFrame.appendChild(textNode);

  return fallbackFrame;
}

async function createIconInstance(componentName: string): Promise<SceneNode> {
  const componentNode = getComponentNode(componentName);

  if (componentNode) {
    const instance = componentNode.createInstance();
    instance.name = componentName;
    return instance;
  }

  return createFallbackFrame(componentName);
}

function getLocalIconSuggestion(menuName: string): SuggestionResult {
  const candidates = findMatchCandidates(menuName);
  const matchedRows = candidates.map((candidate) => candidate.row);
  const keywords = matchedRows.map((row) => row.keyword);
  const matchDetails = candidates.map((candidate) => candidate.detail);
  const inputKeywords = extractInputKeywords(menuName);
  const missingKeywordSuggestions = buildMissingKeywordSuggestions(
    menuName,
    keywords
  );
  const missingKeywords = missingKeywordSuggestions.map((item) => item.missing);
  const fallbackRow = ICON_DB.find((row) => row.keyword === "현황");

  const groups =
    matchedRows.length > 0
      ? buildKeywordAssetGroups(menuName, matchedRows)
      : fallbackRow
      ? buildKeywordAssetGroups(menuName, [fallbackRow])
      : [];

  const baseAssets = groups.reduce<string[]>((acc, group) => {
    acc.push(...group.assets);
    return acc;
  }, []);

  const enrichedAssets = appendSpecialRuleAssets(menuName, baseAssets);
  if (enrichedAssets.length > baseAssets.length) {
    const extras = enrichedAssets.slice(baseAssets.length);
    const availableExtras = extras.filter(isAssetAvailable);
    if (availableExtras.length > 0) {
      groups.push({
        keyword: "__special__",
        position: Number.MAX_SAFE_INTEGER,
        assets: availableExtras,
      });
    }
  }

  let combinations = computeAssetCombinations(groups);
  if (combinations.length === 0 && baseAssets.length > 0) {
    combinations = baseAssets.map((asset) => [asset]);
  }

  const flattenedAssets = combinations.reduce<string[]>((acc, combo) => {
    acc.push(...combo);
    return acc;
  }, []);
  const uniqueAssetIds = Array.from(new Set(flattenedAssets));

  const confidence =
    matchedRows.length > 0 ? Math.min(1, 0.5 + matchedRows.length * 0.2) : 0.2;

  return {
    keywords: keywords.length > 0 ? keywords : ["현황"],
    asset_ids: uniqueAssetIds,
    asset_combinations: combinations,
    confidence_score: Number(confidence.toFixed(2)),
    input_keywords: inputKeywords,
    missing_keywords: missingKeywords,
    missing_keyword_suggestions: missingKeywordSuggestions,
    match_details: matchDetails,
  };
}

// -----------------------------------------------------------
// 3. Figma UI 통신 및 컴포넌트 배치
// -----------------------------------------------------------

figma.ui.onmessage = async (msg) => {
  if (msg.type === "suggest-icons") {
    const menuName: string = msg.menuName?.toString() ?? "";
    try {
      const result = getLocalIconSuggestion(menuName);
      figma.ui.postMessage({ type: "suggestions-result", result });
      await placeIconCombinations(result.asset_combinations, menuName);
    } catch (error) {
      console.error(error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다.";
      figma.ui.postMessage({
        type: "suggestions-error",
        message: errorMessage,
      });
    }
  }
};

async function placeIconCombinations(
  assetCombos: AssetCombination[],
  menuName: string
): Promise<void> {
  if (assetCombos.length === 0) {
    figma.notify("매핑된 아이콘 조합을 찾지 못했습니다.", { timeout: 3000 });
    return;
  }

  const selection = figma.currentPage.selection;
  const startX =
    selection.length > 0 ? selection[0].x + selection[0].width + 100 : 100;
  const startY = selection.length > 0 ? selection[0].y : 100;

  const suggestionFrame = figma.createFrame();
  suggestionFrame.name = `💡 ${menuName} 아이콘 제안`;
  suggestionFrame.layoutMode = "VERTICAL";
  suggestionFrame.layoutSizingHorizontal = "HUG";
  suggestionFrame.layoutSizingVertical = "HUG";
  suggestionFrame.paddingTop =
    suggestionFrame.paddingRight =
    suggestionFrame.paddingBottom =
    suggestionFrame.paddingLeft =
      24;
  suggestionFrame.itemSpacing = 40;
  suggestionFrame.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  suggestionFrame.cornerRadius = 10;
  suggestionFrame.resize(Math.max(400, DEFAULT_ICON_SIZE + 80), 100);
  suggestionFrame.x = startX;
  suggestionFrame.y = startY;

  figma.currentPage.appendChild(suggestionFrame);
  figma.notify(
    `Figma 캔버스에 ${assetCombos.length}개의 아이콘 조합을 배치합니다.`,
    { timeout: 2000 }
  );

  for (const [index, combo] of assetCombos.entries()) {
    try {
      const comboFrame = figma.createFrame();
      comboFrame.name = `Option ${index + 1}`;
      comboFrame.layoutMode = "VERTICAL";
      comboFrame.layoutSizingHorizontal = "HUG";
      comboFrame.layoutSizingVertical = "HUG";
      comboFrame.primaryAxisAlignItems = "CENTER";
      comboFrame.counterAxisAlignItems = "CENTER";
      comboFrame.itemSpacing = 12;
      comboFrame.fills = [];
      comboFrame.resize(DEFAULT_ICON_SIZE + 20, DEFAULT_ICON_SIZE + 60);

      const stackFrame = figma.createFrame();
      stackFrame.name = `Stack ${index + 1}`;
      stackFrame.resize(DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE);
      stackFrame.clipsContent = true;
      stackFrame.fills = [];

      const sortedCombo = combo
        .slice()
        .sort((a, b) => getAssetZIndex(a) - getAssetZIndex(b));

      for (const assetName of sortedCombo) {
        const instance = await createIconInstance(assetName);
        if (instance.type === "INSTANCE") {
          instance.resize(DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE);
        }
        instance.x = 0;
        instance.y = 0;
        stackFrame.appendChild(instance);
      }

      await figma.loadFontAsync({ family: "Inter", style: "Regular" });
      const label = figma.createText();
      label.characters = combo.join(" + ");
      label.fontSize = 14;
      label.fills = [{ type: "SOLID", color: { r: 0.3, g: 0.3, b: 0.3 } }];

      comboFrame.appendChild(stackFrame);
      comboFrame.appendChild(label);
      suggestionFrame.appendChild(comboFrame);
    } catch (error) {
      console.error(`아이콘 배치 중 오류 발생 (조합 ${index + 1})`, error);
      figma.notify(`아이콘 조합 ${index + 1} 배치 실패. 콘솔 확인.`, {
        timeout: 3000,
      });
    }
  }

  figma.currentPage.selection = [suggestionFrame];
  figma.viewport.scrollAndZoomIntoView([suggestionFrame]);
}
