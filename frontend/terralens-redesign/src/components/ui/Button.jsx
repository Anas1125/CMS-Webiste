function Button({
  children,
  onClick,
  type = "button",
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        inline-flex whitespace-nowrap
        items-center
        justify-center
        rounded-full
        transition-all
        duration-300
        ease-out
        cursor-pointer
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default Button;