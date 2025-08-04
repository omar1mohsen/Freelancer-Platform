import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { CountryPhoneCodes } from "../public/countries/country-phone-code";
import Swal from "sweetalert2";
import { FormInstance } from "antd";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// phonecode => 'EG'   phone=> 1032323232
export const formatPhoneNumber = (phonecode: string, phone: string): string => {
  // const [code, number] = phone.split('+')
  // const dialCode = (CountryPhoneCodes.find((country: { [key: string]: string }) => code.toLowerCase() == country.code.toLowerCase()).dial_code || '')

  const dial_code =
    CountryPhoneCodes.find(
      (country) => `+${phonecode}` == country.dial_code.toLowerCase()
    )?.dial_code || "";
  return `${dial_code}${phone}`;
};

export const handleDownload = () => {
  const link = document.createElement("a");
  link.href = "/path-to-your-file.pdf";
  link.download = "التقويم المالي.pdf";
  link.click();
};

export const showDynamicSwal = async (customOptions = {}) => {
  const defaultOptions = {
    title: "",
    showConfirmButton: true,
    showCancelButton: true,
    buttonsStyling: false,

    customClass: {
      icon: "border-none",
      title: "swal-title",
      htmlContainer: "swal-desc",
      confirmButton: "app-btn mx-2",
      cancelButton: "app-btn outline-btn",
    },
    confirmButtonText: "رجوع",
    cancelButtonText: "الغاء",
  };

  const finalOptions = { ...defaultOptions, ...customOptions };

  return await Swal.fire(finalOptions);
};

export const getSearchParamsObject = (searchParamsUrl: any) => {
  const paramsObj: Record<string, string> = {};
  searchParamsUrl.forEach((value: any, key: any) => {
    paramsObj[key] = value;
  });
  return paramsObj;
};

// Function to generate a random SKU
export const generateSKU = (form: any) => {
  const randomSKU = `SKU-${Math.floor(100000 + Math.random() * 900000)}`;
  form.setFieldsValue({ sku: randomSKU });
};

// Function to generate a barcode using name, category, and a unique ID
export const generateBarcode = (form: any) => {
  const name = form.getFieldValue("name") || "PRD";
  const category = form.getFieldValue("main-category") || "CAT";
  const uniqueId = Math.floor(1000 + Math.random() * 9000);
  const barcode = `${name.slice(0, 3).toUpperCase()}-${category
    .slice(0, 3)
    .toUpperCase()}-${uniqueId}`;
  form.setFieldsValue({ barcode });
};

export const handlePhoneNumberSet = (
  value: string,
  data: any,
  form: FormInstance
) => {
  const phone = +value.slice(data?.dialCode.length).trim().split(" ").join("");

  form.setFieldValue("phone", phone);
  form.setFieldValue("phone_code", data.dialCode);
};

export const calcPercentage = (item: any) => {
  // if (item?.previous === 0 || item?.previous === null) {
  //   return 0;
  // }
  // return (item?.current / item?.previous) * 100 || 0;
  return item?.growth || 0;
};

export const formatNumber = (value: any) => {
  if (Number.isInteger(value)) return value.toString();

  return value.toFixed(1);
};

export const customCategoryFilter = (
  input: string,
  option: { label: string; children: string }
) => {
  const label = option.label || option.children;
  return label.toLowerCase().includes(input.toLowerCase());
};

export const approximateNumber = (value: string) => {
  return Number(value).toFixed(1);
};
