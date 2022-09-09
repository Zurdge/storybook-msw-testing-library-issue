import {render} from '@testing-library/react'
import Page from './index';

describe('ExamplePage', () => {
    test('API request', async () => {
        render(
            <Page/>
        );
    });
});
