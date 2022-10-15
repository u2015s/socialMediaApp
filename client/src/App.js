import Login from "./pages/Login";
import Register from "./pages/Register";

import Layout from "./components/Layout";
import Layout2 from "./components/Layout2";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import { Route, Switch } from "react-router";
import Home from "./pages/Home";
import Message from "./pages/Message";
import PostDetails from "./pages/PostDetails";
import MessageDetails from "./pages/MessageDetails";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { setAuth } from "./redux/authSlice";

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if ("login" in localStorage) {
      const login = JSON.parse(localStorage.getItem("login"));
      axios.defaults.headers.common["authorization"] = `Bearer ${login.token}`;
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const { isLoggedIn } = JSON.parse(localStorage.getItem("login")) || {};
    if (isLoggedIn) {
      dispatch(setAuth({ isLoggedIn }));
    }
  }, [dispatch, isLoggedIn]);
  
  return (
    <Switch>
      <PrivateRoute exact path="/profile/:id">
        <Layout>
          <Profile />
        </Layout>
      </PrivateRoute>
      <PrivateRoute exact path="/posts/:id">
        <Layout>
          <PostDetails />
        </Layout>
      </PrivateRoute>
      <PrivateRoute exact path="/home">
        <Layout>
          <Home />
        </Layout>
      </PrivateRoute>
      <PrivateRoute exact path="/messages">
        <Layout>
          <Message />
        </Layout>
      </PrivateRoute>
      <PrivateRoute exact path="/messages/:id">
        <Layout>
          <MessageDetails />
        </Layout>
      </PrivateRoute>
      <Route exact path="/">
        <Login />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/register">
        <Register />
      </Route>
    </Switch>
  );
}

export default App;
