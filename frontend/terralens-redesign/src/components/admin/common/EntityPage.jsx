import PageHeader from "./PageHeader";
import DataTable from "./DataTable";

export default function EntityPage({
  title,
  subtitle,
  buttonText,
  onAdd,
  columns,
  data,
  renderActions,
}) {
  return (
    <div>
      <PageHeader
        title={title}
        subtitle={subtitle}
        buttonText={buttonText}
        onButtonClick={onAdd}
      />

      <DataTable
        columns={columns}
        data={data}
        renderActions={renderActions}
      />
    </div>
  );
}