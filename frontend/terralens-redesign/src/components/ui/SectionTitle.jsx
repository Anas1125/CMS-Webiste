function SectionTitle({
  label,
  title,
  description,
  center = false,
}) {
  return (
    <div
      className={`
        mb-16
        ${center ? "text-center" : ""}
      `}
    >
      <p className="uppercase tracking-[6px] text-sm text-blue-500 font-medium">
        {label}
      </p>

      <h2 className="mt-4 text-5xl md:text-6xl font-bold text-neutral-900">
        {title}
      </h2>

      {description && (
        <p className="mt-6 max-w-2xl text-lg text-neutral-500">
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionTitle;