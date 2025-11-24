/**
 * @license
 * MIT License
 * Copyright (c) 2022 WorkOS
 * https://github.com/radix-ui/primitives/blob/main/LICENSE
 * */
import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useCallbackRef(callback) {
    const callbackRef = React.useRef(callback);
    React.useEffect(() => {
        callbackRef.current = callback;
    });
    // https://github.com/facebook/react/issues/19240
    return React.useMemo(() => ((...args) => { var _a; return (_a = callbackRef.current) === null || _a === void 0 ? void 0 : _a.call(callbackRef, ...args); }), []);
}
function useControllableState({ prop, defaultProp, onChange = () => { } }) {
    const [uncontrolledProp, setUncontrolledProp] = useUncontrolledState({ defaultProp, onChange });
    const isControlled = prop !== undefined;
    const value = isControlled ? prop : uncontrolledProp;
    const handleChange = useCallbackRef(onChange);
    const setValue = React.useCallback((nextValue) => {
        if (isControlled) {
            const setter = nextValue;
            const value = typeof nextValue === 'function' ? setter(prop) : nextValue;
            if (value !== prop)
                handleChange(value);
        }
        else {
            setUncontrolledProp(nextValue);
        }
    }, [isControlled, prop, setUncontrolledProp, handleChange]);
    return [value, setValue];
}
function useUncontrolledState({ defaultProp, onChange }) {
    const uncontrolledState = React.useState(defaultProp);
    const [value] = uncontrolledState;
    const prevValueRef = React.useRef(value);
    const handleChange = useCallbackRef(onChange);
    React.useEffect(() => {
        if (prevValueRef.current !== value) {
            handleChange(value);
            prevValueRef.current = value;
        }
    }, [value, prevValueRef, handleChange]);
    return uncontrolledState;
}
export { useControllableState };
