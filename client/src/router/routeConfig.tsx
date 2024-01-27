import {RouteProps} from "react-router-dom";
import {CatalogPage} from "../pages/CatalogPage/CatalogPage.tsx";
import {FavoritesPage} from "../pages/FavoritesPage/FavoritesPage.tsx";


export enum AppRoutes {
    CATALOG = 'catalog',
    FAVORITES = 'favorites'

}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.CATALOG]: '/catalog',
    [AppRoutes.FAVORITES]: '/favorites'
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.CATALOG]: {
        path: RoutePath.catalog,
        element: <CatalogPage/>
    },
    [AppRoutes.FAVORITES]: {
        path: RoutePath.favorites,
        element: <FavoritesPage/>
    }
}
