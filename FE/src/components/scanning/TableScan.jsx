/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import { useEffect, useState } from "react";
import { Table } from "../../shared/Table";
import api from "../../services/axios.service";

export function TableScan({ data = [], selectedProses }) {
  const [countShow, setCountShow] = useState(10);
  const [proses, setProses] = useState([]);

  useEffect(() => {
    fetchProses();
  }, []);

  const fetchProses = async () => {
    try {
      let res = await api.get(`/master/prosess`);
      setProses(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilterChange = (e) => {
    const { value } = e.target;

    selectedProses(value);
  };

  const handleSelesai = () => {};

  const columns = [
    { header: "Kode Checklist", key: "kode_checklist" },
    { header: "ID Proses", key: "idproses" },
    { header: "Nama Proses", key: "nama_proses" },
    { header: "Nama Karyawan", key: "nama_karyawan" },
    { header: "Mulai", key: "mulai_formatted" },
    {
      header: "Selesai",
      key: "selesai_formatted",
      render: (val, row) => {
        if (val === "00:00:00" && row.idproses === "1003") {
          return (
            <button className="px-3 py-1 bg-blue-800 text-white rounded-lg">
              Input QTY
            </button>
          );
        }

        if (val === "00:00:00") {
          return (
            <button className="px-3 py-1 bg-blue-800 text-white rounded-lg">
              Selesai
            </button>
          );
        }

        return ""; // atau bisa return val jika mau tetap tampilkan jam
      },
    },
  ];

  return (
    <>
      <div className=" overflow-auto ">
        <h2 className="text-2xl text-center font-semibold mb-4">
          SCAN SELESAI
        </h2>
        <div className="header flex">
          <div className="showItem">
            <label htmlFor="itemShow" className="text-gray-600 me-2">
              Show:
            </label>
            <select
              id="itemShow"
              className="px-2 py-1 border border-gray-300 rounded"
              value={countShow}
              onChange={(e) => {
                setCountShow(Number(e.target.value));
              }}
            >
              {[10, 20, 50, 100].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          {/* Input Search */}
          <div className="mb-4 flex items-center ms-auto">
            <div className="showItem mx-3">
              <label htmlFor="itemShow" className="text-gray-600 me-2">
                ID Proses:
              </label>
              <select
                id="itemShow"
                className="px-2 py-1 border border-gray-300 rounded"
                defaultValue="All"
                onChange={handleFilterChange}
              >
                <option value="All">All</option>
                {proses.map((value) => (
                  <option key={value.idproses} value={value.idproses}>
                    {value.idproses}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <Table data={data} columns={columns} rowsPerPage={countShow} />
      </div>
    </>
  );
}
