import { rest } from 'msw'
import resolve from './resolve'

const getHelloWorld = (req) => {
  return {
      meta: {status: 200},
      response: {
          message:'ok'
      },
  };
};

export const handlers = [
    rest.get('/msw/test/', resolve(getHelloWorld)),
];

