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
import { Tooltip } from '@components/tooltip';
const iconButton = cva('fp-IconButton', {
    variants: {
        size: {
            small: 'fp-size-small',
            medium: 'fp-size-medium',
        },
        activeAppearance: {
            subtle: 'fp-active-appearance-subtle',
            solid: 'fp-active-appearance-solid',
        },
    },
    defaultVariants: {
        size: 'small',
        activeAppearance: 'subtle',
    },
});
const IconButton = React.forwardRef((props, ref) => {
    const { className, size, activeAppearance, 'aria-label': ariaLabel, tooltipContent, disableTooltip } = props, iconButtonProps = __rest(props, ["className", "size", "activeAppearance", 'aria-label', "tooltipContent", "disableTooltip"]);
    const buttonElement = (<button ref={ref} className={iconButton({ className, size, activeAppearance })} aria-label={ariaLabel} {...iconButtonProps}/>);
    return disableTooltip ? buttonElement : <Tooltip content={tooltipContent !== null && tooltipContent !== void 0 ? tooltipContent : ariaLabel}>{buttonElement}</Tooltip>;
});
IconButton.displayName = 'IconButton';
export { IconButton };
