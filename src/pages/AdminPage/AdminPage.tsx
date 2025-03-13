
import { Outlet } from "react-router-dom";
import { AdminFrame } from "../../shared/AdminFarme/AdminFrame";
import { Footer } from "../../shared/Footer/Footer";
import { Header } from "../../shared/Header/Header";
import { Panel } from "../../shared/Panel/Panel";
import "./AdminPage.css";
export function AdminPage(){
    return (
        <div className='contener'>
            <Header />
            <div className="adminPage">
                <AdminFrame>
                    <Outlet></Outlet>
                </AdminFrame>
                <Panel/>
            </div>
            <Footer />
        </div>
    )
}