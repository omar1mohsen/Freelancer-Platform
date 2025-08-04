"use client";
import React, { useEffect, useState } from "react";
import LocalePath from "../UiComponents/LocalePath";
import { SubscriptionIcon } from "@/assets/svgs/TraderIcons";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useTranslations } from "next-intl";

const NotSubscribed = () => {
  const [show, setShow] = useState(false);
  const t = useTranslations();

  const { my_subscriptions } = useSelector((state: RootState) => state.ProfileConfig);

  useEffect(() => {
    if (!my_subscriptions || (my_subscriptions.status && my_subscriptions.status !== "active")) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [my_subscriptions]);

  if (!show) return null;

  let message = t("Messages.subscribed_only");
  let btnHref = "/subscribe";
  let btnText = t("buttons.subscribe_now");

  if (my_subscriptions?.status === "pending") {
    message = t("Messages.subscribed_pending");
    btnHref = "/";
    btnText = t("NAV.home");
  } else if (my_subscriptions?.status === "expired") {
    message = t("Messages.subscription_expired");
    btnHref = "/account/subscriptions";
    btnText = t("buttons.manage_subscription");
  } else if (my_subscriptions?.status === "frozen") {
    message = t("Messages.subscription_frozen");
    btnHref = "/";
    btnText = t("NAV.home");
  } else if (my_subscriptions?.status === "cancelled") {
    message = t("Messages.subscription_cancelled");
    btnHref = "/";
    btnText = t("NAV.home");
  }

  return (
    <section className="absolute inset-0 bg-white/70 z-[99] flex items-start justify-center">
      <div className="w-fit mx-auto p-10 lg:min-w-[650px] bg-white rounded-md shadow-md mt-10 lg:mt-20 flex flex-col gap-8 items-center justify-center">
        <SubscriptionIcon className="*:fill-primary" />
        <p className="text-lg text-text-gray font-semibold max-w-[85%] text-center mx-auto">
          {message}
        </p>
        <LocalePath className="app-btn btn-primary" href={btnHref}>
          {btnText}
        </LocalePath>
      </div>
    </section>
  );
};


export default NotSubscribed;
