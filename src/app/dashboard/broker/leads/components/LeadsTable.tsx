"use client";
/* eslint-disable prettier/prettier */
import { useMemo, useState, useEffect, useRef } from "react";
import { ColumnDef, ColumnFiltersState } from "@tanstack/react-table";

import { DataGrid, KeenIcon } from "@/app/dashboard-components";
import { observer } from "mobx-react-lite";
import { LeadDataMore, leadStore } from "@/app/store/leadStore";
import {
  Button,
  Input,
  Select,
  SelectProps,
  Slider,
  SliderSingleProps,
  Spin,
} from "antd";
import { SearchOutlined, SettingOutlined } from "@ant-design/icons";
import { debounce } from "lodash";
import { downPaymentSources, propertyTypes } from "@/app/utils";
import { LeadPurchaseModal } from "./LeadPurchaseModal";

const LeadsTable = observer(() => {
  // const sliderMarks: SliderSingleProps["marks"] = {
  //   0: "$0",
  //   10000000: {
  //     style: {
  //       color: "#f50",
  //     },
  //     label: <strong>$100M</strong>,
  //   },
  // };
  // const [leads, setLeads] = useState(leadStore.leads || []);
  const [leadToPurchase, toggleLeadToPurchase] =
    useState<LeadDataMore | null>();
  const [username, setUsername] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);

  const [downPaymentSource, setDownPaymentSource] = useState();
  const [propertyType, setPropertyType] = useState();
  const [propertyPrice, setPropertyPrice] = useState([
    0,
    leadStore.max_values.property_price || 10000000,
  ]);

  // const [downPayment, setDownPayment] = useState("");
  const [downPayment, setDownPayment] = useState([
    0,
    leadStore.max_values.down_payment || 10000000,
  ]);

  useEffect(() => {
    if (propertyPrice[0] === 0 && propertyPrice[1] === 10000000) {
      setPropertyPrice([0, leadStore.max_values.property_price || 10000000]);
    }
  }, [leadStore.max_values.property_price]);

  useEffect(() => {
    if (downPayment[0] === 0 && downPayment[1] === 10000000) {
      setDownPayment([0, leadStore.max_values.down_payment || 10000000]);
    }
  }, [leadStore.max_values.property_price]);
  //

  const downPaymentSourceList = Object.entries(downPaymentSources).map((o) => ({
    label: o[0],
    value: o[1],
  }));

  const propertyTypeList = Object.entries(propertyTypes).map((o) => ({
    label: o[0],
    value: o[1],
  }));
  const [filters, setFilters] = useState<ColumnFiltersState>([]);
  const onFilterChange = (e: any) => {
    console.log("I am clicked");
    const filters = [];
    if (username.length) {
      filters.push({
        id: "user",
        value: username.map((u) => u.value),
      });
    }

    if (downPayment) {
      filters.push({
        id: "down_payment",
        value: downPayment,
      });
    }
    if (propertyPrice) {
      filters.push({
        id: "property_price",
        value: propertyPrice,
      });
    }
    if (downPaymentSource) {
      filters.push({
        id: "down_payment_source",
        value: downPaymentSource,
      });
    }
    if (propertyType) {
      console.log("property");
      filters.push({
        id: "property_type",
        value: propertyType,
      });
    }
    setFilters(filters);
  };

  // useEffect(() => {
  //   console.log("leadsStore leads", leadStore.leads);
  //   setLeads(leadStore.leads || []);
  // }, [leadStore.leads]);

  const columns = useMemo<ColumnDef<LeadDataMore>[]>(
    () => [
      {
        accessorFn: (row) => row.user,
        id: "user",
        header: () => <span className="text-gray-700 font-normal">User</span>,
        enableSorting: true,
        enableColumnFilter: true,
        enableGlobalFilter: true,

        cell: (info) => (
          <div className="flex items-center gap-2.5">
            <div className="shrink-0">
              <img
                src={
                  info.row.original.user?.picture || `/media/avatars/300-3.png`
                }
                className="size-7 rounded-full"
                alt=""
              />
            </div>
            <a
              className="text-sm font-font-medium text-gray-900 hover:text-primary-active"
              href="#"
            >
              {info.row.original.user?.name}
            </a>
          </div>
        ),
        meta: {
          className: "min-w-[200px]",
          cellClassName: "text-gray-700 font-normal",
        },
      },
      {
        accessorFn: (row) => row,
        id: "down_payment",
        header: () => (
          <span className="text-gray-700 font-normal">Down Payment</span>
        ),
        enableSorting: true,
        cell: (info) => (
          <div className="flex items-center gap-1.5 text-gray-800 font-normal">
            {/* <KeenIcon icon="chrome" /> */}
            <span>{info.row.original.down_payment}</span>
          </div>
        ),
        meta: {
          className: "min-w-[250px]",
          cellClassName: "text-gray-700 font-normal",
        },
      },
      {
        accessorFn: (row) => row.down_payment_source,
        id: "down_payment_source",
        header: () => (
          <span className="text-gray-800 font-normal">Down Payment Source</span>
        ),
        enableSorting: true,
        cell: (info) => {
          return info.row.original.down_payment_source;
        },
        meta: {
          className: "min-w-[190px]",
          cellClassName: "text-gray-700 font-normal",
        },
      },
      {
        accessorFn: (row) => row.property_price,
        id: "property_price",
        header: () => (
          <span className="text-gray-700 font-normal">Property Price</span>
        ),
        enableSorting: true,
        enableColumnFilter: true,
        enableGlobalFilter: true,
        cell: (info) => {
          return info.row.original.property_price;
        },
        meta: {
          className: "min-w-[190px]",
          cellClassName: "text-gray-700 font-normal",
        },
      },
      {
        accessorFn: (row) => row.property_type,
        id: "property_type",
        header: () => "Property Type",
        enableSorting: true,
        enableColumnFilter: true,
        cell: (info: any) => info.row.original.property_type,
        meta: {
          className: "min-w-[190px]",
        },
      },

      {
        id: "click",
        header: () => "",
        enableSorting: false,

        cell: ({ row }) => (
          <button
            className="btn btn-link"
            onClick={() =>
              // alert(
              //   `Clicked on action button for row ${row.original.user?.name}`
              // )
              toggleLeadToPurchase(row.original)
            }
          >
            {/* <KeenIcon icon="dots-vertical" /> */}
            Buy lead
          </button>
        ),
        meta: {
          className: "w-28",
        },
      },
    ],
    []
  );

  const data: LeadDataMore[] = useMemo(
    () => leadStore.leads || [],
    [leadStore.leads]
  );

  return (
    <div className="card card-grid min-w-full">
      <div className="card-header flex flex-col lg:flex-wrap items-center lg:flex-row lg:items-center gap-4 lg:!gap-8 lg:!mb-8 px-4 py-3 bg-white shadow rounded-lg">
        <h3 className="card-title flex-shrink-0 text-base lg:text-lg font-semibold text-gray-800 whitespace-nowrap">
          Showing{" "}
          <span className="text-primary font-bold">
            {(leadStore.leads || []).length}
          </span>{" "}
          of{" "}
          <span className="text-primary font-bold">{leadStore.lead_count}</span>{" "}
          leads
        </h3>

        <div className="flex flex-wrap lg:flex-nowrap gap-4 w-full lg:w-auto ml-auto items-center lg:justify-end">
          <DebounceSelect
            mode="multiple"
            value={username}
            placeholder="Select users"
            fetchOptions={leadStore.fetchUserList}
            className="!w-full lg:!w-1/3 sm:!w-48 !rounded-full !border-gray-300 !shadow-sm focus:!border-primary focus:!shadow-lg transition-all duration-200"
            onChange={(newValue) => {
              setUsername(
                newValue as {
                  label: string;
                  value: string;
                }[]
              );
            }}
          />

          <Select
            value={downPaymentSource}
            onChange={(value) => setDownPaymentSource(value)}
            options={downPaymentSourceList}
            labelInValue
            className="!w-full lg:!w-1/3 sm:!w-40  !rounded-full !border-gray-300 !shadow-sm focus:!border-primary focus:!shadow-lg transition-all duration-200"
            placeholder="Down Payment Source"
          />

          <Select
            value={propertyType}
            onChange={(value) => setPropertyType(value)}
            options={propertyTypeList}
            labelInValue
            className="!w-full lg:!w-1/3 sm:!w-40 !rounded-full !border-gray-300 !shadow-sm focus:!border-primary focus:!shadow-lg transition-all duration-200"
            placeholder="Property Type"
          />
        </div>

        <div className="flex flex-wrap lg:flex-nowrap gap-16 max-lg:gap-4 w-full lg:w-auto ml-auto items-center lg:justify-end">
          {/* <Input
            placeholder="Down Payment"
            value={downPayment}
            onChange={(e) => setDownPayment(e.target.value)}
            type="number"
            className="!w-full lg:!w-52 sm:!w-40 !rounded-full !border-gray-300 !shadow-sm focus:!border-primary focus:!shadow-lg transition-all duration-200"
          /> */}
          <div className="w-full lg:w-52 sm:w-40">
            <label htmlFor="price-range" className="text-gray-600 text-sm">
              Down Payment
            </label>
            <Slider
              range
              min={0}
              max={leadStore.max_values.down_payment || 10000000}
              // marks={sliderMarks}
              included={true}
              value={downPayment}
              onChange={setDownPayment}
              // defaultValue={[26, 37]}
            />
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>{`CAD $${downPayment[0].toLocaleString()}`}</span>
              <span>{`CAD $${downPayment[1].toLocaleString()}`}</span>
            </div>
          </div>

          <div className="w-full lg:w-52 sm:w-40">
            <label htmlFor="price-range" className="text-gray-600 text-sm">
              Property Price
            </label>
            <Slider
              range
              min={0}
              max={leadStore.max_values.property_price || 10000000}
              // marks={sliderMarks}
              included={true}
              value={propertyPrice}
              onChange={setPropertyPrice}
              // defaultValue={[26, 37]}
            />
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>{`CAD $${propertyPrice[0].toLocaleString()}`}</span>
              <span>{`CAD $${propertyPrice[1].toLocaleString()}`}</span>
            </div>
          </div>

          <button
            onClick={onFilterChange}
            className="btn-primary max-w-[120px] lg:!w-auto px-6 py-2 rounded-full text-white bg-primary hover:bg-primary-dark transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
          >
            <KeenIcon icon="setting-4" className="text-lg" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      <div className="card-body">
        <DataGrid
          columns={columns}
          data={data}
          // setData={setLeads}
          rowCount={leadStore.lead_count}
          rowSelect={true}
          pagination={{ size: 5 }}
          sorting={[{ id: "user", desc: false }]}
          serverSide
          setFilters={setFilters}
          filters={filters}
          // filters={[{ id: "user", }]}
          onFetchData={({ pageIndex, pageSize, sorting, filters }) => {
            return leadStore.fetchLeads({
              pageIndex,
              pageSize,
              sorting,
              filters,
            });
          }}
          newSubscriptionData={leadStore.new_data}
        />
      </div>
      <LeadPurchaseModal
        data={leadToPurchase!}
        open={!!leadToPurchase}
        onClose={() => toggleLeadToPurchase(null)}
      />
    </div>
  );
});

export default LeadsTable;

export interface DebounceSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType | ValueType[]>, "options" | "children"> {
  fetchOptions: (search: string) => Promise<ValueType[]>;
  debounceTimeout?: number;
}

function DebounceSelect<
  ValueType extends {
    key?: string;
    label: React.ReactNode;
    value: string | number;
  } = any
>({
  fetchOptions,
  debounceTimeout = 800,
  ...props
}: DebounceSelectProps<ValueType>) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState<ValueType[]>([]);
  const fetchRef = useRef(0);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);

      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }

        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={options}
    />
  );
}
