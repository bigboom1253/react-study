import React, { useCallback, useMemo, useState } from "react";
import { useTodoContext } from "../Providers/TodoProvider";

const useTodo = () => {
  const {
    todos,
    handleAddTodo,
    handleDeleteTodo,
    handleEditTodo,
    handleToggleTodoComplete,
    selectedTodo,
    handleChangeSelectedTodo,
    handleCloseTodoForm,
    handleOpenTodoForm,
    isTodoFormOpen,
  } = useTodoContext();

  const [filterValue, setFilterValue] = useState("all");

  const filteredTodoByStatus = useMemo(() => {
    if(filterValue === "all"){
        return todos;
    }
    return todos.filter((todo) => todo.status === filterValue);
  }, [filterValue, todos]);

  const handleChangeFilter = useCallback((e) => {
    setFilterValue(e.target.value)
  },[]);

  return {
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
    handleChangeSelectedTodo,
  };
};

export default useTodo;
