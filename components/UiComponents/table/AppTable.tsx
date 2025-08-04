"use client";
import React, { JSX, useEffect, useState } from "react";
import { Input, Table, Tabs } from "antd";
import type { TableProps } from "antd";
import { IoSearch } from "react-icons/io5";
import { FilterIcon } from "@/assets/svgs/TraderIcons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import TableFilter from "@/components/sharedComponents/TraderComponents/TableFilter";

import "@/styles/components/app-table.scss";
import { useTranslations } from "next-intl";

interface AppTableProps<T> extends TableProps<T> {
  style?: React.CSSProperties;
  columns: any;
  dataSource: T[];
  header?: React.ReactNode;
  pagination?: TableProps<T>["pagination"];
  expandable?: TableProps<T>["expandable"];
  rowKey?: string | ((record: T) => string);
  loading?: boolean;
  className?: string;
  tableTitle?: string;
  rowClassName?: (record: T, index: number) => string;
  showSelection?: boolean;
  hasFilter?: boolean;
  hasSearch?: boolean;
  tabs?: any;
  filterProps?: {
      statusData?: { id: string; name: string }[];
      statusTitle?: string;
      dateTitle?: string;
      FilterByPrice?: boolean;
      statusKey?: string;
  };
}

const AppTable = <T extends Record<string, any>>({
  dataSource,
  columns,
  header,
  pagination,
  expandable,
  rowKey = "id",
  loading,
  className,
  rowClassName,
  showSelection = true,
  hasFilter,
  hasSearch,
  tableTitle,
  tabs,
  filterProps,
  ...restProps
}: AppTableProps<T>): JSX.Element => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const initialSearchTerm = searchParams.get("key") || "";
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const initialTab = searchParams.get("status") || tabs?.[0]?.key || "";
  const [activeTab, setActiveTab] = useState(initialTab);
  const t = useTranslations();

  useEffect(() => {
    const typeFromParams = searchParams.get("status") || tabs?.[0]?.key || "";
    setActiveTab(typeFromParams);
  }, [searchParams, tabs]);

  const rowSelection: TableProps<T>["rowSelection"] = showSelection
    ? {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log("Selected Rows:", selectedRows);
        },
      }
    : undefined;

  const handleBlur = () => {
    const params = new URLSearchParams(window.location.search);
    if (searchTerm) {
      params.set("keyword", searchTerm);
    } else {
      params.delete("keyword");
    }
    const newUrl = `${pathname}?${params.toString()}`;
    router.push(newUrl);
  };

  return (
    <div className="app-table-container">
      <div className="table-header">
        {tabs && (
          <Tabs
            activeKey={activeTab}
            onChange={(key) => {
              const params = new URLSearchParams(window.location.search);
              if (key == "all") {
                params.delete("status");
                router.push(`${pathname}`);
              } else {
                params.set("status", key);
                router.push(`${pathname}?${params.toString()}`);
              }
              setActiveTab(key);
            }}
            items={tabs.map(({ key, label }: any) => ({ key, label }))}
            className="custom-tabs-wrapper app-table-tabs"
          />
        )}

        {tableTitle && <h3>{tableTitle}</h3>}

        {hasSearch && (
          <Input
            className="lg:max-w-[300px] h-12 rounded-xl"
            placeholder={t("form.search")}
            onChange={(e) => setSearchTerm(e.target.value)}
            prefix={
              <IoSearch className="text-[#B0B0B0] size-4 rtl:rotate-90" />
            }
            allowClear
            onBlur={handleBlur}
          />
        )}

        {hasFilter && (
          <button
            onClick={() => setOpenDrawer(true)}
            className=" flex items-center gap-2 rounded-[12px] h-12 py-5 px-6 border border-[#EEEEEE]"
          >
            <FilterIcon />
            {t("Text.filter")}
          </button>
        )}
      </div>

      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
        pagination={pagination}
        expandable={expandable}
        rowKey={rowKey}
        loading={loading}
        className={className}
        rowClassName={rowClassName}
        {...restProps}
      />

      {hasFilter && (
        <TableFilter openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} {...filterProps} />
      )}
    </div>
  );
};

export default AppTable;
