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
import * as RadixToggleGroup from '@radix-ui/react-toggle-group';
import { cx } from 'class-variance-authority';
import { Text as TextPrimitive } from '@components/text';
import { useControllableState } from '@lib/react/use-controllable-state';
const Root = React.forwardRef((props, ref) => {
    const { className, fullWidth, value: valueProp, defaultValue: defaultValueProp, onValueChange } = props, rootProps = __rest(props, ["className", "fullWidth", "value", "defaultValue", "onValueChange"]);
    const [value, setValue] = useControllableState({
        prop: valueProp,
        defaultProp: defaultValueProp,
        onChange: onValueChange,
    });
    return (<RadixToggleGroup.Root ref={ref} className={cx(className, 'fp-SegmentedControlRoot', { 'fp-full-width': fullWidth })} {...rootProps} type="single" value={value} onValueChange={(value) => {
            if (value) {
                setValue(value);
            }
        }}/>);
});
const Item = React.forwardRef((props, ref) => {
    const { className } = props, itemProps = __rest(props, ["className"]);
    return <RadixToggleGroup.Item ref={ref} className={cx(className, 'fp-SegmentedControlItem')} {...itemProps}/>;
});
const Text = React.forwardRef((props, ref) => {
    const { className } = props, textProps = __rest(props, ["className"]);
    return <TextPrimitive ref={ref} className={cx(className, 'fp-SegmentedControlText')} {...textProps}/>;
});
Root.displayName = 'SegmentedControl.Root';
Item.displayName = 'SegmentedControl.Item';
Text.displayName = 'SegmentedControl.Text';
export { Root, Item, Text };
