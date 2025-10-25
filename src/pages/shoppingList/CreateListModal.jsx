import React, { useState } from "react";
import { Modal, Input, Button, List } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function CreateListModal({ open, onCancel, onCreate }) {
  const [listName, setListName] = useState("");
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const addItem = () => {
    if (inputValue.trim() !== "") {
      setItems([...items, inputValue]);
      setInputValue("");
    }
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSave = (status) => {
    const newList = {
      id: Date.now(),
      name: listName || "Untitled List",
      status,
      items,
    };
    onCreate(newList);
    if (status === "Proceed") navigate("/products");
  };

  return (
    <Modal
      title="Create Shopping List"
      open={open}
      onCancel={onCancel}
      footer={null}
    >
      <Input
        placeholder="List name"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
        style={{ marginBottom: 16 }}
      />

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <Input
          placeholder="Add an item"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onPressEnter={addItem}
        />
        <Button  icon={<PlusOutlined/>} onClick={addItem} />
      </div>

      <List
        bordered
        dataSource={items}
        renderItem={(item, index) => (
          <List.Item
            actions={[<DeleteOutlined onClick={() => removeItem(index)} />]}
          >
            {item}
          </List.Item>
        )}
      />

      <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between" }}>
        <Button danger onClick={() => setItems([])}>
          Clear List
        </Button>
        <div>
          <Button onClick={() => handleSave("Draft")} style={{ marginRight: 8 }}>
            Save as Draft
          </Button>
          <Button style={{background: '#37B34A'}} type="primary" onClick={() => handleSave("Proceed")}>
            Proceed with Order
          </Button>
        </div>
      </div>
    </Modal>
  );
}
