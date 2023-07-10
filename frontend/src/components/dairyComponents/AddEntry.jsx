/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addEntries } from "../../slices/entrySlice";

import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { Backdrop, Fade, Modal } from "@mui/material";

import DraftEditor from "../textEditor/DraftEditor";

const AddEntry = ({ open, setOpen }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    if (title.trim().length === 0) {
      alert("enter something");
      setTitle("");
      setDescription("");
      return;
    }
    dispatch(
      addEntries({
        title: title,
        description: description,
        date: new Date().toLocaleString(),
        edited: false,
        time: new Date().toLocaleString(),
      })
    );
    setTitle("");
    setDescription("");
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen((prev) => !prev)}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open} mountOnEnter unmountOnExit>
        <div className="border p-5 md:flex-col md:w-1/3 bg-stone-600 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 ">
          <div className="flex flex-col w-full my-3 text-base">
            <input
              className="taskInput h-12 my-3 rounded-lg p-3"
              placeholder="Add task"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <DraftEditor
              description={description}
              setDescription={setDescription}
            />
          </div>
          <div className="flex gap-2">
            <button
              className="h-10 w-1/2 bg-violet-800 flex justify-center items-center p-0 mb-6"
              onClick={onSubmit}
            >
              <DoneIcon />
            </button>
            <button
              className="w-1/2 p-0 mb-6"
              onClick={() => setOpen((prev) => !prev)}
            >
              <CloseIcon />
            </button>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default AddEntry;
