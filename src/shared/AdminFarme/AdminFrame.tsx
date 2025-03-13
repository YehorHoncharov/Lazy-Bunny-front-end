
import { ReactNode } from "react";
import "./AdminFrame.css";

interface IAdminFrame{
    children?: ReactNode
}

export function AdminFrame(props: IAdminFrame){
    return (
        <div className="adminFrame">
            { props.children}
        </div>
    )
}