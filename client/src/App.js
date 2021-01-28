import React, {useState} from 'react';
import { Container} from '@material-ui/core';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import useStyles from './styles';
import Navbar from './components/Navbar/Navbar';
import Scroll from './components/Scroll/scroll';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';






const App = () => {
    
    const[isRec, setIsRec] = useState(false);
    
     return(
      <BrowserRouter>
        <Container maxidth = "lg">
          <Scroll showBelow ={250}/>
            <Navbar isRec={isRec} setIsRec={setIsRec}/>
            <Switch>
              <Route  path="/" exact render={() =><Home isRec={isRec}/>}   />
              <Route  path="/auth" exact component={Auth} />
            </Switch>
        </Container>
      </BrowserRouter>
    );
  };

export default App;
