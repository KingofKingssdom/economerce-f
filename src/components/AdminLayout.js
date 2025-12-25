import { Outlet } from "react-router-dom";
import Sidebar from "./admin/SideBar"
import HeaderSide from "./admin/HeaderSide";
const AdminLayout = () => {
    return (
        <>
            <div className="container-admin">
                <Sidebar />
                <div>
                    <HeaderSide />
                    <Outlet />
                </div>

            </div>
        </>
    )
}
export default AdminLayout