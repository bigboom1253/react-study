import React, { useEffect, useState } from "react";
import { Form, Input, Modal } from "antd";
import { FormOutlined } from "@ant-design/icons";

const TodoForm = ({
  isTodoFormOpen,
  todoFormType,
  selectedTodo,
  handleAddTodo,
  handleEditTodo,
  handleTodoFormClose,
}) => {
  const [formValues, setFormValues] = useState({
    title: "",
    contents: "",
    emoji: "",
  });

  useEffect(() => {
    if (todoFormType === "edit" || "detail") {
      setFormValues((prevState) => ({
        ...prevState,
        title: selectedTodo.title,
        contents: selectedTodo.contents,
      }));
    }
  }, [todoFormType, selectedTodo]);

  useEffect(() => {
    fetch("https://emojihub.yurace.pro/api/random")
      .then((res) => res.json())
      .then((data) => {
        setFormValues((prevState) => ({
          ...prevState,
          emoji: data.unicode[0].replace(/^U\+/, ""),
        }));
      })
      .catch((e) => {
        console.log(e);
      });
  }, [isTodoFormOpen]);

  const cleanForm = () => {
    setFormValues({ title: "", contents: "", emoji: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todoFormType === "add") {
      const newTodo = {
        id: new Date().getTime(),
        title: formValues.title,
        contents: formValues.contents,
        status: "active",
        emoji: formValues.emoji,
      };

      handleAddTodo(newTodo);
    } else if (todoFormType === "edit") {
      const editedTodo = {
        id: selectedTodo.id,
        title: formValues.title,
        contents: formValues.contents,
        status: "active",
        emoji: selectedTodo.emoji,
      };
      handleEditTodo(editedTodo);
    } else {
      throw console.error("잘못된 접근입니다");
    }
    cleanForm();
    handleTodoFormClose();
  };

  const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
  };

  return (
    <div>
      <Modal
        title={
          <div>
            <FormOutlined style={{ marginRight: "10px" }} />
            <span>{todoFormType === "add" ? "작업 추가" : "작업 수정"}</span>
          </div>
        }
        open={isTodoFormOpen}
        onOk={handleSubmit}
        okText="저장"
        onCancel={handleTodoFormClose}
        cancelText="취소"
        bodyStyle={{
          borderTop: "1px solid #eaedf2",
          borderBottom: "1px solid #eaedf2",
        }}
      >
        <Form
          {...layout}
          style={{
            paddingTop: "20px",
            marginTop: "10px",
            maxWidth: 600,
          }}
        >
          <Form.Item label="작업 이름">
            <Input
              value={formValues.title}
              onChange={(event) =>
                setFormValues((prevState) => ({
                  ...prevState,
                  title: event.target.value,
                }))
              }
            />
          </Form.Item>
          <Form.Item label="작업 내용">
            <Input.TextArea
              value={formValues.contents}
              onChange={(event) =>
                setFormValues((prevState) => ({
                  ...prevState,
                  contents: event.target.value,
                }))
              }
              style={{ height: "250px", maxHeight: "500px" }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TodoForm;
