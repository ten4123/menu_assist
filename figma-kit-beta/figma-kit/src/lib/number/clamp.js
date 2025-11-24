export function clamp(value, min, max) {
    if (!max) {
        max = min;
        min = -Infinity;
    }
    return Math.min(Math.max(value, min), max);
}
