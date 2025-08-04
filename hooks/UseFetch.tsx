import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import axiosInstance from '@/services/instance';
import toast from 'react-hot-toast';
import { useLocale, useTranslations } from 'next-intl';

interface useFetchProps extends UseQueryOptions {
  queryKey: any;
  endpoint: string | null;
  enabled?: boolean;
  select?: ((data: any) => any) | undefined;
  onError?: (err: any) => void;
  onSuccess?: (data: any) => void;
  general?: boolean;
  params?: any;
  props?: any;
};

function useFetch<T>({
  queryKey,
  endpoint,
  enabled = true,
  select,
  onError: originalOnError,
  onSuccess,
  general = false,
  params,
  props,
}: useFetchProps) {
  const  t  = useTranslations();
  const locale = useLocale();
  const baseURL = general ? process.env.NEXT_PUBLIC_GENERAL_URL : process.env.NEXT_PUBLIC_BASE_URL;

  const query = useQuery<T>({
    ...props,
    queryKey: [...queryKey, locale],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get(`${baseURL}/${endpoint}`, { params: { ...params } });
        if (res.data?.error) {
          throw new Error(res.data.message || t('no_data'));
        }
        if (onSuccess) {
          onSuccess(res.data);
        }
        return res.data;
      } catch (err: any) {
        if (originalOnError) {
          originalOnError(err);
        }
        toast.error(err?.response?.data?.message || err.message);
        throw err;
      }
    },
    enabled,
    select: (data) => {
      // Select function to prevent re-render if the data is the same
      if (select) {
        return select(data);
      }
      return data;
    },
  });

  return query;
}

export default useFetch;
