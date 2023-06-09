import React, { useContext } from "react";
import { BsCheckSquareFill } from "react-icons/bs";
import { ImCheckboxUnchecked } from "react-icons/im";
import { TaskContext } from "../../State/taskReducer";

export default function DoneButton({ task }) {
  const { dispatch } = useContext(TaskContext);

  function handleTaskDone(id) {
    dispatch({ type: "DONE_TASK", id: task.id });
  }

  function handleTaskUndo(id) {
    dispatch({ type: "UNDO_TASK", id: task.id });
  }

  return (
    <button className="flex gap-2" title="Done">
      {task.completed ? (
        <BsCheckSquareFill onClick={handleTaskUndo} />
      ) : (
        <ImCheckboxUnchecked onClick={handleTaskDone} />
      )}
    </button>
  );
}
