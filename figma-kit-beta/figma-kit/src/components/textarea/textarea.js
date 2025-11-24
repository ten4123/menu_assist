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
import TextareaAutoSize from 'react-textarea-autosize';
import { cx } from 'class-variance-authority';
const Textarea = React.forwardRef((props, ref) => {
    const { className } = props, textareaProps = __rest(props, ["className"]);
    return <TextareaAutoSize className={cx(className, 'fp-textarea')} ref={ref} {...textareaProps}/>;
});
Textarea.displayName = 'Textarea';
export { Textarea };
