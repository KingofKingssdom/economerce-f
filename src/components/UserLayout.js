import Header from "./user/Header";
import Footer from "./user/Footer";
import { Outlet } from "react-router-dom";
const UserLayout = () => {
    return (
        <>
            <Header />
            <Outlet /> 
            <Footer />
        </>
    );
};

export default UserLayout;