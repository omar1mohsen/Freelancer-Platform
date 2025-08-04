"use client";
import React, { PropsWithChildren } from "react";

import Link from "next/link";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";

type props = {
  href: string;
  className?: string;
  onClick?: ()=>void;
};

export default function LocalePath({
  href,
  className = "",
  children,
  onClick
}: PropsWithChildren<props>) {
  const pathname = usePathname();
  const locale = useLocale();
  const normalizedPathname = pathname.replace(/^\/en/, ''); 
  const isActive = `/${normalizedPathname}` == `${href}` || normalizedPathname == href;
  return (
    <Link
      prefetch={true}
      className={`text-inherit ${className?className :""}  ${isActive ? "active-link":""}`}
      onClick={onClick}
      href={`${locale !== "ar" ? `/${locale}${href}` : `${href}`}`}
    >
      {children}
    </Link>
  );
}
