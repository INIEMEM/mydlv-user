import React, { useState } from "react";
import { Button, Row, Col, Modal, Empty } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CreateListModal from "./CreateListModal";
import ShoppingListCard from "./ShoppingListCard";

export default function ShoppingList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shoppingLists, setShoppingLists] = useState([
    {
      id: 1,
      name: "Weekly Groceries",
      status: "Saved",
      items: ["Rice", "Beans", "Oil"],
    },
    {
      id: 2,
      name: "Party Shopping",
      status: "Draft",
      items: ["Drinks", "Snacks"],
    },
  ]);

  const handleCreate = (newList) => {
    setShoppingLists([...shoppingLists, newList]);
    setIsModalOpen(false);
  };

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <h2>My Shopping Lists</h2>
        <Button style={{background: '#37B34A'}} type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
          Create New List
        </Button>
      </div>

      <Row gutter={[16, 16]}>
        {shoppingLists.length > 0 ? (
          shoppingLists.map((list) => (
            <Col xs={24} sm={12} md={8} lg={6} key={list.id}>
              <ShoppingListCard list={list} />
            </Col>
          ))
        ) : (
          <Empty description="No Shopping Lists Yet" style={{ width: "100%" }} />
        )}
      </Row>

      <CreateListModal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onCreate={handleCreate}
      />
    </div>
  );
}
