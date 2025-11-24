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
import * as RadixDialog from '@radix-ui/react-dialog';
import { cva, cx } from 'class-variance-authority';
import { IconButton } from '@components/icon-button';
import { CloseIcon } from '@components/icons';
import { Text } from '@components/text';
const Root = RadixDialog.Root;
const Portal = RadixDialog.Portal;
const Trigger = React.forwardRef((props, ref) => {
    return <RadixDialog.Trigger ref={ref} {...props} asChild/>;
});
const content = cva(['fp-DialogBaseContent', 'fp-DialogContent'], {
    variants: {
        size: {
            '1': 'fp-size-1',
            '2': 'fp-size-2',
            '3': 'fp-size-3',
            fullscreen: 'fp-size-fullscreen',
        },
        placement: {
            center: 'fp-placement-center',
            top: 'fp-placement-top',
        },
    },
    defaultVariants: {
        size: '2',
        placement: 'top',
    },
});
const Content = React.forwardRef((props, ref) => {
    const { children, className, size, placement, style, width, height, maxWidth, maxHeight } = props, contentProps = __rest(props, ["children", "className", "size", "placement", "style", "width", "height", "maxWidth", "maxHeight"]);
    return (<RadixDialog.Content ref={ref} className={content({ className, size, placement })} 
    // Majority figma dialogs typically don't have descriptions. Users can override this as needed.
    aria-describedby={undefined} style={Object.assign(Object.assign({}, style), { width, height, maxWidth, maxHeight })} {...contentProps}>
      {children}
    </RadixDialog.Content>);
});
const Overlay = React.forwardRef((props, ref) => {
    const { className } = props, overlayProps = __rest(props, ["className"]);
    return <RadixDialog.Overlay ref={ref} className={cx(className, 'fp-DialogBaseOverlay')} {...overlayProps}/>;
});
const Title = React.forwardRef((props, ref) => {
    const { children, className } = props, closeProps = __rest(props, ["children", "className"]);
    return (<RadixDialog.Title ref={ref} className={cx(className, 'fp-DialogBaseTitle')} {...closeProps} asChild>
      <Text weight="strong">{children}</Text>
    </RadixDialog.Title>);
});
const Close = React.forwardRef((props, ref) => {
    const { children } = props, closeProps = __rest(props, ["children"]);
    return (<RadixDialog.Close ref={ref} asChild {...closeProps}>
      {children || (<IconButton aria-label="Close" disableTooltip>
          <CloseIcon />
        </IconButton>)}
    </RadixDialog.Close>);
});
Trigger.displayName = 'Dialog.Trigger';
Content.displayName = 'Dialog.Content';
Overlay.displayName = 'Dialog.Overlay';
Title.displayName = 'Dialog.Title';
Close.displayName = 'Dialog.Close';
export { Root, Trigger, Portal, Content, Overlay, Title, Close };
export { Header, Section, Controls } from '@components/dialog.base/';
