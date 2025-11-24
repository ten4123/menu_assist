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
import React, { useMemo } from 'react';
import { clamp, pipe, round } from 'remeda';
import evaluate from '@emmetio/math-expression';
import { normalize } from '@lib/number/normalize';
import { Base } from './value-field-base';
const MAX_SUPPORTED_PRECISION = 15;
const Numeric = React.forwardRef((props, ref) => {
    const { value, onChange, min, max, targetRange, precision, suffix, allowedUnits } = props, inputProps = __rest(props, ["value", "onChange", "min", "max", "targetRange", "precision", "suffix", "allowedUnits"]);
    const formatter = useMemo(() => createFormatter({ min, max, precision, targetRange, suffix, allowedUnits }), [min, max, precision, targetRange, suffix, allowedUnits]);
    return <Base inputRef={ref} value={value} onChange={onChange} formatter={formatter} {...inputProps}/>;
});
function createFormatter(options = {}) {
    const { min, max, targetRange, precision = MAX_SUPPORTED_PRECISION, suffix, allowedUnits = [] } = options;
    const { toDisplayValue, fromDisplayValue } = getValueTransformers({ min, max, targetRange });
    return {
        parse: (input, currentValue) => {
            try {
                return {
                    valid: true,
                    value: pipe(input, (input) => evaluateExpression({
                        expression: input,
                        displayValue: toDisplayValue(currentValue),
                        suffix,
                        allowedUnits,
                    }), round(precision), fromDisplayValue, clamp({ min, max })),
                };
            }
            catch (_a) {
                return { valid: false };
            }
        },
        format: (value) => {
            return pipe(value, clamp({ min, max }), toDisplayValue, round(precision), (value) => toValueString(value, suffix));
        },
        incrementBy(value, amount) {
            return value + fromDisplayValue(amount);
        },
    };
}
function getValueTransformers(props) {
    const { min, max, targetRange } = props;
    if (!targetRange) {
        return {
            toDisplayValue: (value) => value,
            fromDisplayValue: (value) => value,
        };
    }
    if (typeof min !== 'number' || typeof max !== 'number') {
        throw Error("'targetRange' requires specifying 'min' and 'max'.");
    }
    if (min === max) {
        throw Error("'min' and 'max' cannot be equal.");
    }
    return {
        toDisplayValue: normalize([min, max], targetRange),
        fromDisplayValue: normalize(targetRange, [min, max]),
    };
}
function toValueString(value, suffix) {
    if (Number.isNaN(value)) {
        return '';
    }
    return suffix ? `${value}${suffix}` : `${value}`;
}
function evaluateExpression(params) {
    const { displayValue, expression, suffix = '', allowedUnits = [] } = params;
    const numberPattern = '(\\d*\\.?\\d+)';
    const unitsPattern = `(?:${[...allowedUnits, suffix].join('|')})*`;
    const modifiedExpression = expression
        .replace(new RegExp(`${numberPattern}${unitsPattern}`, 'gi'), (_, p1) => p1)
        .replace(new RegExp(`${unitsPattern}${numberPattern}`, 'gi'), (_, p1) => p1)
        .replace(new RegExp(`${numberPattern}%`, 'gi'), (_, p1) => `(${displayValue}*${p1}/100)`)
        .replace(new RegExp(`%${numberPattern}`, 'gi'), (_, p1) => `(${displayValue}*${p1}/100)`)
        .replace(new RegExp(`${numberPattern}x`, 'gi'), (_, p1) => `(${displayValue}*${p1})`)
        .replace(new RegExp(`x${numberPattern}`, 'gi'), (_, p1) => `(${displayValue}*${p1})`)
        .replace(/(?<!\d)x(?!\d)/gi, `${displayValue}`)
        .trim();
    const result = evaluate(modifiedExpression);
    if (result === null) {
        throw new Error('Invalid expression.');
    }
    return result;
}
export { Numeric, evaluateExpression };
