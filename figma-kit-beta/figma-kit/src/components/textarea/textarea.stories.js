import { Textarea } from './textarea';
const meta = {
    component: Textarea,
    title: 'Components/Textarea',
    decorators: [
        (Story) => {
            return (<div style={{ width: 256 }}>
          <Story />
        </div>);
        },
    ],
    argTypes: {
        disabled: {
            type: 'boolean',
        },
        minRows: {
            type: 'number',
        },
    },
    parameters: {
        docs: {
            description: {
                component: 'Textarea that grows vertically to accommodate content.',
            },
        },
    },
};
export default meta;
export const Default = {
    args: {
        placeholder: 'Textarea that grows vertically to accommodate content.',
    },
};
