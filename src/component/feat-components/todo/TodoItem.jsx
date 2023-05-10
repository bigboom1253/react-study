import React from "react";
import { Button, Checkbox, List } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const TodoItem = ({
  item,
  handleDeleteTodo,
  handleToggleTodoComplete,
  handleOpenTodoForm,
}) => {
  return (
    <List.Item
      className={
        item.status === "completed" ? "completed-todo-wrap" : "active-todo-wrap"
      }
    >
      <Checkbox
        className="check-box"
        checked={item.status === "completed"}
        onChange={() => handleToggleTodoComplete(item.id)}
      />
      <List.Item.Meta
        className="todo-contents-wrap"
        onClick={() => handleOpenTodoForm(item)}
        avatar={String.fromCodePoint(parseInt(item.emoji, 16))}
        title={
          <div
            className={
              item.status === "completed"
                ? "completed-todo-title"
                : "active-todo-title"
            }
          >
            {item.title}
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
        <Button size="small" onClick={() => handleDeleteTodo(item.id)}>
          <DeleteOutlined />
        </Button>
      </div>
    </List.Item>
  );
};

export default React.memo(TodoItem);
