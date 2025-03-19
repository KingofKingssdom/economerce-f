import { Outlet } from "react-router-dom";
import Sidebar from "./admin/SideBar"
const AdminLayout = () => {
    return(
        <>
        <div className="container-admin">
        <Sidebar/>
         <Outlet /> 
        </div>
        </>
    )
}
export default AdminLayout