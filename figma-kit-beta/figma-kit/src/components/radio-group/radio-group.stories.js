import React from 'react';
import * as RadioGroup from './radio-group';
const meta = {
    title: 'Components/Radio Group',
    component: RadioGroup.Root,
    parameters: {
        radixUrl: 'https://www.radix-ui.com/primitives/docs/components/radio-group',
        radixComponentName: 'Radio Group',
    },
};
export default meta;
export const Horizontal = {
    render: () => {
        return (<RadioGroup.Root defaultValue="default">
        <RadioGroup.Label>
          <RadioGroup.Item value="minimalist"/>
          Minimalist
        </RadioGroup.Label>
        <RadioGroup.Label>
          <RadioGroup.Item value="modern"/>
          Modern
        </RadioGroup.Label>
        <RadioGroup.Label>
          <RadioGroup.Item value="retro"/>
          Retro
        </RadioGroup.Label>
      </RadioGroup.Root>);
    },
};
export const Vertical = {
    render: () => {
        return (<RadioGroup.Root defaultValue="default" orientation="vertical">
        <RadioGroup.Label>
          <RadioGroup.Item value="minimalist"/>
          Minimalist
        </RadioGroup.Label>
        <RadioGroup.Label>
          <RadioGroup.Item value="modern"/>
          Modern
        </RadioGroup.Label>
        <RadioGroup.Label>
          <RadioGroup.Item value="retro"/>
          Retro
        </RadioGroup.Label>
      </RadioGroup.Root>);
    },
};
export const Disabled = {
    render: () => {
        return (<RadioGroup.Root defaultValue="default" disabled>
        <RadioGroup.Label>
          <RadioGroup.Item value="minimalist"/>
          Minimalist
        </RadioGroup.Label>
        <RadioGroup.Label>
          <RadioGroup.Item value="modern"/>
          Modern
        </RadioGroup.Label>
        <RadioGroup.Label>
          <RadioGroup.Item value="retro"/>
          Retro
        </RadioGroup.Label>
      </RadioGroup.Root>);
    },
};
