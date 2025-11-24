import * as Checkbox from './checkbox';
const meta = {
    title: 'Components/Checkbox',
    component: Checkbox.Root,
};
export default meta;
export const WithLabel = {
    render: () => {
        return (<Checkbox.Root>
        <Checkbox.Input />
        <Checkbox.Label>Clip content</Checkbox.Label>
      </Checkbox.Root>);
    },
};
export const WithoutLabel = {
    render: () => {
        return (<Checkbox.Root>
        <Checkbox.Input />
      </Checkbox.Root>);
    },
};
export const Indeterminate = {
    render: () => {
        return (<Checkbox.Root>
        <Checkbox.Input indeterminate/>
        <Checkbox.Label>Clip content</Checkbox.Label>
      </Checkbox.Root>);
    },
};
export const Disabled = {
    render: () => {
        return (<Checkbox.Root>
        <Checkbox.Input disabled/>
        <Checkbox.Label>Clip content</Checkbox.Label>
      </Checkbox.Root>);
    },
};
export const DisabledChecked = {
    render: () => {
        return (<Checkbox.Root>
        <Checkbox.Input disabled checked/>
        <Checkbox.Label>Clip content</Checkbox.Label>
      </Checkbox.Root>);
    },
};
export const DisabledIndeterminate = {
    render: () => {
        return (<Checkbox.Root>
        <Checkbox.Input disabled indeterminate/>
        <Checkbox.Label>Clip content</Checkbox.Label>
      </Checkbox.Root>);
    },
};
export const MultiLineLabel = {
    render: () => {
        return (<Checkbox.Root style={{ width: 128 }}>
        <Checkbox.Input />
        <Checkbox.Label>Clip content with label that spans multiple lines</Checkbox.Label>
      </Checkbox.Root>);
    },
};
export const Description = {
    render: () => {
        return (<Checkbox.Root style={{ maxWidth: 512 }}>
        <Checkbox.Input />
        <Checkbox.Label>Checkbox with description</Checkbox.Label>
        <Checkbox.Description>
          Helpful description of the option which may briefly highlight side effects or conditions of the option.
        </Checkbox.Description>
      </Checkbox.Root>);
    },
};
