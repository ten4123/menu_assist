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
import * as RadixTooltip from '@radix-ui/react-tooltip';
import { cx } from 'class-variance-authority';
const { TooltipProvider } = RadixTooltip;
const Content = React.forwardRef((props, ref) => {
    const { className } = props, contentProps = __rest(props, ["className"]);
    return <RadixTooltip.Content ref={ref} className={cx(className, 'fp-tooltip')} {...contentProps}/>;
});
const Arrow = (props) => {
    const { className } = props, arrowProps = __rest(props, ["className"]);
    return <RadixTooltip.Arrow className={cx(className, 'fp-tooltip-arrow')} {...arrowProps}/>;
};
const Tooltip = React.forwardRef((props, ref) => {
    const { defaultOpen, open, onOpenChange, delayDuration, disableHoverableContent, container, forceMount, children, content } = props, contentProps = __rest(props, ["defaultOpen", "open", "onOpenChange", "delayDuration", "disableHoverableContent", "container", "forceMount", "children", "content"]);
    const rootProps = { open, defaultOpen, onOpenChange, delayDuration, disableHoverableContent };
    return (<RadixTooltip.Root {...rootProps}>
      <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
      <RadixTooltip.Portal forceMount={forceMount} container={container}>
        <Content ref={ref} arrowPadding={10} {...contentProps}>
          {content}
          <Arrow />
        </Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>);
});
Tooltip.displayName = 'Tooltip';
export { TooltipProvider, Tooltip };
