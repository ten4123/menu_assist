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
import * as RadixSelect from '@radix-ui/react-select';
import { cx } from 'class-variance-authority';
import { ChevronDownIcon, ChevronUpIcon, CheckmarkIcon } from '@components/icons';
const Root = RadixSelect.Root;
const Arrow = RadixSelect.Arrow;
const Trigger = React.forwardRef((props, ref) => {
    const { placeholder, className } = props, triggerProps = __rest(props, ["placeholder", "className"]);
    return (<RadixSelect.Trigger ref={ref} {...triggerProps} className={cx(className, 'fp-SelectTrigger')}>
      <RadixSelect.Value placeholder={placeholder}/>
      <RadixSelect.Icon className="fp-SelectTriggerIcon">
        <ChevronDownIcon />
      </RadixSelect.Icon>
    </RadixSelect.Trigger>);
});
const Content = React.forwardRef((props, ref) => {
    const { children, portal = false, className } = props, contentProps = __rest(props, ["children", "portal", "className"]);
    const Wrapper = portal ? RadixSelect.Portal : React.Fragment;
    return (<Wrapper>
      <RadixSelect.Content ref={ref} {...contentProps} className={cx(className, 'fp-MenuContent')}>
        <RadixSelect.ScrollUpButton className="fp-SelectScrollUpButton">
          <ChevronUpIcon />
        </RadixSelect.ScrollUpButton>
        <RadixSelect.Viewport>{children}</RadixSelect.Viewport>
        <RadixSelect.ScrollDownButton className="fp-SelectScrollDownButton">
          <ChevronDownIcon />
        </RadixSelect.ScrollDownButton>
      </RadixSelect.Content>
    </Wrapper>);
});
const Item = React.forwardRef((props, ref) => {
    const { children, className } = props, itemProps = __rest(props, ["children", "className"]);
    return (<RadixSelect.Item ref={ref} {...itemProps} className={cx(className, 'fp-MenuItem fp-MenuCheckboxItem')}>
      <RadixSelect.ItemIndicator className="fp-MenuItemIndicator">
        <CheckmarkIcon size="4"/>
      </RadixSelect.ItemIndicator>
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
    </RadixSelect.Item>);
});
const Separator = React.forwardRef((props, ref) => {
    const { className } = props, separatorProps = __rest(props, ["className"]);
    return <RadixSelect.Separator ref={ref} className={cx(className, 'fp-MenuSeparator')} {...separatorProps}/>;
});
const Label = React.forwardRef((props, ref) => {
    const { className } = props, labelProps = __rest(props, ["className"]);
    return <RadixSelect.Label ref={ref} className={cx(className, 'fp-MenuLabel')} {...labelProps}/>;
});
const Group = React.forwardRef((props, ref) => {
    const { className } = props, groupProps = __rest(props, ["className"]);
    return <RadixSelect.Group ref={ref} className={cx(className, 'fp-MenuGroup')} {...groupProps}/>;
});
Trigger.displayName = 'Select.Trigger';
Content.displayName = 'Select.Content';
Item.displayName = 'Select.Item';
Separator.displayName = 'Select.Separator';
Group.displayName = 'Select.Group';
Label.displayName = 'Select.Label';
export { Root, Trigger, Content, Item, Separator, Group, Label, Arrow };
