import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Page from '.';
import { rest } from 'msw'

export default {
  title: 'Example/Page',
  component: Page,
  msw: {
    handlers: [
      rest.get('http://localhost:6006/api/test/', (req, res, ctx) => {
        return res(
          ctx.json({
            result:'ok',
          }),
        );
      }),
    ]
  },
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Page>;

const Template: ComponentStory<typeof Page> = (args) => <Page {...args} />;

export const Example = Template.bind({});
