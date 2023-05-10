import React from "react";
import useTodoForm from "./hooks/useTodoForm";
import { Form, Input, Modal } from "antd";
import { FormOutlined } from "@ant-design/icons";

const LayoutStyles = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
};

const TodoForm = ({ isTodoFormOpen, handleCloseTodoForm }) => {
  const {
    modalSubject,
    title,
    content,
    handleChangeTitle,
    handleChangeContent,
    handleSubmit,
  } = useTodoForm();

  return (
    <Modal
      title={
        <div>
          <FormOutlined style={{ marginRight: "10px" }} />
          <span>{modalSubject}</span>
        </div>
      }
      open={isTodoFormOpen}
      onOk={handleSubmit}
      okText="저장"
      onCancel={handleCloseTodoForm}
      cancelText="취소"
      bodyStyle={{
        borderTop: "1px solid #eaedf2",
        borderBottom: "1px solid #eaedf2",
      }}
    >
      <Form
        {...LayoutStyles}
        style={{
          paddingTop: "20px",
          marginTop: "10px",
          maxWidth: 600,
        }}
      >
        <Form.Item
          label="작업 이름"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input value={title} onChange={handleChangeTitle} />
        </Form.Item>
        <Form.Item label="작업 내용">
          <Input.TextArea
            value={content}
            onChange={handleChangeContent}
            style={{ height: "250px", maxHeight: "500px" }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TodoForm;
