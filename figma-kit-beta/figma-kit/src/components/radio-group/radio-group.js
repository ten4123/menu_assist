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
import * as RadixRadioGroup from '@radix-ui/react-radio-group';
import { cx } from 'class-variance-authority';
import { Label as LabelPrimitive } from '@components/text';
import { createContext } from '@lib/react/create-context';
const [RadioGroupContextProvider, useRadioGroupContext] = createContext('RadioGroup');
const Root = React.forwardRef((props, ref) => {
    const { orientation = 'horizontal', disabled, className } = props, rootProps = __rest(props, ["orientation", "disabled", "className"]);
    return (<RadioGroupContextProvider orientation={orientation} disabled={disabled}>
      <RadixRadioGroup.Root ref={ref} orientation={orientation} disabled={disabled} className={cx(className, 'fp-RadioGroupRoot')} {...rootProps}/>
    </RadioGroupContextProvider>);
});
const Item = React.forwardRef((props, ref) => {
    const { className } = props, itemProps = __rest(props, ["className"]);
    return <RadixRadioGroup.Item ref={ref} className={cx(className, 'fp-RadioGroupItem')} {...itemProps}/>;
});
const Label = React.forwardRef((props, ref) => {
    const { orientation, disabled } = useRadioGroupContext('Label');
    const { className } = props, labelProps = __rest(props, ["className"]);
    return (<LabelPrimitive ref={ref} className={cx(className, 'fp-RadioGroupLabel')} data-orientation={orientation} data-disabled={disabled ? '' : undefined} {...labelProps}/>);
});
Root.displayName = 'RadioGroup.Root';
Item.displayName = 'RadioGroup.Item';
Label.displayName = 'RadioGroup.Label';
export { Root, Item, Label };
