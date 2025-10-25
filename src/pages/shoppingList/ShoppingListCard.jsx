import React from "react";
import { Card, Tag } from "antd";
import { useNavigate } from "react-router-dom";

export default function ShoppingListCard({ list }) {
  const navigate = useNavigate();

  return (
    <Card
      title={list.name}
      extra={<Tag color={list.status === "Saved" ? "green" : "orange"}>{list.status}</Tag>}
      hoverable
      onClick={() => navigate(`/shopping-list/${list.id}`)}
    >
      <p>{list.items.length} items</p>
      <p>{list.items.slice(0, 3).join(", ")}{list.items.length > 3 && "..."}</p>
    </Card>
  );
}
