import "./indexAdmin.css"
import { IoIosNotifications } from "react-icons/io";
import { FaUser } from "react-icons/fa";
function HeaderSide() {
    let username = sessionStorage.getItem('user');
    let userObj = JSON.parse(username);
    return (
        <>
            <div className="header-sider">
                <div className="header-sider-left">
                    <IoIosNotifications />
                </div>
                <div className="header-sider-right">
                    <FaUser /> {userObj.fullName}
                </div>
            </div>
        </>
    )
}
export default HeaderSide;