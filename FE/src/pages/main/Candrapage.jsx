/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import api from "../../services/axios.service";

export function Candrapage() {
  const [isLoading, setLoading] = useState(true);
  const [candra, setCandra] = useState([]);
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
    fetchKcp();
  }, []);

  const fetchKcp = async () => {
    try {
      const res = await api.get("/master/datMRt3");

      setCandra(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (query) => {
    try {
      let res;

      if (query.trim() === "") {
        res = await api.get("/master/datMRt3");
      } else {
        res = await api.get(`/master/mrt3-filter/${query}`);
      }

      setCandra(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

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
                ? "Please select a Data Candra to edit"
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
                ? "Please select a Data Candra to delete"
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
  const handleOnAction = (val) => {
    fetchKcp();

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
  return (
    <>
      <h1>Candra Page</h1>
    </>
  );
}
