import Header from "./user/Header";
//import Footer from "./user/Footer";
import { Outlet } from "react-router-dom";
const UserLayout = () => {
    return (
        <>
            <Header />
            <div className="bodyContainer">


                <div className="contentDemo1">

                </div>
                <div className="contentDemo2">

                    <Outlet />
                    {/* <Footer /> */}

                </div>
                <div className="contentDemo3">

                </div>

            </div>

        </>
    );
};

export default UserLayout;