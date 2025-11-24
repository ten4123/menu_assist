import { useState } from 'react';
import { IconButton } from '@components/icon-button';
import { StylesIcon } from '@components/icons';
import { Text } from '@components/text';
import * as Popover from '../popover';
import * as Tabs from './tabs';
const meta = {
    title: 'Components/Tabs',
    component: Tabs.Root,
    parameters: {
        radixUrl: 'https://www.radix-ui.com/primitives/docs/components/tabs',
        radixComponentName: 'Tabs',
    },
};
export default meta;
export const Story = {
    render() {
        return (<Tabs.Root defaultValue="custom">
        <Tabs.List>
          <Tabs.Trigger value="custom">Custom</Tabs.Trigger>
          <Tabs.Trigger value="libraries">Libraries</Tabs.Trigger>
          <Tabs.Trigger value="carburetors">Carburetors</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="custom">
          <Text>Custom Content</Text>
        </Tabs.Content>
        <Tabs.Content value="libraries">
          <Text>Libraries Content</Text>
        </Tabs.Content>
        <Tabs.Content value="carburetors">
          <Text>Carburetors Content</Text>
        </Tabs.Content>
      </Tabs.Root>);
    },
};
export const WithinPopover = () => {
    const [activeTab, setActiveTab] = useState('custom');
    return (<Tabs.Root value={activeTab} onValueChange={setActiveTab} style={{ display: 'contents' }}>
      <Popover.Root>
        <Popover.Trigger>
          <IconButton aria-label="Styles and variables">
            <StylesIcon />
          </IconButton>
        </Popover.Trigger>
        <Popover.Content width={300}>
          <Popover.Header>
            <Tabs.List>
              <Tabs.Trigger value="custom">Custom</Tabs.Trigger>
              <Tabs.Trigger value="libraries">Libraries</Tabs.Trigger>
              <Tabs.Trigger value="carburetors">Carburetors</Tabs.Trigger>
            </Tabs.List>
            <Popover.Controls>
              <Popover.Close />
            </Popover.Controls>
          </Popover.Header>

          <Popover.Section>
            <Tabs.Content value="custom">
              <Text>Custom Content</Text>
            </Tabs.Content>
            <Tabs.Content value="libraries">
              <Text>Libraries Content</Text>
            </Tabs.Content>
            <Tabs.Content value="carburetors">
              <Text>Carburetors Content</Text>
            </Tabs.Content>
          </Popover.Section>
        </Popover.Content>
      </Popover.Root>
    </Tabs.Root>);
};
