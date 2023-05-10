import React from "react";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import useTodo from "./hooks/useTodo";
import {useTheme} from "./Providers/ThemeProvider"
import { Radio, Button, List } from "antd";
import { BgColorsOutlined, PlusOutlined } from "@ant-design/icons";
import "./styles.css";

const Todo = () => {
  const { isDarkMode, handleToggleDarkMode } = useTheme();
  const {
    filteredTodoByStatus,
    handleAddTodo,
    handleDeleteTodo,
    handleEditTodo,
    handleToggleTodoComplete,
    handleChangeFilter,
    handleCloseTodoForm,
    handleOpenTodoForm,
    isTodoFormOpen,
    selectedTodo,
  } = useTodo();

  return (
    <div id="todo-layout">
      <div id="header-layout" className={isDarkMode ? "dark" : ""}>
        <h3 className="header-title">Todo List</h3>
        <Button className="theme-change-btn" onClick={handleToggleDarkMode}>
          <BgColorsOutlined />
        </Button>
        <Radio.Group
          className="filter-radio-btn"
          onChange={handleChangeFilter}
          defaultValue="all"
        >
          <Radio.Button value="all">all</Radio.Button>
          <Radio.Button value="active">active</Radio.Button>
          <Radio.Button value="completed">completed</Radio.Button>
        </Radio.Group>
      </div>
      <div className={isDarkMode ? "dark" : ""}>
        <List
          className="todo-wrap"
          itemLayout="horizontal"
          dataSource={filteredTodoByStatus}
          renderItem={(item) => (
            <TodoItem
              item={item}
              handleOpenTodoForm={handleOpenTodoForm}
              handleDeleteTodo={handleDeleteTodo}
              handleCloseTodoForm={handleCloseTodoForm}
              handleToggleTodoComplete={handleToggleTodoComplete}
            />
          )}
        />
        <div className="bottom-contents">
          <Button onClick={handleOpenTodoForm}>
            <PlusOutlined /> 작업추가
          </Button>
        </div>
        <TodoForm
          selectedTodo={selectedTodo}
          isTodoFormOpen={isTodoFormOpen}
          handleAddTodo={handleAddTodo}
          handleCloseTodoForm={handleCloseTodoForm}
          handleEditTodo={handleEditTodo}
        />
      </div>
    </div>
  );
};

export default Todo;
