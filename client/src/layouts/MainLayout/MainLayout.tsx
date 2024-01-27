import {Outlet} from "react-router-dom";
import Navigate from "../../components/Navigate/Navigate.tsx";

const MainLayout = () => {
    return (
        <div>
            <Navigate />
            <Outlet />
        </div>
    );
};

export default MainLayout;
