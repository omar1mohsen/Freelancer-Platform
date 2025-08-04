"use client";
import React from "react";
import dynamic from "next/dynamic";
import AosWrapper from "./AosWrapper";

const Toaster = dynamic(() => import("react-hot-toast").then(mod => ({ default: mod.Toaster })), {ssr: false});

const Wrapper = () => {
  return (
    <>
      <AosWrapper/>
      <Toaster/>
    </>
  );
};

const ClientWrapper = dynamic(() => Promise.resolve(Wrapper), {
  ssr: false,
});


export default ClientWrapper;
