var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useEffect, useRef, useState } from 'react';
import * as RadixSlider from '@radix-ui/react-slider';
import { cx } from 'class-variance-authority';
import { isDeepEqual } from 'remeda';
import { useComposedRefs } from '@lib/react/use-compose-refs';
import { normalize } from '@lib/number/normalize';
const SNAP_PERCENTAGE_THRESHOLD = 2;
const DEFAULT_MIN = 0;
const DEFAULT_MAX = 100;
const DEFAULT_ORIENTATION = 'horizontal';
const DEFAULT_DIRECTION = 'ltr';
const Slider = React.forwardRef((props, forwardedRef) => {
    const { className, min = DEFAULT_MIN, max = DEFAULT_MAX, defaultValue = [min], value, onValueChange, orientation = DEFAULT_ORIENTATION, dir = DEFAULT_DIRECTION, inverted, disabled, range = true, rangeAnchor, baseValue, hints } = props, rootProps = __rest(props, ["className", "min", "max", "defaultValue", "value", "onValueChange", "orientation", "dir", "inverted", "disabled", "range", "rangeAnchor", "baseValue", "hints"]);
    const rootRef = useRef(null);
    const ref = useComposedRefs(rootRef, forwardedRef);
    const { onPointerDown, focusVisible } = useSliderVisibleFocus(rootRef);
    const [trackedValue, setTrackedValue] = useState(value !== null && value !== void 0 ? value : defaultValue);
    const prevValueRef = useRef(value);
    const prevDefaultValueRef = useRef(defaultValue);
    // Internally tracking a value even in uncontrolled mode.
    // This is required for range and hints to work.
    useEffect(() => {
        if (isDeepEqual(value, prevValueRef.current) && isDeepEqual(defaultValue, prevDefaultValueRef.current)) {
            return;
        }
        setTrackedValue(value !== null && value !== void 0 ? value : defaultValue);
        prevValueRef.current = value;
        prevDefaultValueRef.current = defaultValue;
    }, [value, defaultValue]);
    // Radix adjusts the thumb position by default to align with the track edges at min/max positions.
    // This behavior is removed via a patch (see: patches/@radix-ui__react-slider@1.2.0.patch) and replaced it with a CSS solution.
    // Additionally, we override the transform of the thumb to ensure it aligns with hints.
    useEffect(() => {
        if (rootRef.current) {
            rootRef.current.style.setProperty('--radix-slider-thumb-transform', getThumbTransform(orientation, dir, inverted));
        }
    }, [rootRef, orientation, dir, inverted]);
    const handleValueChange = (value) => {
        const snappedValue = value.map((value) => getSnappedValue(value, hints, min, max));
        onValueChange === null || onValueChange === void 0 ? void 0 : onValueChange(snappedValue);
        setTrackedValue(snappedValue);
    };
    return (<RadixSlider.Root tabIndex={-1} ref={ref} className={cx(className, 'fp-SliderRoot')} value={trackedValue} onValueChange={handleValueChange} onPointerDown={onPointerDown} min={min} max={max} orientation={orientation} dir={dir} inverted={inverted} disabled={disabled} {...rootProps}>
      <RadixSlider.Track className="fp-SliderTrack"/>

      {range && (<Range dir={dir} value={trackedValue} min={min} max={max} orientation={orientation} inverted={inverted} rangeAnchor={rangeAnchor} disabled={disabled}/>)}

      {hints &&
            hints.map((hint) => (<Hint key={hint} hint={hint} baseValue={baseValue} min={min} max={max} orientation={orientation} dir={dir} inverted={inverted}/>))}

      {trackedValue.map((v, i) => (<RadixSlider.Thumb key={i} className={cx('fp-SliderThumb', {
                'fp-SliderThumb-focusVisible': focusVisible,
                'fp-SliderThumb-baseValue': v === baseValue,
            })}/>))}
    </RadixSlider.Root>);
});
Slider.displayName = 'Slider';
const Hint = (props) => {
    const { baseValue, dir, inverted, max, min, orientation, hint } = props;
    const { startEdge } = getOrientationEdges(orientation, dir, inverted);
    const offset = normalize([min, max], [0, 100])(hint);
    const HINT_WIDTH = 4;
    return (<>
      <span className={cx('fp-SliderHint', { 'fp-SliderHint-baseValue': hint === baseValue })} data-orientation={orientation} style={{ [startEdge]: `calc(${offset}% - ${HINT_WIDTH / 2}px)` }}/>
    </>);
};
const Range = (props) => {
    const { min, max, value, rangeAnchor = min, orientation, dir, inverted, disabled } = props;
    const rangeStart = value.length > 1 ? Math.min(...value) : Math.min(rangeAnchor, ...value);
    const rangeEnd = value.length > 1 ? Math.max(...value) : Math.max(rangeAnchor, ...value);
    const offsetStart = normalize([min, max], [0, 100])(rangeStart);
    const offsetEnd = 100 - normalize([min, max], [0, 100])(rangeEnd);
    const edges = getOrientationEdges(orientation, dir, inverted);
    return (<span className="fp-SliderRange" data-orientation={orientation} data-disabled={disabled ? '' : undefined} style={{
            [edges.startEdge]: `${offsetStart}%`,
            [edges.endEdge]: `${offsetEnd}%`,
        }}/>);
};
function getOrientationEdges(orientation, dir, inverted) {
    const inversion = inverted ? 'inverted' : 'normal';
    const edges = {
        vertical: {
            normal: {
                startEdge: 'bottom',
                endEdge: 'top',
            },
            inverted: {
                startEdge: 'top',
                endEdge: 'bottom',
            },
        },
        horizontal: {
            normal: {
                startEdge: dir === 'ltr' ? 'left' : 'right',
                endEdge: dir === 'ltr' ? 'right' : 'left',
            },
            inverted: {
                startEdge: dir === 'ltr' ? 'right' : 'left',
                endEdge: dir === 'ltr' ? 'left' : 'right',
            },
        },
    };
    return edges[orientation][inversion];
}
function getThumbTransform(orientation, dir, inverted) {
    const inversion = inverted ? 'inverted' : 'normal';
    const transform = {
        vertical: {
            normal: 'translateY(50%)',
            inverted: 'translateY(-50%)',
        },
        horizontal: {
            normal: dir === 'ltr' ? 'translateX(-50%)' : 'translateX(50%)',
            inverted: dir === 'ltr' ? 'translateX(50%)' : 'translateX(-50%)',
        },
    };
    return transform[orientation][inversion];
}
/**
 * Fix :focus-visible behavior for the slider thumb, to only show outline when not dragging with the mouse.
 * The focus will remain on the Root element afterward to enable subsequent keyboard interactions.
 */
function useSliderVisibleFocus(ref) {
    const [pointerDown, setPointerDown] = useState(false);
    const handleGlobalUp = () => {
        var _a;
        setPointerDown(false);
        window.removeEventListener('pointerup', handleGlobalUp);
        (_a = ref.current) === null || _a === void 0 ? void 0 : _a.focus();
    };
    const handlePointerDown = () => {
        setPointerDown(true);
        window.addEventListener('pointerup', handleGlobalUp);
    };
    return { onPointerDown: handlePointerDown, focusVisible: !pointerDown };
}
function getSnappedValue(value, hints, min, max) {
    // TODO: snappingFactor is eyeballed to work well for most sizes, but is counterintutive.
    //       It should ideally be calculated from the width of the track, with pixel threshold of ~10.
    const snappingFactor = normalize([0, 100], [0, max - min])(SNAP_PERCENTAGE_THRESHOLD);
    const closestHint = hints === null || hints === void 0 ? void 0 : hints.find((hint) => Math.abs(hint - value) <= snappingFactor);
    if (typeof closestHint === 'number') {
        return closestHint;
    }
    return value;
}
export { Slider };
