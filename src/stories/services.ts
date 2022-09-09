import { useQuery, UseQueryResult } from "@tanstack/react-query";

interface APIService {
    counter: number;
    onError: (error: any) => void;
}

export const useAPIService = ({
    counter,
    onError,
}:APIService): UseQueryResult<
    any,
    any
> => {

  return useQuery(
        ['helloWorld', counter],
        () =>
         new Promise((resolve, reject)=>{
            fetch('/msw/test/')
            .then((response)=>{
              if(!response.ok){
                reject(new Error("Responce was not OK!"))
              }else{
                resolve(response.json())
              }
            })
          }),
        {
            enabled: counter > 0,
            onError,
            refetchOnWindowFocus: false,
            retry: 2,
        }
    );
};
