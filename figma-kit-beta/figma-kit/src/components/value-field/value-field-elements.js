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
import { cx } from 'class-variance-authority';
import { createContext } from '@lib/react/create-context';
const [ValueFieldProvider, useValueFieldContext] = createContext('ValueFieldProvider', null);
const Root = React.forwardRef((props, ref) => {
    const { className, disabled } = props, rootProps = __rest(props, ["className", "disabled"]);
    const context = useValueFieldContext('Root');
    return (<ValueFieldProvider disabled={disabled}>
      <label ref={ref} className={cx(className, 'fp-ValueFieldRoot')} data-disabled={disabled || (context === null || context === void 0 ? void 0 : context.disabled) ? '' : undefined} {...rootProps}/>
    </ValueFieldProvider>);
});
const Multi = React.forwardRef((props, ref) => {
    const { className, disabled } = props, multiProps = __rest(props, ["className", "disabled"]);
    return (<ValueFieldProvider disabled={disabled}>
      <div ref={ref} className={cx(className, 'fp-ValueFieldMulti')} data-disabled={disabled ? '' : undefined} {...multiProps}/>
    </ValueFieldProvider>);
});
const Label = React.forwardRef((props, ref) => {
    const { className } = props, labelProps = __rest(props, ["className"]);
    const context = useValueFieldContext('Root');
    return (<span ref={ref} className={cx(className, 'fp-ValueFieldLabel')} data-disabled={(context === null || context === void 0 ? void 0 : context.disabled) ? '' : undefined} {...labelProps}/>);
});
Root.displayName = 'ValueField.Root';
Label.displayName = 'ValueField.Label';
Multi.displayName = 'ValueField.Multi';
export { Root, Label, Multi, useValueFieldContext };
