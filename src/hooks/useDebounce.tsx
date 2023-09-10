import {useEffect,useState} from 'react'

export default function useDebounce(search:any,delay:number) {
    const [debouncedValue,setDebouncedValue] = useState()
    useEffect(()=>{
        const handler = setTimeout(()=>{
            setDebouncedValue(search)
        },delay)

        return () =>{
                  clearTimeout(handler);
        }
    },[search,delay]);
    return debouncedValue;
}
