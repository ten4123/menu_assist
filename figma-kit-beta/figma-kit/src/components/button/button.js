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
import React from 'react';
import { cva } from 'class-variance-authority';
const button = cva('fp-Button', {
    variants: {
        variant: {
            primary: 'fp-variant-primary',
            secondary: 'fp-variant-secondary',
            inverse: 'fp-variant-inverse',
            destructive: 'fp-variant-destructive',
            success: 'fp-variant-success',
            text: 'fp-variant-text',
        },
        size: {
            small: 'fp-size-small',
            medium: 'fp-size-medium',
        },
        fullWidth: {
            true: 'fp-full-width',
        },
    },
    defaultVariants: {
        variant: 'secondary',
        size: 'small',
    },
});
const Button = React.forwardRef((props, ref) => {
    const { className, variant, size, fullWidth } = props, buttonProps = __rest(props, ["className", "variant", "size", "fullWidth"]);
    return <button ref={ref} className={button({ className, variant, size, fullWidth })} {...buttonProps}/>;
});
Button.displayName = 'Button';
export { Button };
