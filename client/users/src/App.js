
import CreateProduct from './components/CreateProduct'
import CreateUser from './components/CreateUser'
//import {BrowserRouter as Router, Route, Switch, Routes} from 'react-router-dom' 
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <div className="App">
        <Router>
          <NavBar/>
           <Routes>
            
              <Route path="/users" element={ <CreateUser/>}/>
          
              <Route path ="/products" element={ <CreateProduct/>}/>
                
            </Routes>
          </Router>
      </div>
    </>
  );

}

export default App;
