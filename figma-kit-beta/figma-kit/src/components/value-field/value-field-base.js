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
import React, { useRef, useState } from 'react';
import { cx } from 'class-variance-authority';
import mergeProps from 'merge-props';
import { Input } from '@components/input';
import { useComposedRefs } from '@lib/react/use-compose-refs';
import { DEFAULT_BIG_NUDGE, DEFAULT_SMALL_NUDGE } from '@lib/constants';
import { useValueFieldContext } from '@components/value-field/value-field-elements';
const Base = (props) => {
    const { className, inputRef: forwardedRef, value: valueProp, onChange, smallNudge = DEFAULT_SMALL_NUDGE, bigNudge = DEFAULT_BIG_NUDGE, formatter, disabled } = props, fieldProps = __rest(props, ["className", "inputRef", "value", "onChange", "smallNudge", "bigNudge", "formatter", "disabled"]);
    const ref = useRef(null);
    const composedRef = useComposedRefs(forwardedRef, ref);
    const [editingValue, setEditingValue] = useState(null);
    const inputValue = editingValue !== null && editingValue !== void 0 ? editingValue : formatter.format(valueProp);
    const context = useValueFieldContext('ValueField');
    const submit = (input) => {
        const parserResult = formatter.parse(input, valueProp);
        if (input.length === 0 || !parserResult.valid || parserResult.value === valueProp) {
            return revert();
        }
        setEditingValue(null);
        onChange(parserResult.value);
    };
    const revert = () => {
        setEditingValue(null);
    };
    const handleChange = (event) => {
        setEditingValue(event.currentTarget.value);
    };
    const handleKeyDown = (event) => {
        const inputElement = event.currentTarget;
        if (event.key === 'Enter') {
            event.preventDefault();
            inputElement.blur();
        }
        if (event.key === 'Escape') {
            event.preventDefault();
            revert();
            // TODO: Needs better solution
            // Delegate selection to the next tick to make sure it happens after value is set.
            requestAnimationFrame(() => {
                inputElement.blur();
            });
        }
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            if (!formatter.incrementBy) {
                return;
            }
            event.preventDefault();
            const parseResult = formatter.parse(inputElement.value, valueProp);
            const oldValue = parseResult.valid ? parseResult.value : valueProp;
            const nudge = event.shiftKey ? bigNudge : smallNudge;
            const amount = event.key === 'ArrowUp' ? nudge : -nudge;
            const incrementTargets = formatter.getIncrementTargets ? formatter.getIncrementTargets(inputElement) : null;
            const newValue = formatter.incrementBy(oldValue, amount, incrementTargets);
            submit(formatter.format(newValue));
            // TODO: Needs better solution
            // Delegate selection to the next tick to make sure it happens after value is set.
            requestAnimationFrame(() => {
                if (incrementTargets && formatter.getIncrementSelection) {
                    const [start, end] = formatter.getIncrementSelection(incrementTargets);
                    inputElement.setSelectionRange(start, end);
                }
                else {
                    inputElement.select();
                }
            });
        }
    };
    const handleBlur = (event) => {
        submit(event.currentTarget.value);
    };
    return (<Input ref={composedRef} dir="auto" autoComplete="off" spellCheck="false" selectOnClick={true} className={cx(className, 'fp-ValueFieldBase')} value={inputValue} onChange={handleChange} disabled={disabled || (context === null || context === void 0 ? void 0 : context.disabled)} {...mergeProps(fieldProps, { onBlur: handleBlur, onKeyDown: handleKeyDown })}/>);
};
Base.displayName = 'ValueField.Base';
export { Base };
