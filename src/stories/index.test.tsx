import {render, screen, waitFor} from '@testing-library/react'
import Page from './index';
import userEvent from '@testing-library/user-event';

describe('ExamplePage', () => {
    test('API request', async () => {
        render(
            <Page/>
        );
        const pendingText = screen.getByText(/pending/i);
        expect(pendingText).toHaveTextContent(/pending/i);
        
        const button = screen.getByRole('button', {name:/Click to make API request/i})
        await userEvent.click(button);
        
        await waitFor(()=>{
            expect(pendingText).not.toHaveTextContent(/pending/i);
        })
    });
});
