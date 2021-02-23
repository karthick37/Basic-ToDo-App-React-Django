import React from "react";
import logo from './logo.svg';
import './App.css';
import TodoList from './components/ToDoList';

//bootstrap fontawesome for fonts and icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash, faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
library.add(faTrash, faEdit, faPlus);


function App() {
  return (
    <div className="App">
      <TodoList></TodoList>
    </div>
  );
}

export default App;
