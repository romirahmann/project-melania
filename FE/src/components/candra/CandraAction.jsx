import api from "../../services/axios.service";
import { Modal } from "../../shared/Modal";
import { EditCandra } from "./EditCandra";

/* eslint-disable no-unused-vars */
export function CandraAction({ isOpen, type, data, onClose, onAction }) {
  const handleDeleted = async () => {
    try {
      await api.delete(`/master/employee/${data.id}`);
      onAction("Deleted Proses Successfully!");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Modal isOpen={isOpen} title={`${type} CANDRA`} onClose={onClose}>
        {type === "EDIT" && (
          <EditCandra data={data} onEdit={onAction} onClose={onClose} />
        )}
        {type === "DELETE" && (
          <ModalDelete
            isOpen={isOpen}
            onDelete={handleDeleted}
            onClose={onClose}
          />
        )}
      </Modal>
    </>
  );
}
