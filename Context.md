# Project Context: Menu Assist Plugin

## Current Objective
- **Finalize Icon Combination Logic**: Establishing a robust, "human-like" logic that combines assets based on the user's exact keyword inputs.

## Asset Combination Logic (v4: Keyword-Centric Stacking)
**Current Status**: ✅ Stable / "Best Logic"
The logic has been refactored to prioritize the **sequence of input keywords**, ensuring that the resulting icon literally represents the user's phrase "word by word".

### Core Algorithm
1.  **Sequence Respecting**:
    - Input: "Code Manage"
    - Step 1: Find best 'Code' assets.
    - Step 2: Find best 'Manage' assets.
    - The order is preserved. The first keyword is the "Base", subsequent keywords are "Stacked" on top.

2.  **Cartesian Product with Layer Safety**:
    - The engine attempts to combine ONE asset from 'Code' with ANY asset from 'Manage'.
    - **Constraint**: `hasLayerConflict` checks if two assets share the same `LayerType` (e.g., two Backgrounds). If they do, that specific combination is discarded.
    - **Result**: "Code(Bg) + Manage(Bg)" -> ❌ Discarded.
    - **Result**: "Code(Bg) + Manage(Badge)" -> ✅ Valid "Hybrid" Icon.

3.  **Robustness Improvements**:
    - **Case-Insensitive Matching**: Now finds assets even if Figma properties are "Type" vs "type" or "Metaphor" vs "metaphor".
    - **Fallback Frames**: Displays a clean "Missing" placeholder if an asset is not found, rather than crashing.
    - **Diversity Enforced**: naturally by the keyword stacking nature.

## Previous Initiatives
- **v3 GAS Sync**: Implemented Bi-directional sync with Google Sheets (currently active).
- **v2 Layer Logic**: Tried to fill slots (bg, metaphor) regardless of keyword source. (Abandoned in favor of v4 Stacking).

## Next Steps
- Polish UI for final release.
- Verify corner cases with complex 3+ keyword inputs.
