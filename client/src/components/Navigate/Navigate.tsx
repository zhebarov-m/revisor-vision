import {NavLink} from "react-router-dom";
import {AppRoutes} from "../../router/routeConfig.tsx";
import styles from './Navigate.module.scss'

const Navigate = () => {
    return (
        <nav className={styles.nav}>
            <NavLink className={styles.link} to={AppRoutes.CATALOG}>Каталог</NavLink>
            <NavLink className={styles.link} to={AppRoutes.FAVORITES}>Избранное</NavLink>
        </nav>
    );
};

export default Navigate;
