import { useEffect, useState } from "react";
import { Table } from "../../shared/Table";

/* eslint-disable no-unused-vars */
export function TableKCP({
  data = [],
  selectedData = [],
  filter = [],
  resetChecklist,
}) {
  const [selectedRows, setSelectedRows] = useState([]);
  useEffect(() => {
    selectedData(selectedRows);
  }, [selectedRows]);

  useEffect(() => {
    setSelectedRows([]);
  }, [resetChecklist]);

  const handleSelected = (row, checked) => {
    if (checked) {
      setSelectedRows((prev) => {
        const isExist = prev.some((item) => item.id === row.id);
        return isExist ? prev : [...prev, row];
      });
    } else {
      setSelectedRows((prev) => prev.filter((item) => item.id !== row.id));
    }
  };

  const columns = [
    {
      header: "",
      key: "__checkbox",
      render: (_, row) => (
        <input
          type="checkbox"
          checked={selectedRows.some((item) => item.id === row.id)}
          onChange={(e) => {
            handleSelected(row, e.target.checked);
          }}
        />
      ),
    },
    { header: "No Urut", key: "NoUrut" },
    { header: "Kode Checklist", key: "Kode_Checklist" },
    { header: "No MR", key: "NoMR" },
    { header: "Layanan", key: "layanan" },
    { header: "Nama Pasien", key: "NamaPasien" },
    { header: "Tanggal", key: "Tanggal" },
    { header: "Periode Ranap", key: "Periode_Ranap" },
    { header: "Nama Dokumen", key: "namadokumen" },
  ];
  return (
    <>
      <Table columns={columns} data={data} rowsPerPage={filter.perPage || 10} />
    </>
  );
}
