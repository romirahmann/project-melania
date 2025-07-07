/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { TableUser } from "../../components/user/TableUser";
import { Titlepage } from "../../shared/Titlepage";
import { FaUsersGear } from "react-icons/fa6";
import api from "../../services/axios.service";
import { LazyComponent } from "../../shared/LazyComponent";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import { AlertMessage } from "../../shared/AlertMessage";
import { AddModalUser } from "../../components/modal/AddModalUser";
import { AddLog } from "../../services/log.service";

export function Userpage() {
  const [users, setUsers] = useState([]);
  const [selectedData, setSelcetedData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "",
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await api.get(`/master/users`);
      setUsers(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearch = () => {};

  const handleSelectedData = (val) => {
    setSelcetedData(val);
  };

  const handleAction = (type) => {
    switch (type) {
      case "ADD":
        setShowModal(true);
        break;
      case "EDIT":
        if (selectedData.length > 1) {
          setAlert({
            show: true,
            message: "Please select only one user to edit",
            type: "warning",
          });
        }

        console.log("EDIT");
        break;
      case "DELETE":
        console.log("DELETE");
        break;

      default:
        break;
    }
  };

  const handleAdd = async (formData) => {
    try {
      await api.post("/master/register", formData);
      setShowModal(false);
      fetchUser();
      setAlert({
        show: true,
        message: "User added successfully",
        type: "success",
      });
      AddLog(`${formData.username} menambahkan user ${formData.username} !`);
    } catch (error) {
      setAlert({
        show: true,
        message: "User added failure!",
        type: "error",
      });
      console.log(error);
    }
  };
  return (
    <>
      <div className="max-w-full">
        <Titlepage
          title={`Users Data`}
          icon={FaUsersGear}
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
            <div className="bg-white p-3 rounded-lg">
              <TableUser
                data={users}
                selectedData={(selectedUser) =>
                  handleSelectedData(selectedUser)
                }
              />
            </div>
          </div>
        )}
      </div>
      <div>
        <AddModalUser
          isOpen={showModal}
          onSubmit={handleAdd}
          onClose={() => (showModal ? setShowModal(false) : setShowModal(true))}
        />
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
