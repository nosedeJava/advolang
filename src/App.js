import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Panel} from './components/Panel';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import PruebaReactIndex from './components/PruebaReactIndex';
import PruebaReactIndex2 from './components/PruebaReactIndex2'
import { useRouteMatch, useHistory } from 'react-router-dom';
import auth from './components/authentication/auth.js';
import { Main } from "./components/Main";

const pruebaReactIndex = () => (
    <PruebaReactIndex />
);

const pruebaReactIndex2 = () => (
    <PruebaReactIndex2 />
);

const routes = [
  {
    path: "/",
    name: "pruebaReactIndex",
  },
  {
    path: "/pruebaReactIndex2",
    name: "pruebaReactIndex2",
  }
];

export default function  App(props)  {

    const isLoggedIn = true;
    var page;

    const history=useHistory();

    if(!isLoggedIn){
      page = (
        <div>

          <div>
            Not logged
            {//<Route exact path="/" component={actualPage.componentValue}/>
        }
          </div>
        </div>
      );
    }
    else{
      page = (
        <div>

          <div>
            <Route  component={pruebaReactIndex}/>
          </div>
        </div>
      );

    }

    return (

      <div>

          <Panel menuList={routes}  history={history}/>

          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/pruebaReactIndex2" component={pruebaReactIndex2} />
            <Route path="*" component={() => "404 NOT FOUND"} />
          </Switch>
      </div>

    );
  }
