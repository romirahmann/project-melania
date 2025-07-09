/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { Modal } from "../../shared/Modal";
import { AddTarget } from "./AddTarget";
import { ModalDelete } from "../../shared/ModalDeleted";
import { EditTarget } from "./EditTarget";
import api from "../../services/axios.service";

export function TargetAction({ isOpen, type, data, onClose, onAction }) {
  const handleDeleted = async () => {
    try {
      await api.delete(`/master/target/${data.id}`);
      onAction("Deleted Target Successfully!");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Modal isOpen={isOpen} title={`${type} Target`} onClose={onClose}>
        {type === "ADD" && <AddTarget onAdd={onAction} />}
        {type === "EDIT" && <EditTarget data={data} onEdit={onAction} />}
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
