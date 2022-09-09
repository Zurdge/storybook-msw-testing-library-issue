import { FC, useState } from 'react';

const APIRequest = ():Promise<void>=>{
  return new Promise((resolve, reject)=>{
    fetch('/msw/test/')
    .then((response)=>{
      if(!response.ok){
        reject(new Error("Responce was not OK!"))
      }else{
        resolve(response.json())
      }
    })
  })
}
const Page: FC = () => {
  const [result, setResult] = useState<string>('pending')
  return (
    <article>
      <h1>Example Page</h1>
      <button onClick={()=>
        APIRequest().then((response)=>{
          setResult(JSON.stringify(response, null, 2))
        }).catch(()=>
          setResult("FAILURE"))
        }>Click to make API request</button>
      <pre>{result}</pre>
    </article>
  );
};

export default Page