import React, { Component } from 'react';
import '../App.css';
import{BrowserRouter,Switch,Route} from  'react-router-dom'
import Main from "./Main";
import Login from "./Login"

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/Login"  component={Login}/>
                    <Route path="/" exact component={Main}/>
                    <Route component={Main}/>
                </Switch>
            </BrowserRouter>

        );
    }
}

export default App;