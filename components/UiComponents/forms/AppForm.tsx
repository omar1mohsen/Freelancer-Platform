"use client";

import React, { useEffect } from "react";
import { Form, Input, InputNumber, Spin, Select, Col, Row, Checkbox, DatePicker, Rate, Radio } from "antd";
import { useTranslations } from "next-intl";
import PhoneNumber from "../form-controls/PhoneNumber";
import AppUploader from "../form-controls/AppUploader";
import { DateIcon } from "../../../assets/svgs/Icons";
import AppDragger from "../form-controls/AppDragger";
import AppEditor from "../form-controls/AppEditor";

import "react-phone-input-2/lib/style.css";
import "@/styles/components/app-form.scss";

export interface FieldProp {
  type: "text" | "textarea" | "number" | "select" | "phone" | "custom" | "password" | "imgUploader" | "mediaUploader" | "fileUpload" | "otp" | "radio" | "editor" | string;
  name?: string;
  label?: string | React.ReactNode ;
  customItem?: React.ReactNode ;
  subContent?: string | React.ReactNode;
  uploadText?: string;
  rules?: any;
  span?: number;
  placeholder?: string;
  options?: { value: string; label: string | React.ReactNode}[];
  multiple?: boolean;
  maxCount?: any;
  itemProps?: any;
  inputProps?: any;
  onchange?: (value: any) => void;
}

interface FormProps {
  fields?: FieldProp[];
  onFinish?: (values: any) => void;
  onValuesChange?: (values: any) => void;
  handleErrorFailed?: (errorInfo: any) => void;
  initialValues?: any;
  formClass?: string;
  loader?: boolean;
  withOutBtn?: boolean;
  form?: any;
  children?: React.ReactNode;
  btnClass?: string;
  fromBtn?: string | React.ReactNode;
}

const AppForm = ({
  fields,
  onFinish,
  onValuesChange,
  handleErrorFailed,
  initialValues,
  formClass,
  loader = false,
  withOutBtn = false,
  form,
  children,
  btnClass,
  fromBtn,
}: FormProps) => {

  const t = useTranslations();

  useEffect(() => {
    if (initialValues && form) {
      form.setFieldsValue({
        ...initialValues,
      });
    }
  }, [initialValues, form]);

  const onFinishFailed = (errorInfo: any) => {
    console.error("Form submission failed:", errorInfo);
  };

  const renderField = (field: FieldProp) => {
    let inputElement;
  
    switch (field.type) {
      case "text":
        inputElement = <Input placeholder={field.placeholder || field.name} {...field.inputProps} />;
        break;
      case "password":
        inputElement = <Input.Password placeholder={field.placeholder || field.name} {...field.inputProps} />;
        break;
      case "number":
        inputElement = 
        <Input
          type="number" 
          placeholder={field.placeholder || field.name}
          stringMode={false}
          {...field.inputProps} 
        />;
        break;
      case "date":
        inputElement = <DatePicker suffixIcon={<DateIcon />} placeholder={field.placeholder || field.name} {...field.inputProps} />;
        break;
      case "textarea":
        inputElement = <Input.TextArea rows={3} placeholder={field.placeholder || field.name} {...field.inputProps} />;
        break;
      case "phone":
        inputElement =(<><PhoneNumber form={form}  country="iq" {...field.inputProps} /></>) ;
        break;
      case "rate":
        inputElement = <Rate style={{ fontSize: "40px" }} {...field.inputProps} />;
        break;
      case "select":
        inputElement = (
          <Select options={field.options} placeholder={field.placeholder || field.name} mode={field.multiple ? "multiple" : undefined} {...field.inputProps} />
        );
        break;
      case "radio":
        inputElement = (
          <Radio.Group options={field.options} placeholder={field.placeholder || field.name}  optionType="button" {...field.inputProps} />
        );
        break;
      case "checkbox":
        inputElement = <Checkbox {...field.inputProps}>{field.placeholder || field.name}</Checkbox>;
        break;
      case "dragger":
        inputElement = (
          <AppDragger
            multiple={field?.inputProps?.multiple}
            isSingle={field?.inputProps?.isSingle}
            type={field?.inputProps?.draggerType}
            uploadText={field.uploadText}
            maxCount={field.maxCount}
            {...field.inputProps}
          />
        );
        break;
      case "imgUploader":
        inputElement = <AppUploader name={field.name} type_file="image" form={form} uploadText={field.uploadText} maxCount={field.maxCount} {...field.inputProps} />;
        break;
      case "mediaUploader":
        inputElement = <AppUploader name={field.name} uploadText={field.uploadText} type_file="media" form={form} maxCount={field.maxCount} {...field.inputProps} />;
        break;
      case "fileUpload":
        inputElement = <AppUploader name={field.name} type_file="document" maxCount={field.maxCount} form={form} {...field.inputProps} />;
        break;
      case "otp":
        inputElement = <Input.OTP maxLength={6} placeholder={field.placeholder || "Enter OTP"} {...field.inputProps}  dir="ltr"/>;
        break;
      case "editor":
        inputElement = <AppEditor placeholder={field.placeholder} name={field.name} {...field.inputProps} />;
        break;
      default:
        inputElement = null;
    }
  
    return (
      <Col key={`form_item_${field.name}`} span={24} lg={field.span || 24}>
        {field?.customItem ? field?.customItem:(
          <Form.Item className="relative" name={field.name} label={field.label} rules={field.rules} {...field.itemProps}>
            {inputElement}
          </Form.Item>
        )}
        {field.subContent && field.subContent}
      </Col>
    );
  };

  return (
      <Form 
        layout="vertical" 
        form={form} 
        onFinish={onFinish} 
        onFinishFailed={handleErrorFailed ? handleErrorFailed : onFinishFailed} 
        initialValues={initialValues} 
        className={`app-form mt-8 ${formClass || ""}`}
        onValuesChange={onValuesChange}
      >
        {children}
        <Row gutter={16}>{fields?.map((field) => renderField(field))}</Row>
        {!withOutBtn && (
            <Spin spinning={loader} wrapperClassName="w-full">
              <div className={`flex items-center gap-4 ${btnClass || ""}`}>
                  <button type="submit" className="app-btn btn-primary">
                      {typeof(fromBtn) == "string" ?  t(fromBtn):fromBtn || t("buttons.submit")}
                  </button>
              </div>
            </Spin>
        )}
      </Form>
  );
};


export default AppForm;
