import React from 'react'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
// import Page2 from './core/Page2';
import Print from './core/Print';
import Basic from './core/Form';

// import pp from './core/pp';
const Routes = () => {
    return ( 
        <Router>
            <Switch>
                <Route path="/" exact component={Basic}/>
                <Route path="/print" exact component={Print}/>
                {/* <Route path="/pp" exact component={pp}/> */}
            </Switch>
        </Router>
    );
}
 
export default Routes;