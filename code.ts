// Figma Plugin Code (code.ts)
// Manage/bg 같이 name/character 형식의 컴포넌트를 직접 읽어와 배치합니다.

// -----------------------------------------------------------
// 1. 초기 설정 및 상수
// -----------------------------------------------------------

figma.showUI(__html__, { width: 360, height: 520, title: "아이콘 키워드 매핑" });

const DB_DATA_STRING = `
[
    {
        "keyword": "관리",
        "assets": ["Manage/invisible", "Manage/badge", "Manage/bg", "Manage/center"]
    },
    {
        "keyword": "설정",
        "assets": ["Setting/bg"]
    }
]
`;

interface IconMappingRow {
    keyword: string;
    assets: string[];
}

interface KeywordMatch {
    keyword: string;
    start: number;
    end: number;
    row: IconMappingRow;
}

type SuggestionResult = {
    menuName: string;
    splitKeywords: string[];
    matchedKeywords: string[];
    assetIds: string[];
};

const ICON_DB: IconMappingRow[] = JSON.parse(DB_DATA_STRING) as IconMappingRow[];
const DEFAULT_ICON_SIZE = 320;
const FRAME_PADDING = 40;
const LABEL_FONT: FontName = { family: "Inter", style: "Regular" };
let isLabelFontLoaded = false;

async function ensureLabelFontLoaded() {
    if (isLabelFontLoaded) {
        return;
    }
    await figma.loadFontAsync(LABEL_FONT);
    isLabelFontLoaded = true;
}

// -----------------------------------------------------------
// 2. 키워드 분석 및 매핑
// -----------------------------------------------------------

function findKeywordMatches(menuName: string): KeywordMatch[] {
    const matches: KeywordMatch[] = [];

    for (const row of ICON_DB) {
        let searchStart = 0;
        while (searchStart < menuName.length) {
            const index = menuName.indexOf(row.keyword, searchStart);
            if (index === -1) break;
            matches.push({
                keyword: row.keyword,
                start: index,
                end: index + row.keyword.length,
                row
            });
            searchStart = index + row.keyword.length;
        }
    }

    matches.sort((a, b) => {
        if (a.start === b.start) {
            return b.end - a.end;
        }
        return a.start - b.start;
    });

    const filtered: KeywordMatch[] = [];
    let currentEnd = -1;
    for (const match of matches) {
        if (match.start >= currentEnd) {
            filtered.push(match);
            currentEnd = match.end;
        }
    }

    return filtered;
}

function splitMenuNameByMatches(menuName: string, matches: KeywordMatch[]): string[] {
    const segments: string[] = [];
    let cursor = 0;
    for (const match of matches) {
        if (cursor < match.start) {
            const raw = menuName.slice(cursor, match.start);
            if (raw) {
                segments.push(raw);
            }
        }
        segments.push(match.keyword);
        cursor = match.end;
    }

    if (cursor < menuName.length) {
        const tail = menuName.slice(cursor);
        if (tail) {
            segments.push(tail);
        }
    }

    if (segments.length === 0 && menuName) {
        segments.push(menuName);
    }

    return segments;
}

function buildSuggestion(menuName: string): SuggestionResult {
    const trimmed = menuName.trim();
    if (!trimmed) {
        return {
            menuName: "",
            splitKeywords: [],
            matchedKeywords: [],
            assetIds: []
        };
    }

    const matches = findKeywordMatches(trimmed);
    const splitKeywords = splitMenuNameByMatches(trimmed, matches);
    const matchedKeywords = matches.map((match) => match.keyword);
    const assetIds = matches.reduce<string[]>((acc, match) => {
        acc.push(...match.row.assets);
        return acc;
    }, []);

    return {
        menuName: trimmed,
        splitKeywords,
        matchedKeywords,
        assetIds
    };
}

