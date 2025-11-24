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
import * as RadixSwitch from '@radix-ui/react-switch';
import React from 'react';
import { cx } from 'class-variance-authority';
const Switch = React.forwardRef((props, ref) => {
    const { className } = props, switchProps = __rest(props, ["className"]);
    return (<RadixSwitch.Root ref={ref} className={cx(className, 'fp-switchRoot')} {...switchProps}>
      <RadixSwitch.Thumb ref={ref} className={cx(className, 'fp-switchThumb')}/>
    </RadixSwitch.Root>);
});
Switch.displayName = 'Switch';
export { Switch };
