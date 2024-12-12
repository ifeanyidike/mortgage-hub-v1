"use client";
import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnsType, TableColumnType } from "antd";
import { Button, Input, Space, Table, Tag } from "antd";
import type {
  FilterDropdownProps,
  TableRowSelection,
} from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { motion } from "framer-motion";
import { useMediaQuery } from "@/hooks/";

interface LeadDataType {
  key: string;
  leadName: string;
  contactStatus: string;
  location: string;
  lastContacted: string;
}

type DataIndex = keyof LeadDataType;

const leadData: LeadDataType[] = [...Array(50)].map((_, i) => ({
  leadName: `Alice Johnson ${i}`,
  contactStatus: i % 2 ? "Active" : "In active",
  location: "Toronto Canada",
  lastContacted: "2024-10-05",
  key: `${i + 1}`,
}));

const LeadPurchase: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<LeadDataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    type: "radio",
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<LeadDataType> => ({
    // Search filtering props...
  });

  const columns: TableColumnsType<LeadDataType> = [
    {
      title: "Lead Name",
      dataIndex: "leadName",
      key: "leadName",
      sorter: (a, b) => a.leadName.length - b.leadName.length,
      ...getColumnSearchProps("leadName"),
    },
    {
      title: "Status",
      dataIndex: "contactStatus",
      key: "contactStatus",
      render: (status) => (
        <Tag
          color={
            status === "Active"
              ? "green"
              : status === "Inactive"
              ? "red"
              : "blue"
          }
        >
          {status}
        </Tag>
      ),
      filters: [
        { text: "Active", value: "Active" },
        { text: "Follow-Up Needed", value: "Follow-Up Needed" },
        { text: "Inactive", value: "Inactive" },
        { text: "New", value: "New" },
      ],
      onFilter: (value, record) => record.contactStatus === value,
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      sorter: (a, b) => a.location.length - b.location.length,
      responsive: ["md"], // Only show on medium and larger screens
      ...getColumnSearchProps("location"),
    },
    {
      title: "Last Contacted",
      dataIndex: "lastContacted",
      key: "lastContacted",
      sorter: (a, b) =>
        new Date(a.lastContacted).getTime() -
        new Date(b.lastContacted).getTime(),
      sortDirections: ["descend", "ascend"],
      responsive: ["md"], // Only show on medium and larger screens
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className={`border border-gray-400 rounded-lg shadow-lg mb-6 ${
        isMobile ? "p-2" : "p-4"
      }`}
    >
      <Table<LeadDataType>
        columns={columns}
        dataSource={leadData}
        pagination={{ pageSize: isMobile ? 8 : 14 }}
        rowSelection={rowSelection}
        scroll={isMobile ? { x: true } : undefined} // Enable horizontal scroll on mobile
        style={{
          fontSize: isMobile ? "0.875rem" : "1rem",
          textAlign: "center",
        }}
      />
    </motion.div>
  );
};

export default LeadPurchase;
