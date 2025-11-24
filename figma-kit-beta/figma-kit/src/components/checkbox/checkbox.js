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
import React, { useCallback, useId } from 'react';
import { cx } from 'class-variance-authority';
import { Text, Label as LabelPrimitive } from '@components/text';
import { useComposedRefs } from '@lib/react/use-compose-refs';
import { CheckmarkIcon } from '@components/icons';
import { CheckmarkIndeterminateIcon } from '@components/icons/checkmark-indeterminate';
import { createContext } from '@lib/react/create-context';
const [CheckboxContextProvider, useCheckboxContext] = createContext('Checkbox');
const Root = React.forwardRef((props, ref) => {
    const { className, id: idProp } = props, rootProps = __rest(props, ["className", "id"]);
    const generatedId = useId();
    const id = idProp !== null && idProp !== void 0 ? idProp : generatedId;
    return (<CheckboxContextProvider id={id}>
      <div ref={ref} className={cx(className, 'fp-CheckboxRoot')} {...rootProps}/>
    </CheckboxContextProvider>);
});
const Input = React.forwardRef((props, forwardedRef) => {
    const { className, indeterminate } = props, checkboxProps = __rest(props, ["className", "indeterminate"]);
    const { id } = useCheckboxContext('Input');
    const inputRef = useIndeterminateState(indeterminate);
    const ref = useComposedRefs(forwardedRef, inputRef);
    return (<>
      <input ref={ref} className={cx(className, 'fp-CheckboxInput')} id={id} 
    // VoiceOver on Chrome does not announce the label when simply using htmlFor
    aria-labelledby={`checkbox-label-${id}`} aria-describedby={`checkbox-description-${id}`} {...checkboxProps} type="checkbox"/>
      <Indicator />
    </>);
});
const Indicator = () => {
    return (<span className="fp-CheckboxIndicator" aria-hidden="true">
      <CheckmarkIcon className="fp-CheckboxCheckmark" size="4"/>
      <CheckmarkIndeterminateIcon className="fp-CheckboxIndeterminate" size="4"/>
    </span>);
};
const Label = React.forwardRef((props, ref) => {
    const { className } = props, labelProps = __rest(props, ["className"]);
    const { id } = useCheckboxContext('Input');
    return (<LabelPrimitive aria-hidden="true" ref={ref} className={cx(className, 'fp-CheckboxLabel')} htmlFor={id} id={`checkbox-label-${id}`} {...labelProps}/>);
});
const Description = React.forwardRef((props, ref) => {
    const { className } = props, desriptionProps = __rest(props, ["className"]);
    const { id } = useCheckboxContext('Description');
    return (<Text aria-hidden="true" ref={ref} className={cx(className, 'fp-CheckboxDescription')} id={`checkbox-description-${id}`} {...desriptionProps}/>);
});
function useIndeterminateState(indeterminate) {
    return useCallback((inputElement) => {
        if (!inputElement) {
            return;
        }
        inputElement.indeterminate = !!indeterminate;
    }, [indeterminate]);
}
Root.displayName = 'Checkbox.Root';
Input.displayName = 'Checkbox.Input';
Indicator.displayName = 'Checkbox.Indicator';
Label.displayName = 'Checkbox.Label';
Description.displayName = 'Checkbox.Description';
export { Root, Input, Label, Description };
