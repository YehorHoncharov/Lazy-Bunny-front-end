import { useRef, ReactNode, useEffect } from "react"
import "./Modal.css"
import { createPortal } from "react-dom"

interface IModalProps {
    children: ReactNode,
    allowModalCloseOutside: boolean,
    onClose: ()=> void,
    container?: Element
    className: string,
}



export function Modal(props: IModalProps){
    let {children, allowModalCloseOutside, onClose, container=document.body, className} = props


    function handleClickOutside(event: MouseEvent){
    
        console.log(event.target)
        console.log(modalRef.current)

        if (modalRef.current !== event.target && !modalRef.current?.contains(event.target as Node)){
            onClose()
        }
    }

    useEffect(() => {
        if (!allowModalCloseOutside){
            return
        }

        document.addEventListener("click", handleClickOutside)
        return () => {
            document.removeEventListener("click", handleClickOutside)
        }
    }, [])

    
    const classModal = "modal "
    const classNames = classModal + className
    const modalRef = useRef<HTMLDivElement | null>(null)

    return createPortal(
        <div ref={modalRef} className = {classNames} >{children}</div>,
        container
    ) 
}