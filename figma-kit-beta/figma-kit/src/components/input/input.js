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
import React, { useRef } from 'react';
import mergeProps from 'merge-props';
import { cx } from 'class-variance-authority';
import { useSelectOnInputClick } from '@lib/react/use-select-on-input-click';
import { useComposedRefs } from '@lib/react/use-compose-refs';
const Input = React.forwardRef((props, forwardedRef) => {
    const { type = 'text', className, selectOnClick = false } = props, rest = __rest(props, ["type", "className", "selectOnClick"]);
    const ref = useRef(null);
    const composedRef = useComposedRefs(ref, forwardedRef);
    const { onMouseLeave, onMouseUp, onFocus } = useSelectOnInputClick();
    const inputProps = selectOnClick ? mergeProps({ onMouseLeave, onMouseUp, onFocus }, rest) : rest;
    return <input ref={composedRef} type={type} className={cx(className, 'fp-Input')} {...inputProps}/>;
});
Input.displayName = 'Input';
export { Input };
