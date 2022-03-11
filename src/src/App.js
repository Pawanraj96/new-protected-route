import { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import AddProduct from "./components/AddProduct";
import Home from "./components/Home";
import Login from "./components/Login";
import Products from "./components/Products";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [isLogin, setisLogin] = useState(false);
  const login = localStorage.getItem("isLogin")
  return (
    <Router>
      <div className="App">
        <Navbar bg="light" expand="xxl">
          <Container>
            <Navbar.Brand>Ekart</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {isLogin || login ?
                  <><Link to="/products">Products</Link>
                    <Link to="/add-product">Add Product</Link>
                    <Link to="/logout" onClick={() => {
                      setisLogin(false)
                      localStorage.clear()
                    }}>Logout</Link></> : <><Link to="/login">Login</Link>
                    <Link to="/register">Register</Link></>}
                {/* {isLogin ? null : <><Link to="/logout" onClick={()=>{setisLogin(false)
                localStorage.clear()}}>Logout</Link></>} */}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div>
          <Route exact={true} path="/" component={Home} />
          <ProtectedRoute path="/products" component={Products} setisLogin={setisLogin} />
          <Route path="/add-product" component={AddProduct} />
          <Route exact path="/login" component={Login}>
          <Login isLogin={isLogin} setisLogin={setisLogin} />
          </Route>
        </div>
      </div>
    </Router>
  );
}

export default App;
