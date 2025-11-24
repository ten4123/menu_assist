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
const DEFAULT_SIZE = '6';
const DEFAULT_VIEWBOX = '0 0 24 24';
const icon = cva('fp-Icon', {
    variants: {
        size: {
            '1': 'fp-size-1',
            '2': 'fp-size-2',
            '2_5': 'fp-size-2_5',
            '3': 'fp-size-3',
            '3_5': 'fp-size-3_5',
            '4': 'fp-size-4',
            '5': 'fp-size-5',
            '6': 'fp-size-6',
            '7': 'fp-size-7',
            '8': 'fp-size-8',
            '9': 'fp-size-9',
            '10': 'fp-size-10',
        },
    },
    defaultVariants: {
        size: DEFAULT_SIZE,
    },
});
function createIcon(options) {
    const { path, viewBox = DEFAULT_VIEWBOX, displayName } = options;
    const Component = React.forwardRef((props, ref) => {
        const { size, className } = props, iconProps = __rest(props, ["size", "className"]);
        return (<svg xmlns="http://www.w3.org/2000/svg" ref={ref} viewBox={viewBox} className={icon({ className, size })} fill="none" {...iconProps}>
        {path}
      </svg>);
    });
    Component.displayName = displayName || 'Icon';
    return Component;
}
export { createIcon };
