import React from 'react';

function Button({
  onClick,
  className = '',
  children,
  disabled = false,
  type = 'button',
  ...rest
}) {
  const baseStyles = 'px-4 py-2 rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition duration-200';
  const disabledStyles = 'opacity-50 cursor-not-allowed';
  
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${disabled ? disabledStyles : ''} ${className}`}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;