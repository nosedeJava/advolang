import React from 'react';
import "./App.css";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {ProtectedRoute} from './components/protectedRouteComponent/ProtectedRoute';
import {SignIn} from "./components/signComponent/SignIn";
import {SignUp} from "./components/signComponent/SignUp";
import PrincipalView from "./components/recommendationComponent/PrincipalView";
import SpecificRecommendation from "./components/specificRecommendationComponent/SpecificRecommendation"
import CreateRecommendation from "./components/createRecomendationComponent/createRecommendation/CreateRecommendation";
import { useEffect } from 'react';
import HomeIcon from '@material-ui/icons/Home';
import PostAddIcon from '@material-ui/icons/PostAdd';

export default function App(props) {

    const routes = [
        {
            path: "/",
            name: "Home",
            component: PrincipalView,
            menuVisible: true,
            menuIcon:() => <HomeIcon />
        },
        {
            path: "/createRecommendation",
            name: "Crear recomendación",
            component: CreateRecommendation,
            menuVisible: true,
            menuIcon:() => <PostAddIcon />
        },
        {
            path: "/specific-recommendation",
            name: "Specific recommendation",
            component: SpecificRecommendation,
            menuVisible: false,
        }

    ];

    useEffect(() => {
      window.scrollTo(0, 0)
    }, []);

    const protectedElements = routes.map((route, i) =>
        <ProtectedRoute exact path={route.path} component={route.component} menuList={routes} key={i}/>
    );

    return (
        <BrowserRouter>
            <div>
                <Switch>
                    <Route exact path="/login" component={SignIn}/>
                    <Route exact path="/signup" component={SignUp}/>
                    {protectedElements}
                    <Route path="*" component={() => "404 NOT FOUND"}/>
                </Switch>
            </div>
        </BrowserRouter>

    );
}
