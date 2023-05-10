import React from "react";
import TodoProvider from "./component/feat-components/todo/Providers/TodoProvider";
import ThemeProvider from "./component/feat-components/todo/Providers/ThemeProvider";
import AlertProvider from "./component/feat-components/todo/Providers/AlertProvider";
import Todo from "./component/feat-components/todo";
import "./App.css";


const App = () => {
  return (
    <div id="root-layout">
      <ThemeProvider>
        <AlertProvider>
          <TodoProvider>
            <Todo />
          </TodoProvider>
        </AlertProvider>
      </ThemeProvider>
    </div>
  );
};

export default App;
