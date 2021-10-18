import "./App.css";
import Navbar from "./Components/Navbar";
import { Switch, Route } from "react-router";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Cart from "./Pages/Cart";
import Error from "./Pages/Error";
import Books from "./Pages/Books";
import Profile from "./Pages/Profile";
import Login from "./Pages/Login/Login";
import PrivateRoute from "./Router/PrivateRoute";
import { useDispatch } from "react-redux";
import { current } from "./JS/actions/users";
import { useEffect } from "react";
import Account from "./Pages/MyAccount/Account";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      dispatch(current());
    }
  }, [dispatch, token]);
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/Register" component={Register} />
        <Route path="/Login" component={Login} />
        <Route path="/my-shopping-cart" component={Cart} />
        <Route path="/Browse-books" component={Books} />
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/account" component={Account} />
        <Route path="/*" component={Error} />
      </Switch>
    </div>
  );
}

export default App;
