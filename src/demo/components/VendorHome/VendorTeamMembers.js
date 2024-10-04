import React, { useState } from "react";
import { Space, Table, Button, Modal, Form, Input } from "antd";
//import "./VendorTeamMembers.css";

// dummy data
const initialData = [
  {
    key: "1",
    name: "Abc",
    contactNumber: 4567474,
    emailID: "abc@gmail.com",
    address: "123 Main St",
    licenceNumber: "4729ywiuhw",
    areaOfService: "Trekking",
    extraDetails:
      "This person handles trekking activities in and around Pahalgam area.",
  },
  {
    key: "2",
    name: "Mno",
    contactNumber: 4567474,
    emailID: "mno@gmail.com",
    address: "456 Maple Ave",
    licenceNumber: "4729ywiuhw",
    areaOfService: "Cab Rental",
    extraDetails: "This person manages 3 cabs in Srinagar area.",
  },
  {
    key: "3",
    name: "Pqr",
    contactNumber: 4567474,
    emailID: "pqr@gmail.com",
    address: "789 Oak Dr",
    licenceNumber: "4729ywiuhw",
    areaOfService: "Street Food",
    extraDetails:
      "This person owns and manages a food truck near Nishat Garden.",
  },
];

const VendorTeamMembers = () => {
  const [dataSource, setDataSource] = useState(initialData); // Table data
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false); // State for Add Modal
  const [currentRecord, setCurrentRecord] = useState(null);
  const [form] = Form.useForm(); // Create form instance

  // Functions to handle modals
  const handleEdit = (record) => {
    setCurrentRecord(record);
    form.setFieldsValue(record);
    setIsEditModalVisible(true);
  };

  const handleDelete = (record) => {
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };

  const handleCancel = () => {
    setIsEditModalVisible(false);
    setIsDeleteModalVisible(false);
    setIsAddModalVisible(false); // Hide Add Modal on cancel
    setCurrentRecord(null);
    form.resetFields(); // Reset form when modal is closed
  };

  const confirmDelete = () => {
    // Filter out the current record from the data source
    const newData = dataSource.filter((item) => item.key !== currentRecord.key);
    setDataSource(newData);
    setIsDeleteModalVisible(false);
    setCurrentRecord(null); // Clear the selected record
  };

  const handleSaveEdit = () => {
    form
      .validateFields()
      .then((values) => {
        const updatedDataSource = dataSource.map((item) =>
          item.key === currentRecord.key ? { ...item, ...values } : item
        );
        setDataSource(updatedDataSource); // Update the table with new values
        setIsEditModalVisible(false); // Close the modal
        setCurrentRecord(null); // Clear the current record
        form.resetFields(); // Reset form
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  // Handle adding a new team member
  const handleAddNewMember = () => {
    form
      .validateFields()
      .then((values) => {
        const newKey = dataSource.length + 1; // Generate new key
        const newRecord = { key: newKey.toString(), ...values }; // Create new record
        setDataSource([...dataSource, newRecord]); // Add new record to data source
        setIsAddModalVisible(false); // Close modal
        form.resetFields(); // Reset form
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  // Define columns for the table
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Contact Number",
      dataIndex: "contactNumber",
      key: "contactNumber",
    },
    {
      title: "Area of Service",
      dataIndex: "areaOfService",
      key: "areaOfService",
    },
    {
      title: "Licence Number",
      dataIndex: "licenceNumber",
      key: "licenceNumber",
    },
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
  ];

  // Expandable row content
  const expandable = {
    expandedRowRender: (record) => (
      <div>
        <p>
          <strong>Email ID:</strong> {record.emailID}
        </p>
        <p>
          <strong>Address:</strong> {record.address}
        </p>
        <p>
          <strong>Extra Details:</strong> {record.extraDetails}
        </p>
      </div>
    ),
    rowExpandable: (record) => record.name !== "Not Expandable",
  };

  return (
    <div className="table-container">
      {" "}
      {/* Apply styling to the container */}
      {/* Table with expandable rows */}
      <Table
        columns={columns}
        dataSource={dataSource}
        expandable={expandable}
      />
      {/* Add Team Member Button */}
      <Button
        type="primary"
        style={{ marginTop: 16 }} // Add some space above the button
        onClick={() => setIsAddModalVisible(true)} // Show Add Modal when clicked
      >
        Add Team Member
      </Button>
      {/* Edit Modal */}
      <Modal
        title="Edit Vendor"
        visible={isEditModalVisible}
        onCancel={handleCancel}
        onOk={handleSaveEdit} // Save changes on OK
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[
              { required: true, message: "Please input the vendor's name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="contactNumber"
            label="Contact Number"
            rules={[
              { required: true, message: "Please input the contact number!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="emailID"
            label="Email ID"
            rules={[{ required: true, message: "Please input the email ID!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: "Please input the address!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="licenceNumber"
            label="Licence Number"
            rules={[
              { required: true, message: "Please input the licence number!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="areaOfService"
            label="Area of Service"
            rules={[
              { required: true, message: "Please input the area of service!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="extraDetails" label="Extra Details">
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
      {/* Add Modal */}
      <Modal
        title="Add Team Member"
        visible={isAddModalVisible}
        onCancel={handleCancel}
        onOk={handleAddNewMember} // Save new member on OK
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="contactNumber"
            label="Contact Number"
            rules={[
              { required: true, message: "Please input the contact number!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="emailID"
            label="Email ID"
            rules={[{ required: true, message: "Please input the email ID!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: "Please input the address!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="licenceNumber"
            label="Licence Number"
            rules={[
              { required: true, message: "Please input the licence number!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="areaOfService"
            label="Area of Service"
            rules={[
              { required: true, message: "Please input the area of service!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="extraDetails" label="Extra Details">
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
      {/* Delete Modal */}
      <Modal
        title="Delete Vendor"
        visible={isDeleteModalVisible}
        onCancel={handleCancel}
        onOk={confirmDelete} // Confirm deletion
        okButtonProps={{ danger: true }}
      >
        <p>Are you sure you want to delete: {currentRecord?.name}?</p>
      </Modal>
    </div>
  );
};

export default VendorTeamMembers;
