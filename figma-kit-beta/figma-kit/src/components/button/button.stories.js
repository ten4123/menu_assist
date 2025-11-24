import reactElementToJSXString from 'react-element-to-jsx-string';
import { Button } from './button';
const meta = {
    component: Button,
    title: 'Components/Button',
    args: {
        variant: undefined,
    },
    parameters: {
        controls: {
            expanded: true,
        },
    },
    argTypes: {
        variant: {
            description: 'Contextual variant of the button.',
            type: 'string',
            table: {
                type: {
                    summary: 'enum',
                },
                defaultValue: {
                    summary: 'secondary',
                },
            },
            options: ['primary', 'secondary', 'inverse', 'destructive', 'success', 'text'],
            control: { type: 'radio' },
        },
        size: {
            description: 'Size of the button.',
            type: 'string',
            table: {
                type: {
                    summary: 'enum',
                },
                defaultValue: {
                    summary: 'small',
                },
            },
            options: ['small', 'medium'],
            control: { type: 'radio' },
        },
        fullWidth: {
            description: 'Set to `true` for the button to fill its parent container.',
            type: 'boolean',
        },
        disabled: {
            description: 'Set to `true` to disable the button.',
            type: 'boolean',
        },
    },
};
export default meta;
// eslint-disable-next-line
const getCode = (args) => reactElementToJSXString(<Button {...args}/>);
export const Primary = {
    args: {
        variant: 'primary',
        children: 'Primary',
    },
    parameters: {
        storySource: {
            get source() {
                return getCode(Primary.args);
            },
        },
    },
};
export const Secondary = {
    args: {
        variant: 'secondary',
        children: 'Secondary',
    },
    parameters: {
        storySource: {
            get source() {
                return getCode(Secondary.args);
            },
        },
    },
};
export const Destructive = {
    args: {
        variant: 'destructive',
        children: 'Destructive',
    },
    parameters: {
        storySource: {
            get source() {
                return getCode(Destructive.args);
            },
        },
    },
};
export const Success = {
    args: {
        variant: 'success',
        children: 'Success',
    },
    parameters: {
        storySource: {
            get source() {
                return getCode(Success.args);
            },
        },
    },
};
export const Inverse = {
    args: {
        variant: 'inverse',
        children: 'Inverse',
    },
    parameters: {
        storySource: {
            get source() {
                return getCode(Inverse.args);
            },
        },
    },
};
export const Text = {
    args: {
        variant: 'text',
        children: 'Text',
    },
    parameters: {
        storySource: {
            get source() {
                return getCode(Text.args);
            },
        },
    },
};
