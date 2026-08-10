function Section({ children, className = "" }) {
  return (
    <section
      className={`
        py-32
        ${className}
      `}
    >
      {children}
    </section>
  );
}

export default Section;