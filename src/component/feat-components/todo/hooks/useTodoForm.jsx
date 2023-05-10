import React, { useEffect, useState, useCallback } from "react";
import { useAlert } from "../Providers/AlertProvider";
import { useTodoContext } from "../Providers/TodoProvider";
import axios from "axios";

const useTodoForm = () => {
  const {
    handleAddTodo,
    handleEditTodo,
    selectedTodo,
    isTodoFormOpen,
    handleCloseTodoForm,
  } = useTodoContext();

  const { handleOpen } = useAlert();
  const [formValues, setFormValues] = useState({
    title: "",
    contents: "",
    emoji: "",
  });
  const [randomEmoji, setRandomEmoji] = useState("");
  const modalSubject = !selectedTodo?.id ? "작업 추가" : "작업 수정";

  useEffect(() => {
    setFormValues((prevState) => ({
      ...prevState,
      title: selectedTodo?.title,
      contents: selectedTodo?.contents,
    }));
  }, [selectedTodo]);

  useEffect(() => {
    axios
      .get("https://emojihub.yurace.pro/api/random")
      .then(({ data }) => {
        setRandomEmoji(data.unicode[0].replace(/^U\+/, ""));
      })
      .catch((e) => {
        console.log(e);
      });
  }, [isTodoFormOpen]);

  const cleanForm = useCallback(() => {
    setFormValues({ title: "", contents: "", emoji: "" });
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!selectedTodo?.id) {
        const newTodo = {
          id: new Date().getTime(),
          title: formValues.title,
          contents: formValues.contents,
          status: "active",
          emoji: randomEmoji,
        };
        if (!formValues.title) {
          handleOpen({
            title: "안돼!!",
            content: "제목이 비어있습니다.",
          });

          return;
        }

        handleAddTodo(newTodo);
      } else {
        const editedTodo = {
          id: selectedTodo.id,
          title: formValues.title,
          contents: formValues.contents,
          status: selectedTodo.status,
          emoji: selectedTodo.emoji,
        };

        if (!formValues.title) {
          handleOpen({
            title: "안돼!!",
            content: "제목이 비어있습니다.",
          });
          return;
        };

        handleEditTodo(editedTodo);
      }

      cleanForm();
      handleCloseTodoForm();
    },
    [
      cleanForm,
      handleAddTodo,
      handleCloseTodoForm,
      handleEditTodo,
      randomEmoji,
      selectedTodo.emoji,
      selectedTodo.id,
      formValues,
    ]
  );

  const handleChangeTitle = useCallback((e) => {
    setFormValues((prev) => ({ ...prev, title: e.target.value }));
  }, []);

  const handleChangeContent = useCallback((e) => {
    setFormValues((prev) => ({ ...prev, contents: e.target.value }));
  }, []);

  return {
    modalSubject,
    title: formValues.title,
    content: formValues.contents,
    handleChangeTitle,
    handleChangeContent,
    handleSubmit,
  };
};

export default useTodoForm;
