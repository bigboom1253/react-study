import React, { useEffect, useRef, useState } from "react";
import { Button, Checkbox, List } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import TodoForm from "../TodoForm/TodoForm";
import "./TodoList.css";
import { produce } from "immer";
import { useDarkMode } from "../feat-components/todo/Providers/ThemeProvider";
import { AlertProvider } from "../../test";

const TodoList = ({ filter }) => {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState({});
  const [isTodoFormOpen, setIsTodoFormOpen] = useState(false);
  const [todoFormType, setTodoFormType] = useState("");
  const { darkMode } = useDarkMode();
  const filteredTodo = getFilteredTodo(filter, todos);
  const darkModeChangeRef = useRef(null);
  const defaultTodos = [
    {
      id: "1",
      title: "작업1",
      contents: "내용1",
      status: "active",
      emoji: "1F983",
    },
    {
      id: "2",
      title: "작업2",
      contents: "내용2",
      status: "completed",
      emoji: "1F414",
    },
    {
      id: "3",
      title: "작업3",
      contents: "내용3",
      status: "active",
      emoji: "1F413",
    },
    {
      id: "4",
      title: "작업4",
      contents: "내용4",
      status: "active",
      emoji: "1F46F",
    },
    {
      id: "5",
      title: "작업5",
      contents: "내용5",
      status: "active",
      emoji: '1F411"',
    },
  ];

  const handleAddTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const handleEditTodo = (editedTodo) => {
    setTodos(
      todos.map((todo) => {
        return todo.id === editedTodo.id ? editedTodo : todo;
      })
    );
  };

  const handleDeleteTodo = (item) => {
    if (item.id !== null) {
      setTodos(
        todos.filter((todo) => {
          return todo.id !== item.id;
        })
      );
    }
  };

  const handleTodoFormClose = () => {
    setSelectedTodo({});
    setIsTodoFormOpen(false);
  };
  const handleTodoFormOpen = (state, item = {}) => {
    setTodoFormType(state);
    setSelectedTodo(item);
    setIsTodoFormOpen(true);
  };

  const handleChangeStatus = (todo) => {
    if (todo.status === "completed") {
      const newTodos = produce(todos, (draftTodos) => {
        draftTodos.map((draftTodo) => {
          if (draftTodo.id === todo.id) {
            draftTodo.status = "active";
          }
          return draftTodo;
        });
      });
      setTodos(newTodos);
    } else if (todo.status === "active") {
      const newTodos = produce(todos, (draftTodos) => {
        draftTodos.map((draftTodo) => {
          if (draftTodo.id === todo.id) {
            draftTodo.status = "completed";
          }
          return draftTodo;
        });
      });
      setTodos(newTodos);
    }
  };

  useEffect(() => {
    setTodos(defaultTodos);
  }, []);

  useEffect(() => {
    if (darkMode) {
      darkModeChangeRef.current.classList.add("dark");
    } else {
      darkModeChangeRef.current.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <section ref={darkModeChangeRef}>
      <List
        className="todo-wrap"
        itemLayout="horizontal"
        dataSource={filteredTodo}
        renderItem={(item) => (
          <List.Item
            className={
              item.status === "completed"
                ? "completed-todo-wrap"
                : "active-todo-wrap"
            }
          >
            <Checkbox
              className="check-box"
              checked={item.status === "completed"}
              onChange={() => handleChangeStatus(item)}
            />
            <List.Item.Meta
              className="todo-contents-wrap"
              onClick={() => handleTodoFormOpen("edit", item)}
              avatar={String.fromCodePoint(parseInt(item.emoji, 16))}
              title={
                <div
                  className={
                    item.status === "completed"
                      ? "completed-todo-title"
                      : "active-todo-title"
                  }
                >
                  {item.title}{" "}
                </div>
              }
              description={
                <div
                  className={
                    item.status === "completed"
                      ? "completed-todo-info"
                      : "active-todo-info"
                  }
                >
                  {item.contents}
                </div>
              }
            />
            <div className="todo-menu">
              <Button size="small" onClick={() => handleDeleteTodo(item)}>
                <DeleteOutlined />
              </Button>
            </div>
          </List.Item>
        )}
      />
      <div className="bottom-contents">
        <Button onClick={() => handleTodoFormOpen("add")}>
          <PlusOutlined /> 작업추가
        </Button>
      </div>
      {selectedTodo && (
        <TodoForm
          isTodoFormOpen={isTodoFormOpen}
          todoFormType={todoFormType}
          handleAddTodo={handleAddTodo}
          handleTodoFormClose={handleTodoFormClose}
          selectedTodo={selectedTodo}
          handleEditTodo={handleEditTodo}
        />
      )}
    </section>
  );
};

export default TodoList;

function getFilteredTodo(filter, todos) {
  if (filter === "all") {
    return todos;
  }
  return todos.filter((todo) => todo.status === filter);
}
