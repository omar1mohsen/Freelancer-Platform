import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export const getSearchParamsObject = (searchParamsUrl: any) => {
  const paramsObj: Record<string, string> = {};
  searchParamsUrl.forEach((value: any, key: any) => {
    paramsObj[key] = value;
  });
  return paramsObj;
};