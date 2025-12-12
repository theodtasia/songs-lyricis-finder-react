import React from "react";
import { useField } from "formik";
import InputField from "./InputField";
import { useTranslation } from "react-i18next";
import './InputFieldWrapper.scss';

function InputFieldWrapper({ name, placeholder, ...props }) {
  const { t } = useTranslation();
  const [field, meta] = useField(name);
  return (
    <div className="input-field-wrapper">
      <InputField
        {...field} 
         placeholder={t(placeholder)}
        {...props}  
        className={meta.touched && meta.error ? "input-error" : ""}
      />
      {meta.touched && meta.error && (
        <div className="input-error-message">{t(meta.error)}</div>
      )}
    </div>
  );
}

export default InputFieldWrapper;
