import React from "react";
import { Card, Row, Col, Button } from "antd";

const vendors = [
  { id: 1, name: "Vendor A", price: "$10" },
  { id: 2, name: "Vendor B", price: "$9.5" },
  { id: 3, name: "Vendor C", price: "$11" },
];

export default function ProductSelection() {
  return (
    <div style={{ padding: 24 }}>
      <h2>Choose Products from Vendors</h2>
      <Row gutter={[16, 16]}>
        {vendors.map((vendor) => (
          <Col xs={24} sm={12} md={8} key={vendor.id}>
            <Card title={vendor.name}>
              <p>Price: {vendor.price}</p>
              <Button type="primary">Add to Cart</Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
