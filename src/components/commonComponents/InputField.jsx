import './InputField.scss';
function InputField({ placeholder, value, onChange }) {
  return (
    <input
      className="input-field"
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default InputField;
