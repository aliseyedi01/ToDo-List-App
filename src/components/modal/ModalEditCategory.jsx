import React, { useContext, useState } from "react";
import Modal from "./Modal";
import { ButtonModal, InputModal, LabelModal } from "../customs/@core";
import { CategoryContext } from "../../State/categoryReducer";

export default function ModalEditCategory({ onClose, title, textButton, EditCategory }) {
  const [newCategory, setNewCategory] = useState(EditCategory);
  const { dispatch } = useContext(CategoryContext);

  const handleEditCategory = (e) => {
    e.preventDefault();
    dispatch({ type: "EDIT_CATEGORY", oldCategory: EditCategory, newCategory: newCategory });
    onClose();
  };

  return (
    <Modal onClose={onClose} title={title}>
      <form>
        <div className="flex flex-col">
          <LabelModal htmlFor="category">Title Category</LabelModal>
          <InputModal
            type="text"
            id="category"
            value={newCategory}
            placeholder="Enter New Category"
            onChange={(e) => {
              setNewCategory(e.target.value);
            }}
          />
        </div>
        <ButtonModal onClick={handleEditCategory}>{textButton}</ButtonModal>
      </form>
    </Modal>
  );
}