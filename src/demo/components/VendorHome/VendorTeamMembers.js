import React from "react";
import { Space, Table, Tag } from "antd";
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
    title: "Email ID",
    dataIndex: "emailID",
    key: "emailID",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
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
        <a>Edit</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
const data = [
  {
    name: "Abc",
    key: "1",
    contactNumber: 4567474,
    emailID: "abc@gmail.com",
    address: "fhjfj",
    licenceNumber: "4729ywiuhw",
  },
  {
    name: "Mno",
    key: "2",
    contactNumber: 4567474,
    emailID: "abc@gmail.com",
    address: "fhjfj",
    licenceNumber: "4729ywiuhw",
  },
  {
    name: "Pqr",
    key: "3",
    contactNumber: 4567474,
    emailID: "abc@gmail.com",
    address: "fhjfj",
    licenceNumber: "4729ywiuhw",
  },
];

const VendorTeamMembers = () => {
  return <Table columns={columns} dataSource={data} />;
};

export default VendorTeamMembers;
