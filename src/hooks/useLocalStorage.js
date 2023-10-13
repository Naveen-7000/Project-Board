import { useEffect } from "react"
export const useLocalStorage = ({key,data}) =>{
    useEffect(()=>{
     localStorage.setItem(key,JSON.stringify(data));
    },[key,data]);

}

