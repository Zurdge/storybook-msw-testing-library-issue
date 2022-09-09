import { rest } from 'msw'

export const handlers = [
    rest.get('/msw/test/', (req, res, ctx) => {
        return res(
          ctx.json({
            result:'ok',
          }),
        );
      }),
];

