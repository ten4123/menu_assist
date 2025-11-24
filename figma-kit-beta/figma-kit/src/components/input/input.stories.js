import { Input } from './input';
const meta = {
    component: Input,
    title: 'Components/Input',
    args: {
        placeholder: '',
        disabled: false,
    },
    argTypes: {
        selectOnClick: {
            type: 'boolean',
            description: 'Enable content selection on click.',
        },
    },
};
export default meta;
export const Basic = {
    args: {
        placeholder: 'Basic input',
    },
};
export const SelectOnClick = {
    args: {
        value: 'Some value',
        selectOnClick: true,
    },
};
