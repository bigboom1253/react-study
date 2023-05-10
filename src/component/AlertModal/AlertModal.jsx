import React from "react";
import { Card, Button, Space } from "antd";

const AlertModal = ({ isOpen, alertOptions, handleClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <Card
      title={alertOptions?.title}
      bordered={true}
      style={{
        maxWidth: "250px",
        position: "fixed",
        zIndex: 9999,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        boxShadow: "0 0 30px rgba(0,0,0,.3)",
      }}
    >
      <div style={{ padding: "20px" }}>{alertOptions?.content}</div>
      <Space
        size="middle"
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button type="primary" onClick={handleClose}>
          확인
        </Button>
      </Space>
    </Card>
  );
};

export default AlertModal;
