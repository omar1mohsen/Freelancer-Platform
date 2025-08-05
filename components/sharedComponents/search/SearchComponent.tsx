"use client";
import React, { useEffect, useRef, useState } from "react";
import { Dropdown, Input, MenuProps, Spin } from "antd";
import { IoSearch } from "react-icons/io5";
import Image from "next/image";
import EmptySearch from "../empty/EmptySearch";
import { Freelancer } from "@/types";
import { useFreelancerStore } from "@/store/store";
import { ArrowLeft } from "iconsax-reactjs";
import EmptyContent from "../empty/EmptyContent";

const FreelancerSearchDropdown = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { filteredFreelancers, setSearchTerm: storeSetSearchTerm, searchFreelancers } = useFreelancerStore();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        containerRef.current &&
        !containerRef.current.contains(target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounce search input
  useEffect(() => {
    const timeout = setTimeout(() => {
      const trimmed = searchTerm.trim();
      setDebouncedTerm(trimmed);
      storeSetSearchTerm(trimmed);
      searchFreelancers();
    }, 400);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  // Handle clear
  const handleClear = () => {
    setSearchTerm("");
    setDebouncedTerm("");
    storeSetSearchTerm("");
    setOpen(false);
  };

  const items: MenuProps["items"] =
    debouncedTerm === "" ? [
      {
        key: "empty",
        label: <span className="text-gray-500">Type to search freelancers</span>,
        disabled: true,
      },
    ] : filteredFreelancers.length > 0 ? [
      {
        key: "results",
        className: "freelancer_list",
        label: (
          <div className="space-y-4 max-h-[300px] overflow-y-auto">
            {filteredFreelancers.map((freelancer:Freelancer) => (
              <div key={freelancer.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                <Image
                  src={freelancer.profileImage}
                  alt={freelancer.name}
                  width={50}
                  height={50}
                  className="rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-sm line-clamp-1">{freelancer.name}</h4>
                  <p className="text-xs text-gray-500">{freelancer.role}</p>
                </div>
              </div>
            ))}
          </div>
        ),
      },
    ] : [
      {
        key: "no_results",
        label: (
          <div className="flex items-center justify-center py-4">
            <EmptySearch text={debouncedTerm} />
          </div>
        ),
      },
    ];

  return (
    <div ref={containerRef} className="w-full max-w-md">
      <Dropdown
        trigger={["click"]}
        open={open}
        menu={{ items }}
        rootClassName="freelancer-search-dropdown"
        popupRender={(menu) => <div ref={dropdownRef}>{menu}</div>}
      >
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClick={() => setOpen(true)}
          allowClear
          onClear={handleClear}
          suffix={<ArrowLeft className="p-1.5 text-sm bg-primary text-white rounded-md ltr:rotate-180"/>}
          prefix={
            <IoSearch
              onClick={() => {
                storeSetSearchTerm(searchTerm.trim());
                searchFreelancers();
              }}
              className="cursor-pointer text-gray-400"
            />
          }
          onKeyDown={(e) => e.key === "Enter" && searchFreelancers()}
          placeholder="Search freelancers by name, role ..."
          className="min-h-[42px] font-bold border-gray-100 hover:border-gray-100"
        />
      </Dropdown>
    </div>
  );
};

export default FreelancerSearchDropdown;