async function createLocalAssetFrame(assetName: string): Promise<FrameNode> {
    await ensureLabelFontLoaded();

    const icon = figma.createRectangle();
    icon.name = assetName;
    icon.resize(DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE);
    icon.cornerRadius = 12;
    icon.fills = [{ type: 'SOLID', color: { r: 0.96, g: 0.96, b: 0.96 } }];
    icon.strokes = [{ type: 'SOLID', color: { r: 0.82, g: 0.82, b: 0.82 } }];
    icon.strokeWeight = 2;

    const label = figma.createText();
    label.fontName = LABEL_FONT;
    label.characters = assetName;
    label.fontSize = 16;
    label.lineHeight = { unit: 'AUTO' };
    label.fills = [{ type: 'SOLID', color: { r: 0.25, g: 0.25, b: 0.25 } }];

    const optionFrame = figma.createFrame();
    optionFrame.name = assetName;
    optionFrame.layoutMode = 'VERTICAL';
    optionFrame.primaryAxisAlignItems = 'CENTER';
    optionFrame.counterAxisAlignItems = 'CENTER';
    optionFrame.paddingTop = optionFrame.paddingRight = optionFrame.paddingBottom = optionFrame.paddingLeft = FRAME_PADDING;
    optionFrame.itemSpacing = 16;
    optionFrame.fills = [];

    optionFrame.appendChild(icon);
    optionFrame.appendChild(label);

    return optionFrame;
}

async function placeIconInstances(assetIds: string[], menuName: string) {
    if (assetIds.length === 0) {
        figma.notify("해당 이름 구조의 컴포넌트를 찾지 못했습니다.", { timeout: 3000 });
        return;
    }

    const selection = figma.currentPage.selection;
    const startX = selection.length > 0 ? selection[0].x + selection[0].width + 100 : 100;
    const startY = selection.length > 0 ? selection[0].y : 100;

    const suggestionFrame = figma.createFrame();
    suggestionFrame.name = `📁 ${menuName} 컴포넌트`;
    suggestionFrame.layoutMode = 'VERTICAL';
    suggestionFrame.primaryAxisAlignItems = 'CENTER';
    suggestionFrame.counterAxisAlignItems = 'CENTER';
    suggestionFrame.paddingTop = suggestionFrame.paddingRight = suggestionFrame.paddingBottom = suggestionFrame.paddingLeft = FRAME_PADDING;
    suggestionFrame.itemSpacing = 40;
    suggestionFrame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    suggestionFrame.cornerRadius = 12;
    suggestionFrame.x = startX;
    suggestionFrame.y = startY;

    figma.currentPage.appendChild(suggestionFrame);

    figma.notify(`Figma 캔버스에 ${assetIds.length}개의 컴포넌트를 배치합니다.`, { timeout: 2000 });

    for (const [index, componentName] of assetIds.entries()) {
        try {
            const instance = await createLocalAssetFrame(componentName);
            instance.name = `Option ${index + 1} · ${componentName}`;
            suggestionFrame.appendChild(instance);
        } catch (error) {
            console.error(`아이콘 배치 중 오류 발생: ${componentName}`, error);
            figma.notify(`'${componentName}' 배치 실패.`, { timeout: 3000 });
        }
    }

    figma.currentPage.selection = [suggestionFrame];
    figma.viewport.scrollAndZoomIntoView([suggestionFrame]);
}

// -----------------------------------------------------------
// 3. Figma UI 통신
// -----------------------------------------------------------

figma.ui.onmessage = async (msg) => {
    if (msg.type === 'suggest-icons') {
        const menuName: string = msg.menuName?.toString() ?? "";
        try {
            const result = buildSuggestion(menuName);
            figma.ui.postMessage({ type: 'suggestions-result', result });
            await placeIconInstances(result.assetIds, result.menuName);
        } catch (error) {
            console.error(error);
            const errorMessage = error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.";
            figma.ui.postMessage({ type: 'suggestions-error', message: errorMessage });
        }
    }
};
