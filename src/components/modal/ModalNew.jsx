import React, { useContext, useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import BtnInfo from "../customs/@core/BtnInfo";
import BtnWarning from "../customs/@core/BtnWarning";
import { Button, InputModal, LabelModal, Select, TextArea } from "../customs/@core";
import { CheckButton, DoneButton, ImportButton } from "../Utilities";
import { TaskContext } from "../../State/taskReducer";
import { CategoryContext } from "../../State/categoryReducer";

export default function ModalNew({ onClose, text }) {
  const { dispatch } = useContext(TaskContext);
  const { state: categories } = useContext(CategoryContext);
  const titleInputRef = useRef(null);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [isCompleted, setIsCompleted] = useState(Boolean);
  const [isImportant, setIsImportant] = useState(Boolean);

  const addNewTaskHandler = (e) => {
    e.preventDefault();

    const newTask = {
      title: title,
      category: selectCategory,
      description: description,
      date: date,
      completed: isCompleted,
      important: isImportant,
      id: Date.now().toString(),
    };

    dispatch({ type: "ADD_NEW_TASK", task: newTask });

    onClose();
  };

  useEffect(() => {
    titleInputRef.current.focus();
  }, []);

  return (
    <Modal onClose={onClose} title={text}>
      <form className="flex flex-col" onSubmit={addNewTaskHandler}>
        {/* title */}
        <LabelModal>
          Title
          <InputModal
            type="text"
            className=" w-full"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            autoFocus
            ref={titleInputRef}
          />
        </LabelModal>

        {/* date */}
        <LabelModal>
          Date
          <InputModal
            type="date"
            className=" w-full "
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
        </LabelModal>

        {/* description */}
        <LabelModal>
          Description
          <TextArea
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></TextArea>
        </LabelModal>

        {/* Select Category */}
        <LabelModal>
          Select a Category
          <Select
            onChange={(e) => {
              setSelectCategory(e.target.value);
            }}
          >
            {categories.map((category) => (
              <option>{category}</option>
            ))}
          </Select>
        </LabelModal>

        {/* Check Import & Done */}
        <div className="mb-2 flex gap-6 font-DynaPuff">
          <div className="flex items-center gap-1">
            <CheckButton isChecked={isImportant} setChecked={setIsImportant} />
            <span>important</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckButton isChecked={isCompleted} setChecked={setIsCompleted} />
            <span>Done</span>
          </div>
        </div>

        {/* Submit */}
        <BtnInfo className="text-white">Add Task</BtnInfo>
      </form>
    </Modal>
  );
}
