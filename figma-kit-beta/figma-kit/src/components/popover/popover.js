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
import * as RadixPopover from '@radix-ui/react-popover';
import { cx } from 'class-variance-authority';
import { IconButton } from '@components/icon-button';
import { CloseIcon } from '@components/icons';
import { Text } from '@components/text';
const Root = RadixPopover.Root;
const Anchor = RadixPopover.Anchor;
const Portal = RadixPopover.Portal;
const Trigger = React.forwardRef((props, ref) => {
    return <RadixPopover.Trigger ref={ref} {...props} asChild/>;
});
const Content = React.forwardRef((props, ref) => {
    const { className, style, width, height, maxWidth, maxHeight } = props, contentProps = __rest(props, ["className", "style", "width", "height", "maxWidth", "maxHeight"]);
    return (<RadixPopover.Content ref={ref} className={cx(className, 'fp-DialogBaseContent')} style={Object.assign(Object.assign({}, style), { width, height, maxWidth, maxHeight })} {...contentProps}/>);
});
// TODO: needs an implementation of `aria-labelledby`
const Title = React.forwardRef((props, ref) => {
    const { className } = props, closeProps = __rest(props, ["className"]);
    return <Text ref={ref} className={cx(className, 'fp-DialogBaseTitle')} weight="strong" {...closeProps}/>;
});
const Close = React.forwardRef((props, ref) => {
    const { children } = props, closeProps = __rest(props, ["children"]);
    return (<RadixPopover.Close ref={ref} asChild {...closeProps}>
      {children || (<IconButton aria-label="Close" disableTooltip>
          <CloseIcon />
        </IconButton>)}
    </RadixPopover.Close>);
});
Trigger.displayName = 'Popover.Trigger';
Content.displayName = 'Popover.Content';
Title.displayName = 'Popover.Title';
Close.displayName = 'Popover.Close';
export { Root, Trigger, Content, Portal, Title, Close, Anchor };
export { Header, Section, Controls } from '@components/dialog.base/';
