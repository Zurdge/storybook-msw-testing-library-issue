import { ComponentStory, ComponentMeta } from '@storybook/react';
import Page from '.';
import { rest } from 'msw'

export default {
  title: 'Example/Page',
  component: Page,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
    msw: {
      handlers: [
        rest.get('/msw/test/', (req, res, ctx) => {
          return res(
            ctx.json({
              result:'ok',
            }),
          );
        }),
      ]
    }
  },
} as ComponentMeta<typeof Page>;

const Template: ComponentStory<typeof Page> = (args) => <Page {...args} />;

export const Example = Template.bind({});
