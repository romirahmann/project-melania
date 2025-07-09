/* eslint-disable no-unused-vars */
import { FaEdit, FaTasks, FaUsers } from "react-icons/fa";
import { Titlepage } from "../../shared/Titlepage";
import { useEffect, useState } from "react";
import api from "../../services/axios.service";
import { LazyComponent } from "../../shared/LazyComponent";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";

export function Employeepage() {
  const [isLoading, setLoading] = useState(true);
  const [employee, setEmployee] = useState([]);
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
  const [resetChecklist, setResetChecklist] = useState(false);

  useEffect(() => {
    fetchProses();
  }, []);

  const fetchProses = async () => {
    try {
      const res = await api.get("/master/employees");
      setEmployee(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = () => {};

  const handleAction = (type) => {
    switch (type) {
      case "ADD":
        setShowModal({
          show: true,
          type: type,
          data: null,
        });
        break;
      case "EDIT":
        if (selectedData.length > 1 || selectedData.length === 0) {
          setAlert({
            show: true,
            message:
              selectedData.length === 0
                ? "Please select a employee to edit"
                : "Please select only one edit to edit",
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
                ? "Please select a employee to delete"
                : "Please select only one edit to delete",
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
  const handleSelectedData = (val) => {
    setSelcetedData(val);
  };
  return (
    <>
      <div className="w-max-full">
        <Titlepage
          title={`Data Karyawan`}
          icon={FaUsers}
          onSearch={handleSearch}
        />
        {isLoading ? (
          <LazyComponent />
        ) : (
          <div className="w-full table px-2 ">
            <div className="actions flex gap-2 items-center px-5 bg-white py-2 rounded-lg my-2">
              <div className="btn-add">
                <button
                  onClick={() => handleAction("ADD")}
                  className="border hover:bg-blue-600 hover:text-white border-blue-600 p-2 text-xl rounded-md text-blue-800  "
                >
                  <IoAddCircleOutline />
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
                  onClick={() => handleAction("DELETE")}
                  className="border hover:bg-red-600 hover:text-white border-blue-600 p-2 text-xl rounded-md text-red-800  "
                >
                  <MdDeleteForever />
                </button>
              </div>
            </div>
            <div className="bg-white p-3 rounded-lg"></div>
          </div>
        )}
      </div>
    </>
  );
}
