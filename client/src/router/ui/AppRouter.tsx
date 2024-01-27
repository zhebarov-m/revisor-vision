import {Suspense} from 'react';
import {Route, Routes} from "react-router-dom";
import {routeConfig} from "../routeConfig.tsx";
import MainLayout from "../../layouts/MainLayout/MainLayout.tsx";

const AppRouter = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path='/' element={<MainLayout />}>
                    {Object.values(routeConfig).map(({element, path}) => (
                        <Route
                            key={path}
                            path={path}
                            element={(
                                <div className="page-wrapper">
                                    {element}
                                </div>
                            )}
                        />
                    ))}
                </Route>
            </Routes>
        </Suspense>
    );
};

export default AppRouter;
