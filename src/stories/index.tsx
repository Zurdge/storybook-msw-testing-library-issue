import { FC, useState } from 'react';

const APIRequest = ():Promise<void>=>{
  return new Promise((resolve, reject)=>{
    fetch('/api/test', {
      method:"GET"
    })
    .then(({status})=>{
      if(status !== 200){
        reject(new Error("status was not 200!"))
      }else{
        resolve()
      }
    })
  })
}
const Page: FC = () => {
  const [result, setResult] = useState<string>('pending')
  return (
    <article>
      <h1>Example Page</h1>
      <button onClick={()=>APIRequest().then(()=>{
        setResult('SUCCESS')
      }).catch(()=>setResult("FAILURE"))}>Click to make API request</button>
      <div>{result}</div>
    </article>
  );
};

export default Page