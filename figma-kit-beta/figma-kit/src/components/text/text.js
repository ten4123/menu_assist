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
import { cx, cva } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';
const text = cva('fp-Text', {
    variants: {
        size: {
            small: 'fp-size-small',
            medium: 'fp-size-medium',
            large: 'fp-size-large',
        },
        weight: {
            default: 'fp-weight-default',
            strong: 'fp-weight-strong',
        },
        align: {
            start: 'fp-align-start',
            center: 'fp-align-center',
            end: 'fp-align-end',
        },
        block: {
            true: 'fp-block',
        },
    },
});
const Text = React.forwardRef((props, ref) => {
    const { asChild, className, size, weight, align, block } = props, textProps = __rest(props, ["asChild", "className", "size", "weight", "align", "block"]);
    const Element = asChild ? Slot : 'span';
    return (<Element ref={ref} className={text({
            className,
            size,
            weight,
            align,
            block,
        })} {...textProps}/>);
});
Text.displayName = 'Text';
const Label = React.forwardRef((props, ref) => {
    const { className, size, weight, align, block } = props, labelProps = __rest(props, ["className", "size", "weight", "align", "block"]);
    return (<label ref={ref} className={text({
            className,
            size,
            weight,
            align,
            block,
        })} {...labelProps}/>);
});
Label.displayName = 'Label';
const Paragraph = React.forwardRef((props, ref) => {
    const { className, size, weight, align, block } = props, paragraphProps = __rest(props, ["className", "size", "weight", "align", "block"]);
    return (<p ref={ref} className={text({
            className,
            size,
            weight,
            align,
            block,
        })} {...paragraphProps}/>);
});
Paragraph.displayName = 'Paragraph';
const Link = React.forwardRef((props, ref) => {
    const { asChild, className, size, weight, align, block } = props, linkProps = __rest(props, ["asChild", "className", "size", "weight", "align", "block"]);
    const Element = asChild ? Slot : 'a';
    return (<Element ref={ref} className={cx(text({
            className,
            size,
            weight,
            align,
            block,
        }), 'fp-Link')} {...linkProps}/>);
});
Link.displayName = 'Link';
export { Text, Label, Paragraph, Link };
