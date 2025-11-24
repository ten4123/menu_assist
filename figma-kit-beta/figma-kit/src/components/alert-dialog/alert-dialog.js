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
import * as RadixAlertDialog from '@radix-ui/react-alert-dialog';
import { cva, cx } from 'class-variance-authority';
import { Text } from '@components/text';
const Root = RadixAlertDialog.Root;
const Portal = RadixAlertDialog.Portal;
const Trigger = React.forwardRef((props, ref) => {
    return <RadixAlertDialog.Trigger ref={ref} {...props} asChild/>;
});
const content = cva(['fp-DialogBaseContent', 'fp-AlertDialogContent'], {
    variants: {
        size: {
            '1': 'fp-size-1',
            '2': 'fp-size-2',
            '3': 'fp-size-3',
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
    const { className, size, placement, style, width, height, maxWidth, maxHeight } = props, contentProps = __rest(props, ["className", "size", "placement", "style", "width", "height", "maxWidth", "maxHeight"]);
    return (<RadixAlertDialog.Content ref={ref} className={content({ className, size, placement })} style={Object.assign(Object.assign({}, style), { width, height, maxWidth, maxHeight })} {...contentProps}/>);
});
const Overlay = React.forwardRef((props, ref) => {
    const { className } = props, overlayProps = __rest(props, ["className"]);
    return <RadixAlertDialog.Overlay ref={ref} className={cx(className, 'fp-DialogBaseOverlay')} {...overlayProps}/>;
});
const Title = React.forwardRef((props, ref) => {
    const { children, className } = props, closeProps = __rest(props, ["children", "className"]);
    return (<RadixAlertDialog.Title ref={ref} className={cx(className, 'fp-AlertDialogTitle')} {...closeProps} asChild>
      <Text weight="strong">{children}</Text>
    </RadixAlertDialog.Title>);
});
const Description = React.forwardRef((props, ref) => {
    const { children, className } = props, closeProps = __rest(props, ["children", "className"]);
    return (<RadixAlertDialog.Description ref={ref} className={cx(className, 'fp-AlertDialogDescription')} {...closeProps} asChild>
      <Text>{children}</Text>
    </RadixAlertDialog.Description>);
});
const Actions = React.forwardRef((props, ref) => {
    const { className } = props, actionsProps = __rest(props, ["className"]);
    return <div ref={ref} className={cx(className, 'fp-AlertDialogActions')} {...actionsProps}/>;
});
const Cancel = React.forwardRef((props, ref) => {
    return <RadixAlertDialog.Cancel ref={ref} asChild {...props}/>;
});
const Action = React.forwardRef((props, ref) => {
    return <RadixAlertDialog.Action ref={ref} asChild {...props}/>;
});
Trigger.displayName = 'AlertDialog.Trigger';
Content.displayName = 'AlertDialog.Content';
Overlay.displayName = 'AlertDialog.Overlay';
Title.displayName = 'AlertDialog.Title';
Description.displayName = 'AlertDialog.Description';
Actions.displayName = 'AlertDialog.Actions';
Cancel.displayName = 'AlertDialog.Cancel';
Action.displayName = 'AlertDialog.Action';
export { Root, Trigger, Content, Overlay, Portal, Title, Description, Actions, Cancel, Action };
