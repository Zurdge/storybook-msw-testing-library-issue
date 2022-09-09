import userEvent from '@testing-library/user-event'
import {render, screen} from '@testing-library/react'
import Page from './index';

describe('ExamplePage', () => {
    test('API request', async () => {
        render(
            <Page/>
        );
    });
});
