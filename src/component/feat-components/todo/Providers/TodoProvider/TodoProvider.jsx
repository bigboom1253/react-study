import React, { createContext, useCallback, useContext, useState } from "react";

const TodoContext = createContext(null);

export const useTodoContext = () => {
  const context = useContext(TodoContext);

  if (context === undefined) {
    throw new Error("useTodo must be used within a TodoContext");
  }

  return context;
};

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

const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState(defaultTodos);
  const [selectedTodo, setSelectedTodo] = useState({});
  const [isTodoFormOpen, setIsTodoFormOpen] = useState(false);

  const handleChangeSelectedTodo = useCallback((todo) => {
    setSelectedTodo(todo);
  });

  const handleCloseTodoForm = useCallback(() => {
    setIsTodoFormOpen(false);
    handleChangeSelectedTodo({});
  }, [handleChangeSelectedTodo]);

  const handleOpenTodoForm = useCallback(
    (item = {}) => {
      setIsTodoFormOpen(true);
      handleChangeSelectedTodo(item);
    },
    [handleChangeSelectedTodo]
  );

  const handleAddTodo = useCallback(
    (newTodo) => {
      setTodos([...todos, newTodo]);
    },
    [todos]
  );

  const handleEditTodo = useCallback(
    (editedTodo) => {
      setTodos(
        todos.map((todo) => {
          return todo.id === editedTodo.id ? editedTodo : todo;
        })
      );
    },
    [todos]
  );

  const handleDeleteTodo = useCallback(
    (id) => {
      if (id !== null) {
        setTodos(
          todos.filter((todo) => {
            return todo.id !== id;
          })
        );
      }
    },
    [todos]
  );

  const handleToggleTodoComplete = useCallback(
    (id) => {
      setTodos(
        todos.map((todo) => {
          return todo.id === id
            ? {
                ...todo,
                status: todo.status === "completed" ? "active" : "completed",
              }
            : todo;
        })
      );
    },
    [todos]
  );

  return (
    <TodoContext.Provider
      value={{
        todos,
        handleAddTodo,
        handleEditTodo,
        handleDeleteTodo,
        handleToggleTodoComplete,
        selectedTodo,
        isTodoFormOpen,
        handleOpenTodoForm,
        handleCloseTodoForm,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
