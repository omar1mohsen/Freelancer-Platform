import axiosInstance from "@/services/axiosClient";
import { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";

const ResendCode = () => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [isCounting, setIsCounting] = useState(true);

  const t = useTranslations();
  useEffect(() => {
    if (!isCounting) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          setIsCounting(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isCounting]);

  const resendCode = async () => {
    try {
      let userPhone: any = Cookies.get("userPhone");
      userPhone = typeof userPhone === "string" ? JSON.parse(userPhone) : userPhone;
        if(userPhone){
            const values = {
                phone_code: userPhone?.phone_code,
                phone: userPhone?.phone
            };
            const response = await axiosInstance.post("/send", values);
            if (response.status === 200) {
                toast.success("Resend code successfully");
                setIsCounting(true);
                setTimeLeft(60);
            }
        }else{
          toast.error("Failed to resend code");
        }
    } catch (error: any) {
      console.log("🚀 ~ resendCode ~ error:", error)
      toast.error(error.response?.data?.message );
    }
  };

  return (
    <div className="flex items-center justify-between gap-2 text-start text-sm font-semibold  mt-4 mb-5">
      <button
        type="button"
        onClick={resendCode}
        disabled={isCounting}
        className={`${isCounting ? "text-gray-600 cursor-not-allowed" : "text-primary"}`}
      >
        {t("LABELS.resend_code")}
      </button>
      
      {isCounting && <span className="text-primary">00:{timeLeft}</span>}
    </div>
  );
};

export default ResendCode;
