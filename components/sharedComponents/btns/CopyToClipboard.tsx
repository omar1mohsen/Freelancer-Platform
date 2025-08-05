"use client";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoCopy } from "react-icons/io5";

interface Props {
  text: string;
  isPoints?: boolean;
}

const CopyToClipboard = ({ text, isPoints = false }: Props) => {
  const [copied, setCopied] = useState(false);
  const t = useTranslations();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success(t("Text.copied"));
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  const buttonText = copied ? "Text.copied": "Text.copyTheCode";
  const buttonStyle =  copied ?  "bg-primary text-white" : "text-success px-4 py-2 rounded";

  if(isPoints){
    return (
      <button
        onClick={handleCopy}
        className={`copy-button px-5 py-2 rounded-2xl inline-flex items-center gap-1.5  font-semibold text-primary`}
      >
        {<IoCopy />}
        {t(buttonText)}
      </button>
    )
  }

  return (
    <button
      onClick={handleCopy}
      className={`copy-button px-5 py-2 rounded-2xl inline-flex items-center gap-1.5 ${buttonStyle}`}
    >
      {isPoints&& copied&& <IoCopy />}
      {t(buttonText)}
    </button>
  );
};

export default CopyToClipboard;
