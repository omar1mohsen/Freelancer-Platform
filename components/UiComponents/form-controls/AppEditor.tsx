import { FormInstance } from "antd";
import { useEffect, useState } from "react";
import Editor from "react-simple-wysiwyg";

type EditorProps = {
  placeholder?: string;
  form:FormInstance;
  name?:string;
};
const AppEditor = ({placeholder,form,name}:EditorProps) => {
  const [html, setHtml] = useState("");

    useEffect(()=>{
    if(form?.getFieldValue(name)){
      setHtml(form.getFieldValue(name))
    }
  },[form?.getFieldValue(name)])
  
  function onChange(e: any) {
    form?.setFieldValue(name,e.target.value);
    setHtml(e.target.value)
  }

  return (
    <Editor
      placeholder={placeholder}
      value={html}
      name={name}
      onChange={onChange}
      className="min-h-40 bg-body text-text border-border rtl:!text-right ltr:!text-left"
    />
  );
};

export default AppEditor;
