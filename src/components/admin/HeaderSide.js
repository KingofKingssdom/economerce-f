import "./indexAdmin.css"
import { IoIosNotifications } from "react-icons/io";
import { FaUser } from "react-icons/fa";
function HeaderSide() {
    return (
        <>
            <div className="header-sider">
                <div className="header-sider-left">
                    <IoIosNotifications />
                </div>
                <div className="header-sider-right">
                    <FaUser /> Đức Huy
                </div>
            </div>
        </>
    )
}
export default HeaderSide;