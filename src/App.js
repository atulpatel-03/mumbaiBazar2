import React, {Fragment, useState, useEffect } from "react";
import { Redirect, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import fire from "./fire";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Creategame from "./components/Creategame";
import Declare from "./components/Declare";
import Users from "./components/Users";
import './App.css';
import Rate from "./components/Rate";
import Request from "./components/Request";
import RateGully from "./components/RateGully";
import Setting from "./components/Setting";
import Transaction from "./components/Transaction";
import BonusAmount from "./components/BonusAmount";

function App() {
  const [user, setUser] = useState('');


  const authListener = () =>{
    fire
    .auth().onAuthStateChanged(user => {
      if(user){
        setUser(user);
        <Redirect to="/dashboard" />
        console.log("my user",user);
      }else{
        setUser("");
      }
    })
  }

  useEffect(() => {
    authListener();
  },[])



  return (
      <Router>
        <Fragment>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/users" component={Users} />
            <Route exact path="/create-game" component={Creategame} />
            <Route exact path="/declare-result" component={Declare} />
            <Route exact path="/game-rate" component={Rate} />
            <Route exact path="/request-list" component={Request} />
            <Route exact path="/gali-game-rate" component={RateGully} />
            <Route exact path="/setting" component={Setting} />
            <Route exact path="/all-transaction" component={Transaction} />
            <Route exact path="/bonus-amount" component={BonusAmount} />
          </Switch>
        </Fragment>
      </Router>
  );
}

export default App;
