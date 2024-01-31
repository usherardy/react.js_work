
import CreateProduct from './components/CreateProduct'
import CreateUser from './components/CreateUser'
//import {BrowserRouter as Router, Route, Switch, Routes} from 'react-router-dom' 
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {

  return (
    <>
      <div className="App">
        <Router>
        <div className="navigation">
      <Link to="/users" className="nav-link">Users</Link>
      <Link to="/products" className="nav-link">Products</Link>
    </div>
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
