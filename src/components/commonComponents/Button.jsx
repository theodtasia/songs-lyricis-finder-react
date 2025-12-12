import './Button.scss'; // ← import your SCSS here

function Button({ onClick, children, disabled = false, type = "button", selected = false, className = "", ...props }) {
  const isSelected = !!selected; // selected stays true even if others are disabled
  const classes = ['button', isSelected ? 'button--selected' : null, disabled ? 'button--disabled' : null, className].filter(Boolean).join(' ');

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled}
      type={type}
      aria-pressed={isSelected}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
