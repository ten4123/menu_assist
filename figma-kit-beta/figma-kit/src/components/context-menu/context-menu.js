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
import * as RadixMenu from '@radix-ui/react-context-menu';
import { cx } from 'class-variance-authority';
import { CircleIcon, CheckmarkIcon, ChevronRightIcon } from '@components/icons';
const Root = RadixMenu.Root;
const Trigger = RadixMenu.Trigger;
const Sub = RadixMenu.Sub;
const RadioGroup = RadixMenu.RadioGroup;
const Content = React.forwardRef((props, ref) => {
    const { children, className } = props, contentProps = __rest(props, ["children", "className"]);
    return (<RadixMenu.Portal>
      <RadixMenu.Content ref={ref} {...contentProps} className={cx(className, 'fp-MenuContent')}>
        {children}
      </RadixMenu.Content>
    </RadixMenu.Portal>);
});
const Item = React.forwardRef((props, ref) => {
    const { className } = props, itemProps = __rest(props, ["className"]);
    return <RadixMenu.Item ref={ref} {...itemProps} className={cx(className, 'fp-MenuItem')}/>;
});
const Separator = React.forwardRef((props, ref) => {
    const { className } = props, separatorProps = __rest(props, ["className"]);
    return <RadixMenu.Separator ref={ref} className={cx(className, 'fp-MenuSeparator')} {...separatorProps}/>;
});
const Label = React.forwardRef((props, ref) => {
    const { className } = props, labelProps = __rest(props, ["className"]);
    return <RadixMenu.Label ref={ref} className={cx(className, 'fp-MenuLabel')} {...labelProps}/>;
});
const Group = React.forwardRef((props, ref) => {
    const { className } = props, groupProps = __rest(props, ["className"]);
    return <RadixMenu.Group ref={ref} className={cx(className, 'fp-MenuGroup')} {...groupProps}/>;
});
const SubTrigger = React.forwardRef((props, ref) => {
    const { children, className } = props, subTriggerProps = __rest(props, ["children", "className"]);
    return (<RadixMenu.SubTrigger ref={ref} {...subTriggerProps} className={cx(className, 'fp-MenuItem')}>
      {children}
      <ChevronRightIcon className="fp-MenuSubtriggerCaret"/>
    </RadixMenu.SubTrigger>);
});
const SubContent = React.forwardRef((props, ref) => {
    const { className } = props, subContentProps = __rest(props, ["className"]);
    return (<RadixMenu.Portal>
      <RadixMenu.SubContent ref={ref} {...subContentProps} className={cx(className, 'fp-MenuContent')} sideOffset={12}/>
    </RadixMenu.Portal>);
});
const CheckboxItem = React.forwardRef((props, ref) => {
    const { children, className } = props, itemProps = __rest(props, ["children", "className"]);
    return (<RadixMenu.CheckboxItem ref={ref} {...itemProps} className={cx(className, 'fp-MenuItem fp-MenuCheckboxItem')}>
      <RadixMenu.ItemIndicator className="fp-MenuItemIndicator">
        <CheckmarkIcon size="4"/>
      </RadixMenu.ItemIndicator>
      {children}
    </RadixMenu.CheckboxItem>);
});
const RadioItem = React.forwardRef((props, ref) => {
    const { children, className } = props, itemProps = __rest(props, ["children", "className"]);
    return (<RadixMenu.RadioItem ref={ref} {...itemProps} className={cx(className, 'fp-MenuItem fp-MenuRadioItem')}>
      <RadixMenu.ItemIndicator className="fp-MenuItemIndicator">
        <CircleIcon size="4"/>
      </RadixMenu.ItemIndicator>
      {children}
    </RadixMenu.RadioItem>);
});
Content.displayName = 'ContextMenu.Content';
Item.displayName = 'ContextMenu.Item';
Separator.displayName = 'ContextMenu.Separator';
Label.displayName = 'ContextMenu.Label';
Group.displayName = 'ContextMenu.Group';
SubTrigger.displayName = 'ContextMenu.SubTrigger';
SubContent.displayName = 'ContextMenu.SubContent';
CheckboxItem.displayName = 'ContextMenu.CheckboxItem';
RadioItem.displayName = 'ContextMenu.RadioItem';
export { Root, Trigger, Content, Item, Separator, Group, Label, Sub, SubTrigger, SubContent, CheckboxItem, RadioGroup, RadioItem, };
