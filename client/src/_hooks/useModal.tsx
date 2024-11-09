import { useCallback, useState } from "react"

const useModal = () => {
    const [open, setOpen] = useState(false);
    const [modalData, setModalData] = useState(null);

    const toggle = useCallback(() => {
        setOpen(prev => {
            if(prev){
                setModalData(null);
            }
            return !prev
        })

    }, [])
    const onSetModalData = useCallback(( data: any ) => {
        setModalData(data)
    }, []);

  return (
    {
        open,
        toggle,
        modalData,
        setModalData: onSetModalData
    }
  )
}

export default useModal