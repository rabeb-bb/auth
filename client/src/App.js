import "./App.css";
import Navbar from "./Components/Navbar";
import { Switch, Route } from "react-router";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Error from "./Pages/Error";
import Books from "./Pages/Books";
import Profile from "./Pages/Profile";
import Login from "./Pages/Login/Login";
import PrivateRoute from "./Router/PrivateRoute";
import AdminRoute from "./Router/AdminRoute";
import { useDispatch, useSelector } from "react-redux";
import { current, currentAdmin } from "./JS/actions/users";
import { useEffect } from "react";
import Account from "./Pages/MyAccount/Account";
import Admin from "./Pages/admin/Admin";
import Users from "./Components/Users";
import Sidebar from "./Components/Sidebar";
import User from "./Pages/User/User";
import NotAuth from "./Pages/NotAuth";

function App() {
  const user = useSelector((state) => state.userReducer.user);
  // const user = useSelector((state) => state.userReducer.user);
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
      <div style={{ display: "flex" }}>
        {user.role !== "admin" ? null : <Sidebar />}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/Register" component={Register} />
          <Route path="/Login" component={Login} />
          <Route path="/Browse-books" component={Books} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/account" component={Account} />
          <AdminRoute exact path="/admin" component={Admin} />
          <AdminRoute path="/admin/users" component={Users} />
          <AdminRoute path="/admin/user/:_id" component={User} />
          <Route path="/auth" component={NotAuth} />

          <Route path="/*" component={Error} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
