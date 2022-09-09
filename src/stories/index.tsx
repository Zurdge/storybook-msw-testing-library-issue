import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, useState } from 'react';
import { useAPIService } from './services';

const QueryProvider:FC<any> = ({children})=>{
  const [queryClient] = useState(() => new QueryClient());

  return <QueryClientProvider client={queryClient}>
  <Page/>
  </QueryClientProvider>
}

const Page: FC = () => {


  const [counter, setCounter] = useState(0);

    const {data, fetchStatus} = useAPIService({
        counter,
        onError: () => {
            /* check the network tab */
        },
    });
    const message = data ? data.response.message : 'pending';
  return (
    <article>
      <h1>Example Page</h1>
      <button onClick={()=>setCounter((prev) => prev + 1)}>Click to make API request</button>
      <pre>{message}</pre>
    </article>
  );
};

export default QueryProvider