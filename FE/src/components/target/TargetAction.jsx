/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { Modal } from "../../shared/Modal";
import { AddTarget } from "./AddTarget";
import { ModalDelete } from "../../shared/ModalDeleted";
import { EditTarget } from "./EditTarget";

export function TargetAction({ isOpen, type, data, onClose, onAction }) {
  const handleDeleted = async () => {
    console.log(isOpen, type, data);
  };
  return (
    <>
      <Modal isOpen={isOpen} title={`${type} Target`} onClose={onClose}>
        {type === "ADD" && <AddTarget onAdd={onAction} />}
        {type === "EDIT" && <EditTarget />}
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
