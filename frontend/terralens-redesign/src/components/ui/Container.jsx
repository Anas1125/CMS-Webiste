function Container({ children, className = "" }) {
  return (
    <div
      className={`
        mx-auto
        max-w-7xl
        px-6
        md:px-10
        lg:px-16
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default Container;