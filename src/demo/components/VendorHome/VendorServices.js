import React, { useState, useEffect } from "react";
import { Menu, Table, Button, Space, Modal, Form, Input } from "antd";

const categories = [
  "accommodation",
  "adventure",
  "recreation",
  "transport",
  "foodAndBeverages",
];

const VendorServices = () => {
  const [currentCategory, setCurrentCategory] = useState("accommodation"); // default selection
  const [dataSource, setDataSource] = useState([]);
  const [columns, setColumns] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [form] = Form.useForm();

  //dummy data - will get this from api res
  const data = {
    accommodation: [
      { key: "1", name: "Hotel A", address: "123 Main St", stars: "5" },
      { key: "2", name: "Villa B", address: "456 Oak Ave", stars: "4" },
    ],
    adventure: [
      { key: "1", name: "Trekking", description: "Mountain Trekking" },
      { key: "2", name: "Paragliding", description: "Sky high adventure" },
    ],
    recreation: [
      { key: "1", name: "Swimming Pool", location: "City Center" },
      { key: "2", name: "Bowling Alley", location: "Downtown" },
    ],
    transport: [
      { key: "1", type: "Cab Service", fleet: "10 cars" },
      { key: "2", type: "Bike Rentals", fleet: "15 bikes" },
    ],
    foodAndBeverages: [
      { key: "1", name: "Street Food", location: "Market Square" },
      { key: "2", name: "Fine Dining", location: "Luxury Hotel" },
    ],
  };

  //columns
  const columnDefinitions = {
    accommodation: [
      { title: "Name", dataIndex: "name", key: "name" },
      { title: "Address", dataIndex: "address", key: "address" },
      { title: "Stars", dataIndex: "stars", key: "stars" },
      {
        title: "Action",
        key: "action",
        render: (_, record) => (
          <Space size="middle">
            <Button onClick={() => handleEdit(record)}>Edit</Button>
            <Button danger onClick={() => handleDelete(record)}>
              Delete
            </Button>
          </Space>
        ),
      },
    ],
    adventure: [
      { title: "Name", dataIndex: "name", key: "name" },
      { title: "Description", dataIndex: "description", key: "description" },
      {
        title: "Action",
        key: "action",
        render: (_, record) => (
          <Space size="middle">
            <Button onClick={() => handleEdit(record)}>Edit</Button>
            <Button danger onClick={() => handleDelete(record)}>
              Delete
            </Button>
          </Space>
        ),
      },
    ],
    recreation: [
      { title: "Name", dataIndex: "name", key: "name" },
      { title: "Location", dataIndex: "location", key: "location" },
      {
        title: "Action",
        key: "action",
        render: (_, record) => (
          <Space size="middle">
            <Button onClick={() => handleEdit(record)}>Edit</Button>
            <Button danger onClick={() => handleDelete(record)}>
              Delete
            </Button>
          </Space>
        ),
      },
    ],
    transport: [
      { title: "Type", dataIndex: "type", key: "type" },
      { title: "Fleet", dataIndex: "fleet", key: "fleet" },
      {
        title: "Action",
        key: "action",
        render: (_, record) => (
          <Space size="middle">
            <Button onClick={() => handleEdit(record)}>Edit</Button>
            <Button danger onClick={() => handleDelete(record)}>
              Delete
            </Button>
          </Space>
        ),
      },
    ],
    foodAndBeverages: [
      { title: "Name", dataIndex: "name", key: "name" },
      { title: "Location", dataIndex: "location", key: "location" },
      {
        title: "Action",
        key: "action",
        render: (_, record) => (
          <Space size="middle">
            <Button onClick={() => handleEdit(record)}>Edit</Button>
            <Button danger onClick={() => handleDelete(record)}>
              Delete
            </Button>
          </Space>
        ),
      },
    ],
  };

  useEffect(() => {
    setDataSource(data[currentCategory]);
    setColumns(columnDefinitions[currentCategory]);
  }, [currentCategory]);

  useEffect(() => {
    setDataSource(data["accommodation"]);
    setColumns(columnDefinitions["accommodation"]);
  }, []);

  const handleMenuClick = (e) => {
    setCurrentCategory(e.key);
  };

  const handleEdit = (record) => {
    setCurrentRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: "Are you sure you want to delete this record?",
      onOk: () => {
        const newData = dataSource.filter((item) => item.key !== record.key);
        setDataSource(newData);
      },
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentRecord(null);
    form.resetFields();
  };

  const handleAddOrUpdate = () => {
    const values = form.getFieldsValue();
    if (currentRecord) {
      // Edit existing record
      setDataSource((prevData) =>
        prevData.map((item) =>
          item.key === currentRecord.key ? { ...item, ...values } : item
        )
      );
    } else {
      // Add new record
      const newKey = (dataSource.length + 1).toString();
      const newRecord = { key: newKey, ...values };
      setDataSource([...dataSource, newRecord]);
    }
    handleCancel();
  };

  return (
    <div>
      <h1>Services</h1>
      <Menu
        onClick={handleMenuClick}
        selectedKeys={[currentCategory]}
        mode="horizontal"
      >
        <Menu.Item key="accommodation">Accommodation</Menu.Item>
        <Menu.Item key="adventure">Adventure</Menu.Item>
        <Menu.Item key="recreation">Recreation</Menu.Item>
        <Menu.Item key="transport">Transport</Menu.Item>
        <Menu.Item key="foodAndBeverages">Food & Beverages</Menu.Item>
      </Menu>

      <Button
        type="primary"
        style={{ marginTop: 16, float: "right" }}
        onClick={() => {
          setCurrentRecord(null);
          form.resetFields();
          setIsModalVisible(true);
        }}
      >
        Add New Service
      </Button>

      <Table
        style={{ marginTop: 16, clear: "both" }}
        columns={columns}
        dataSource={dataSource}
      />

      <Modal
        title={currentRecord ? "Edit Service" : "Add New Service"}
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleAddOrUpdate}
      >
        <Form form={form} layout="vertical">
          {columns
            .filter((col) => col.dataIndex)
            .map((col) => (
              <Form.Item
                key={col.dataIndex}
                name={col.dataIndex}
                label={col.title}
                rules={[
                  { required: true, message: `Please input ${col.title}` },
                ]}
              >
                <Input />
              </Form.Item>
            ))}
        </Form>
      </Modal>
    </div>
  );
};

export default VendorServices;
