import { ComponentStory, ComponentMeta } from '@storybook/react';
import Page from '.';
import {handlers} from '../mocks/handlers'
export default {
  title: 'Example/Page',
  component: Page,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
    msw: {
      handlers
    }
  },
} as ComponentMeta<typeof Page>;

const Template: ComponentStory<typeof Page> = (args) => <Page {...args} />;

export const Example = Template.bind({});
