import Header from "./user/Header";
import HeaderChild from "./user/HeaderChild";
//import Footer from "./user/Footer";
import { Outlet } from "react-router-dom";
const UserLayout = () => {
    return (
        <>
            <div className="bodyContainer">
                <Header />

                <div className="contentDemo1">

                </div>
                <div className="contentDemo2">

                    <Outlet />
                    {/* <Footer /> */}
                    <HeaderChild />

                </div>
                <div className="contentDemo3">

                </div>

            </div>

        </>
    );
};

export default UserLayout;