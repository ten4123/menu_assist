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
import { cva, cx } from 'class-variance-authority';
const Header = React.forwardRef((props, ref) => {
    const { children, className } = props, closeProps = __rest(props, ["children", "className"]);
    return (<header ref={ref} className={cx(className, 'fp-DialogBaseHeader')} {...closeProps}>
      {children}
    </header>);
});
const Section = React.forwardRef((props, ref) => {
    const { className, size } = props, sectionProps = __rest(props, ["className", "size"]);
    return <div ref={ref} className={section({ className, size })} {...sectionProps}/>;
});
const Controls = React.forwardRef((props, ref) => {
    const { className } = props, controlProps = __rest(props, ["className"]);
    return <div ref={ref} className={cx(className, 'fp-DialogBaseControls')} {...controlProps}/>;
});
const section = cva('fp-DialogBaseSection', {
    variants: {
        size: {
            base: 'fp-DialogBaseSection-base',
            small: 'fp-DialogBaseSection-small',
        },
    },
    defaultVariants: {
        size: 'base',
    },
});
Header.displayName = 'Dialog.Header';
Section.displayName = 'Dialog.Section';
Controls.displayName = 'Dialog.Controls';
export { Header, Section, Controls };
