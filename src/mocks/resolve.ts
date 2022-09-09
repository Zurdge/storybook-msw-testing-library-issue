import isChromatic from 'chromatic';
import {MockedResponse, ResponseFunction, RestContext, RestRequest} from 'msw';

export type MockResponseType =
    | Record<string, unknown>
    | Record<string, unknown>[];

export type Resolver = (req: RestRequest) => {
    meta: any;
    response: MockResponseType;
};

const getResolverError = (
    res: ResponseFunction,
    ctx: RestContext,
    reason: string
) =>
    res(
        ctx.status(500),
        ctx.json({
            meta: {status: 500},
            response: {
                non_field_errors: ['[MSW] Resolver Error.', reason],
            },
        })
    );

const bodyMethods = ['PATCH', 'PUT', 'POST', 'patch', 'put', 'post'];

const DELAY = isChromatic() || process.env.NODE_ENV === 'test' ? 1 : 500;

const resolve =
    (resolver: Resolver) =>
    (
        req: RestRequest,
        res: ResponseFunction,
        ctx: RestContext
    ): MockedResponse | Promise<MockedResponse> => {
        let result;
        const shouldHaveBody = bodyMethods.includes(req.method);

        if ((shouldHaveBody && !req.body) || (!shouldHaveBody && req.body)) {
            result = getResolverError(
                res,
                ctx,
                shouldHaveBody
                    ? `${req.method} requires form data`
                    : `${req.method} should not have form data`
            );
        } else {
            try {
                const {meta, response} = resolver(req);

                if (!meta?.status) {
                    result = getResolverError(
                        res,
                        ctx,
                        'meta status is missing'
                    );
                } else {

                    if (meta.status === 200) {
                        result = res(
                            ctx.status(200),
                            ctx.json({
                                meta,
                                response: response,
                            }),
                            ctx.delay(DELAY)
                        );
                    } else {
                        result = res(
                            ctx.status(meta.status || 400),
                            ctx.json({meta, response}),
                            ctx.delay(DELAY)
                        );
                    }
                }
            } catch (error) {
                result = getResolverError(res, ctx, String(error));
            }
        }

        return result;
    };

export default resolve;
