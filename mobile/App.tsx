import React from 'react';
import { StyleSheet, View } from 'react-native';
import {BrowserRouter} from "react-router-dom";
import {Route} from "react-router";
import NewTodo from "./pages/todo/CreateTodo";
import TodoList from "./pages/todo/Todolist";
import EditTodo from "./pages/todo/EditTodo";
import Auth from "./pages/auth/Auth";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Navbar from "./pages/Navbar";
import MainPage from "./pages/auth/MainPage";


export default function App() {
  return (
      <>
          <BrowserRouter>
              <Route path="/auth" component={Auth} exact/>
             <Route path="/" component={MainPage} exact/>
             <Route path="/register" component={Register} exact/>
            <Route path="/login" component={Login} exact/>
            <Route path="/create-todo" component={NewTodo} exact/>
            <Route path="/todo-list" component={TodoList} exact/>
            <Route path="/edit-todo/:id" component={EditTodo} exact/>
     </BrowserRouter>
      </>
  );
}





const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20
  },
});
