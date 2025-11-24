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
import React, { useCallback } from 'react';
import * as RadixTabs from '@radix-ui/react-tabs';
import { cx } from 'class-variance-authority';
import { composeRefs } from '@lib/react/use-compose-refs';
const Root = React.forwardRef((props, ref) => {
    const { className } = props, rootProps = __rest(props, ["className"]);
    return <RadixTabs.Root ref={ref} className={cx(className, 'fp-TabsRoot')} {...rootProps}/>;
});
const List = React.forwardRef((props, ref) => {
    const { className } = props, listProps = __rest(props, ["className"]);
    return <RadixTabs.List ref={ref} className={cx(className, 'fp-TabsList')} {...listProps}/>;
});
const Trigger = React.forwardRef((props, forwardedRef) => {
    const { className } = props, triggerProps = __rest(props, ["className"]);
    const triggerRef = useFixedTriggerWidth();
    const ref = composeRefs(forwardedRef, triggerRef);
    return <RadixTabs.Trigger ref={ref} className={cx(className, 'fp-TabsTrigger')} {...triggerProps}/>;
});
/**
 * Hardcode the initial trigger width onto the element to prevent layout shifts when the font-weight changes with state.
 * An alternative solution would be using overlaying pseudo-elements in CSS, but this would complicate the API for the consumer,
 * requiring them to manually specify the label and somehow slot icons when used.
 * Note:
 * This won't handle the unlikely case of the trigger label changing after it's been rendered.
 */
function useFixedTriggerWidth() {
    return useCallback((node) => {
        if (node !== null) {
            node.style.width = node.getBoundingClientRect().width + 'px';
        }
    }, []);
}
const Content = React.forwardRef((props, ref) => {
    const { className } = props, contentProps = __rest(props, ["className"]);
    return <RadixTabs.Content ref={ref} className={cx(className, 'fp-TabsContent')} {...contentProps}/>;
});
Root.displayName = 'Tabs.Root';
List.displayName = 'Tabs.List';
Trigger.displayName = 'Tabs.Trigger';
Content.displayName = 'Tabs.Content';
export { Root, List, Trigger, Content };
