"use client"
import React, { useState } from 'react'
import AppButton from "@/components/UiComponents/buttons/AppButton";
import { Form, Input } from "antd";
import { useTranslations } from 'next-intl';
// import { postSubscription } from '@/services/ApiHandler';
import toast from 'react-hot-toast';

import axiosInstance from '@/services/axiosClient';

const SubscriptionForm = ({endpoint}:{endpoint?:string}) => {
  const t = useTranslations();
  const [isLoading,setIsLoading] = useState(false)

  const onFinish = async (values:any) => {
    try{
      setIsLoading(true)
      await axiosInstance.post('subscriptions',values).then(res => {
        toast.success(t("isSubscribedCreatedSuccessfully"))
      })
    }catch(err:any){
      toast.error(t(err?.response?.data?.message))
    }finally{
      setIsLoading(false)
    }
    };
  return (
      <Form className='subscription-form' onFinish={onFinish} autoComplete="off">
          <Form.Item
            name="email"
            rules={[{ required: true, type:"email", message: t("LABELS.enterYourEmail") }]}
          >
            <Input
              name="email"
              placeholder={"email"}
              required
            />
          </Form.Item>
          <Form.Item className='btn-wrapper'>
            <AppButton loading={isLoading} type="primary" htmlType="submit">
              {t('buttons.submit')}
            </AppButton>
          </Form.Item>
        </Form> 
  )
}

export default SubscriptionForm
