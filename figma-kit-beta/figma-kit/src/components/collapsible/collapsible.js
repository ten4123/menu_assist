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
import * as RadixCollapsible from '@radix-ui/react-collapsible';
import { cx } from 'class-variance-authority';
import { ChevronRightIcon } from '@components/icons';
const Root = React.forwardRef((props, ref) => {
    const { className } = props, rootProps = __rest(props, ["className"]);
    return <RadixCollapsible.Root ref={ref} className={cx(className, 'fp-CollapsibleRoot')} {...rootProps}/>;
});
const Trigger = React.forwardRef((props, ref) => {
    const { className, children } = props, triggerProps = __rest(props, ["className", "children"]);
    return (<RadixCollapsible.Trigger ref={ref} className={cx(className, 'fp-CollapsibleTrigger')} {...triggerProps}>
      <ChevronRightIcon viewBox="4 4 16 16" size="4" className="fp-CollapsibleIndicator"/>
      {children}
    </RadixCollapsible.Trigger>);
});
const Content = React.forwardRef((props, ref) => {
    const { className } = props, contentProps = __rest(props, ["className"]);
    return <RadixCollapsible.Content ref={ref} className={cx(className, 'fp-CollapsibleContent')} {...contentProps}/>;
});
Root.displayName = 'Collapsible.Root';
Trigger.displayName = 'Collapsible.Trigger';
Content.displayName = 'Collapsible.Content';
export { Root, Content, Trigger };
