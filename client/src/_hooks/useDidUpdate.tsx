import { useEffect, useRef } from "react"

const useDidUpdate = ( cb: any, deps: any[]) => {
    const hasMount = useRef(false);

    useEffect(() => {
        if(hasMount.current){
            cb();
        }else{
            hasMount.current = true;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
    
  return (
    <div>useDidUpdate</div>
  )
}

export default useDidUpdate