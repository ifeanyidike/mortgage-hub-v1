"use client";
/* eslint-disable prettier/prettier */
import { useMemo, useState, useEffect, useRef } from "react";
import { ColumnDef } from "@tanstack/react-table";

import { DataGrid, KeenIcon } from "@/app/dashboard-components";
import { observer } from "mobx-react-lite";
import { LeadDataMore, leadStore } from "@/app/store/leadStore";
import { motion } from "framer-motion";
import { InputRef, Table, TableColumnsType, TableColumnType, Tag } from "antd";
import {
  FilterDropdownProps,
  TableRowSelection,
} from "antd/es/table/interface";

type DataIndex = keyof LeadDataMore;
const LeadsTable2 = observer(() => {
  const [perPage, setPerPage] = useState(10);
  const [leads, setLeads] = useState(leadStore.leads || []);

  useEffect(() => {
    console.log("leadsStore leads", leadStore.leads);
    setLeads(leadStore.leads || []);
  }, [leadStore.leads]);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<LeadDataMore> = {
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
  ): TableColumnType<LeadDataMore> => ({
    // Search filtering props...
  });

  const columns: TableColumnsType<LeadDataMore> = [
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
      sorter: (a, b) => a.user.name.length - b.user.name.length,
      ...getColumnSearchProps("user"),
    },
    {
      title: "Down Payment",
      dataIndex: "down_payment",
      key: "down_payment",
      //   render: (status) => (
      //     <Tag
      //       color={
      //         status === "Active"
      //           ? "green"
      //           : status === "Inactive"
      //           ? "red"
      //           : "blue"
      //       }
      //     >
      //       {status}
      //     </Tag>
      //   ),
      // render: (status) => (
      //     <span></span>
      //   ),
      //   filters: [
      //     { text: "Active", value: "Active" },
      //     { text: "Follow-Up Needed", value: "Follow-Up Needed" },
      //     { text: "Inactive", value: "Inactive" },
      //     { text: "New", value: "New" },
      //   ],
      //   onFilter: (value, record) => record.contactStatus === value,
    },
    {
      title: "Down payment source",
      dataIndex: "down_payment_source",
      key: "down_payment_source",
      sorter: (a, b) =>
        a.down_payment_source.length - b.down_payment_source.length,
      responsive: ["md"], // Only show on medium and larger screens
      ...getColumnSearchProps("down_payment_source"),
    },
    {
      title: "Property Type",
      dataIndex: "property_type",
      key: "property_type",
      sorter: (a, b) => a.property_type.length - b.property_type.length,
      sortDirections: ["descend", "ascend"],
      responsive: ["md"], // Only show on medium and larger screens
    },

    // {
    //   title: "Property Type",
    //   dataIndex: "property_type",
    //   key: "property_type",
    //   sorter: (a, b) =>
    //     new Date(a.lastContacted).getTime() -
    //     new Date(b.lastContacted).getTime(),
    //   sortDirections: ["descend", "ascend"],
    //   responsive: ["md"], // Only show on medium and larger screens
    // },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className={`border border-gray-400 rounded-lg shadow-lg mb-6 overflow-x-auto`}
    >
      <Table<LeadDataMore>
        columns={columns}
        dataSource={leads}
        pagination={{ pageSize: 5 }}
        rowSelection={rowSelection}
        scroll={{ x: true }} // Enable horizontal scroll on mobile
        style={{
          //   fontSize: isMobile ? "0.875rem" : "1rem",
          textAlign: "center",
        }}
      />
    </motion.div>
  );
});

export default LeadsTable2;
