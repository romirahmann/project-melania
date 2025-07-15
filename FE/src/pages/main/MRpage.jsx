/* eslint-disable no-unused-vars */
import moment from "moment";
import { useEffect, useState } from "react";
import api from "../../services/axios.service";
import { FaClipboardList, FaEdit } from "react-icons/fa";
import { Titlepage } from "../../shared/Titlepage";
import { LazyComponent } from "../../shared/LazyComponent";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { MdBlock, MdDeleteForever } from "react-icons/md";

import { AlertMessage } from "../../shared/AlertMessage";
import { TableMR } from "../../components/MR/TableMR";
import { MRAction } from "../../components/MR/MRAction";

export function MRpage() {
  const [isLoading, setLoading] = useState(true);
  const [dataMR, setDataMR] = useState([]);
  const [showModal, setShowModal] = useState({
    show: false,
    type: "",
    data: null,
  });
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "",
  });
  const [selectedData, setSelcetedData] = useState([]);
  const [query, setQuery] = useState("");
  const [resetChecklist, setResetChecklist] = useState(false);

  useEffect(() => {
    fetchMR();
  }, []);

  const fetchMR = async () => {
    try {
      const res = await api.get("/master/datamrs");

      setDataMR(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (query) => {
    setQuery(query);
    try {
      let res;

      if (query.trim() === "") {
        res = await api.get("/master/datamrs");
      } else {
        res = await api.get(`/master/dataMR-filter/${query}`);
      }

      setDataMR(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAction = (type) => {
    switch (type) {
      case "EDIT":
        if (selectedData.length > 1 || selectedData.length === 0) {
          setAlert({
            show: true,
            message:
              selectedData.length === 0
                ? "Please select a Data MR to edit"
                : "Please select only one MR to edit",
            type: "warning",
          });
          return;
        }
        setShowModal({ show: true, type: type, data: selectedData[0] });
        break;
      case "DELETE":
        if (selectedData.length > 1 || selectedData.length === 0) {
          setAlert({
            show: true,
            message:
              selectedData.length === 0
                ? "Please select a Data MR to delete"
                : "Please select only one MR to delete",
            type: "warning",
          });
          return;
        }

        setShowModal({ show: true, type: type, data: selectedData[0] });
        break;
      case "NONACTIVE":
        if (selectedData.length > 1 || selectedData.length === 0) {
          setAlert({
            show: true,
            message:
              selectedData.length === 0
                ? "Please select a Data MR to INACTIVE"
                : "Please select only one MR to INACTIVE",
            type: "warning",
          });
          return;
        }

        setShowModal({ show: true, type: type, data: selectedData[0] });
        break;

      default:
        break;
    }
  };
  const handleOnAction = (val) => {
    fetchMR();

    setAlert({
      show: true,
      message: val,
      type: "success",
    });
    setShowModal({
      show: false,
      type: "",
      data: null,
    });
    setSelcetedData([]);
    setResetChecklist(true);
  };
  const handleSelectedData = (val) => {
    setSelcetedData(val);
  };
  const handleExportCsv = () => {
    const exportCsv = async () => {
      try {
        const response = await api.post(`/master/export-datamr`, dataMR, {
          responseType: "blob",
        });

        const url = window.URL.createObjectURL(
          new Blob([response.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          })
        );
        let dateNow = moment().format("YYYYMMDD HH:mm:ss");
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `data_MR_${query !== null ? query : dateNow}.xlsx`
        ); // Nama file
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("❌ Error saat mendownload CSV:", error);
      }
    };
    exportCsv();
  };
  return (
    <>
      <div className="w-max-full">
        <Titlepage
          title={`Data Nomor Medical Record (MR)`}
          icon={FaClipboardList}
          onSearch={handleSearch}
        />
        {isLoading ? (
          <LazyComponent />
        ) : (
          <div className="w-full table px-2 ">
            <div className="actions flex gap-2 items-center px-5 bg-white py-2 rounded-lg my-2">
              <div className="btn-add">
                <button
                  onClick={() => handleExportCsv()}
                  className="border hover:bg-blue-600 hover:text-white border-blue-600 p-2  rounded-md text-green-800  "
                >
                  <PiMicrosoftExcelLogoFill size={21} />
                </button>
              </div>
              <div className="btn-edit">
                <button
                  onClick={() => handleAction("EDIT")}
                  className="border hover:bg-blue-600 hover:text-white border-blue-600 p-2 text-xl rounded-md text-green-800  "
                >
                  <FaEdit />
                </button>
              </div>
              <div className="btn-delete">
                <button
                  onClick={() => handleAction("NONACTIVE")}
                  className="border hover:bg-red-600 hover:text-white border-blue-600 p-2 text-xl rounded-md text-red-800  "
                >
                  <MdBlock />
                </button>
              </div>
              <div className="btn-delete">
                <button
                  onClick={() => handleAction("DELETE")}
                  className="border hover:bg-red-600 hover:text-white border-blue-600 p-2 text-xl rounded-md text-red-800  "
                >
                  <MdDeleteForever />
                </button>
              </div>
            </div>
            <div className="bg-white p-3 rounded-lg">
              <TableMR
                data={dataMR}
                selectedData={(selectedCandra) =>
                  handleSelectedData(selectedCandra)
                }
                resetChecklist={resetChecklist}
              />
            </div>
            <MRAction
              isOpen={showModal.show}
              type={showModal.type}
              data={showModal.data}
              onClose={() =>
                setShowModal({
                  show: false,
                  type: "",
                  data: null,
                })
              }
              onAction={handleOnAction}
            />
          </div>
        )}
      </div>

      <div>
        {alert.show && (
          <AlertMessage
            type={alert.type}
            message={alert.message}
            onClose={() =>
              setAlert({
                show: false,
                type: "",
                message: "",
              })
            }
          />
        )}
      </div>
    </>
  );
}
