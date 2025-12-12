import './InputField.scss';

function InputField({ field, placeholder, className = "", ...props }) {
  return (
    <input
      className={`input-field ${className}`} // apply CSS
      type="text"
      placeholder={placeholder}
      {...field}      
      {...props}
    />
  );
}

export default InputField;
