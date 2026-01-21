// data/icon-db.ts
// 플러그인의 아이콘 추천 시스템을 위한 데이터베이스입니다.
// 키워드 중심의 계층적 구조로 변경되었습니다.

/**
 * 플러그인이 사용할 아이콘 에셋이 포함된 모든 Component Set의 고유 Key 목록입니다.
 * 키: Component Set을 지칭하는 이름 (IconData에서 사용)
 * 값: Figma Component Set의 고유 Key
 */
export const ICON_COMPONENT_SET_KEYS: Record<string, string> = {
  Manage: "2429e1f4402d77ad2816e0b93011ed1f6f683a04", // 관리 아이콘 세트
  Code: "3ba3aa9680d52234428fe34156f1a1933a361c58", // 코드 아이콘 세트
};

/**
 * 레이어 타입 정의
 * 모든 Component Set에서 공통으로 사용되는 레이어 타입입니다.
 */
export type LayerType = "bg" | "metaphor" | "badge_1" | "badge_2" | "invisible";

/**
 * 레이어 Z-Index 매핑
 * 숫자가 낮을수록 아래 레이어, 높을수록 위 레이어
 */
export const LAYER_Z_INDEX: Record<LayerType, number> = {
  bg: 0,        // 가장 아래 (배경)
  metaphor: 1,  // 중간 (메타포)
  badge_1: 2,   // 위 (뱃지 1)
  badge_2: 3,   // 가장 위 (뱃지 2)
  invisible: 1 // 보이지 않는 레이어 (렌더링 제외)
};

/**
 * 레이어 타입을 variant 속성에서 추출하는 헬퍼 함수
 */
export function getLayerType(variantProperties: { [key: string]: string }): LayerType | null {
  // variant 속성의 'type' 또는 'Type' 필드에서 레이어 타입 추출
  const typeValue = variantProperties.type || variantProperties.Type;
  if (!typeValue) return null;

  const lowerValue = typeValue.toLowerCase();
  if (isLayerType(lowerValue)) {
    return lowerValue as LayerType;
  }
  return null;
}

/**
 * 문자열이 유효한 LayerType인지 확인
 */
function isLayerType(value: string): value is LayerType {
  return ["bg", "metaphor", "badge_1", "badge_2", "invisible"].includes(value);
}

/**
 * 레이어 타입 배열을 z-index 순서로 정렬
 */
export function sortByLayerOrder<T extends { layer: LayerType }>(items: T[]): T[] {
  return items.sort((a, b) => LAYER_Z_INDEX[a.layer] - LAYER_Z_INDEX[b.layer]);
}

/**
 * Figma 컴포넌트의 단일 Variant 속성을 정의합니다.
 * 예: { type: 'badge_1' }, { type: 'Chart', style: 'Bar' }
 */
export interface VariantProperty {
  [key: string]: string;
}

/**
 * 키워드별 아이콘 정의입니다.
 */
export interface IconDefinition {
  description: string; // 데이터 관리용 설명
  concept: string; // 아이콘의 개념 또는 동의어 (쉼표로 구분)
  componentSet: keyof typeof ICON_COMPONENT_SET_KEYS; // 이 아이콘이 속한 Component Set의 이름
  variants: VariantProperty[]; // 추천할 Variant 속성 목록
}

/**
 * 키워드와 아이콘 정의를 매핑하는 데이터 구조입니다.
 * [keyword: string]: IconDefinition 형식입니다.
 */
export interface IconData {
  [keyword: string]: IconDefinition;
}

/**
 * 사용자 정의 아이콘 항목 (Figma pluginData에 저장)
 */
export interface CustomIconEntry {
  keyword: string;
  description: string;
  concept: string;
  componentSetKey: string; // Figma Component Set의 실제 Key
  componentSetName: string; // 사용자가 지정한 이름
  variants: VariantProperty[];
  createdAt?: string;
}

/**
 * 사용자 정의 아이콘 데이터베이스 (Figma pluginData에 저장)
 */
export interface CustomIconDatabase {
  version: string;
  lastUpdated: string;
  entries: CustomIconEntry[];
}

/**
 * 키워드-아이콘 매핑 데이터입니다.
 */
export const iconData: IconData = {
  // 관리: {
  //   description: "시스템 관리, 설정, 운영 등과 관련된 아이콘", //설명//
  //   concept: "운영, 관리",
  //   componentSet: "Manage",
  //   variants: [{ type: "badge_1" }, { type: "metaphor" }, { type: "bg" }],
  // },
  // 코드: {
  //   description: "개발, 소스코드, 데이터 등과 관련된 아이콘",
  //   concept: "코드",
  //   componentSet: "Code",

  //   variants: [{ type: "badge_1" }, { type: "metaphor" }],
  // },
  // 설정: {
  //   description: "환경설정, 옵션, 제어판 등과 관련된 아이콘",
  //   concept: "환경설정, 옵션, 제어판, 튜닝, 커스터마이징",
  //   componentSet: "Manage",
  //   variants: [{ type: "Setting" }],
  // },
  // --- 다른 키워드 예시 ---
  // "검색": {
  //   description: "데이터나 정보를 찾는 행위와 관련된 아이콘",
  //   concept: "탐색, 찾기, 조회, 서치",
  //   componentSet: "Manage",
  //   variants: [
  //     { type: "Search" },
  //   ],
  // },
};
