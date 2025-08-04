"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ClientStore from "../layout/ClientStore";
import React, { useEffect, useState } from "react";

interface AuthWrapperProps {
  children: React.ReactNode;
  isAuthed?: boolean;
  allowedRoles?: any[];
  isGuest?: boolean;
}

const AuthWrapper = ({
  children,
  isAuthed = false,
  allowedRoles = [],
  isGuest = false,
}: AuthWrapperProps) => {
  const { user_type, token, is_verify } = useSelector((state: RootState) => state.ProfileConfig);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const isAuthenticated = !!token && !!is_verify;

    let allow = false;

    if (isAuthed && isAuthenticated) {
      allow = true;
    }

    if (allowedRoles.length > 0 && allowedRoles.includes(user_type)) {
      allow = true;
    }

    if (isGuest && !isAuthenticated) {
      allow = true;
    }

    setShouldRender(allow);
  }, [token, is_verify, user_type, isAuthed, allowedRoles, isGuest]);

  if (!shouldRender) return null;

  return <>{children}</>;
};

export default AuthWrapper;
