import {Suspense, useEffect} from 'react'
import Profile from "./Page/Profile/Profile.jsx";
import Top from "./Components/TopElement/Top.jsx";
import ListModule from "./Page/ListModule/ListModule.jsx";
import {Route, Routes, useLocation} from "react-router-dom";
import Module from "./Components/Module/Module.jsx";
import ModuleTest from "./Components/ModuleTest/ModuleTest.jsx";
import ModuleQuestion from "./Components/ModuleQuestion/ModuleQuestion.jsx";
import Registration from "./Page/Registration/Registration.jsx";

import {useTelegram} from "./hooks/useTelegram.jsx";
function App() {
    const {webApp} = useTelegram()
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const routes = [
        {
            link: '/',
            element: <><Top type={'Модули'}/><ListModule/></>,
        },
        {
            link: '/profile',
            element:<><Top type={'Мой кабинет'}/><Profile/></>,
        },
        {
            link: '/module',
            element:<><Top type={'Модуль 1'} back={'/'}/><Module/></>,
        },
        {
            link: '/module-test/:id',
            element:<><ModuleTest/></>,
        },
        {
            link: '/module-test/:id/:type',
            element:<><ModuleQuestion/></>,
        },
        {
            link: '/reg',
            element:<><Registration/></>,
        },
        {
            link: '*',
            element: <ListModule/>,
        },
    ];
  return (
    <>
        <Routes>
            {routes.map(route => (
                <Route
                    key={route.link}
                    path={route.link}
                    element={
                        <Suspense fallback={<></>}>
                            {route.element}
                        </Suspense>
                    }
                />
            ))}
        </Routes>
    </>
  )
}

export default App
