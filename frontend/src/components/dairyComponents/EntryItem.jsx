/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteEntry, updateEntry } from "../../slices/entrySlice";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Update from "@mui/icons-material/UpdateSharp";

import DraftEditor from "../textEditor/DraftEditor";

const EntryItem = ({ id, task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const dispatch = useDispatch();

  useEffect(() => {
    setHTML(id);
  }, []);

  function setHTML(id) {
    const out = document.getElementById(id);
    out.innerHTML = task.description;
  }

  const removeEntry = () => {
    dispatch(
      deleteEntry({
        id: id,
      })
    );
  };

  const handleSave = () => {
    if (text.trim().length === 0) {
      alert("enter something");
      return;
    }

    dispatch(
      updateEntry({
        id: id,
        title: text,
        description: description,
        time: new Date().toLocaleString(),
        edited: true,
      })
    );
    setTimeout(() => {
      const place = document.getElementById(id);
      place.innerHTML = description;
    }, 10);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setText(task.title);
    setDescription(task.description);
    setTimeout(() => {
      setHTML(id);
    }, 10);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  // function createMarkup(html) {
  //   return {
  //     __html: DOMPurify.sanitize(html),
  //   };
  // }

  return (
    <div className=" mx-2 p-2 relative border">
      {isEditing ? (
        <div className="flex">
          <div className="w-[85%] me-3">
            <input
              className="w-full my-3 p-3 text-2xl"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            {/* <div id={id}> */}
            <DraftEditor
              id={id}
              isEditing={isEditing}
              description={description}
              setDescription={setDescription}
            />
            {/* </div> */}
          </div>
          <div className="w-[15%] relative">
            <div className="absolute bottom-2 text-white right-0 flex flex-col gap-1 w-full">
              <button
                className="bg-green-700 flex justify-center w-full"
                onClick={() => handleSave()}
              >
                Save
              </button>
              <button
                className="bg-gray-700 flex justify-center w-full"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex">
            {/* body */}
            <div className="p-3 w-[85%] min-h-[160px] relative text-ellipsis">
              <p className="py-2 text-2xl">{task.title}</p>
              {/* <div
              className="py-2 whitespace-pre-wrap"
              dangerouslySetInnerHTML={createMarkup(description)}
            ></div> */}
              <div className="py-2 mb-9 whitespace-pre" id={id}></div>
              <div className="absolute bottom-0 left-0 flex gap-3 p-2">
                {/* Time */}
                <p className="bg-slate-700 rounded-xl p-2 text-xs w-fit text-white">
                  {formatDay(task.date)}
                </p>
                {task.edited && (
                  <p className="bg-slate-700 rounded-xl p-2 text-xs w-fit text-white">
                    <Update fontSize="inherit" /> updated on
                    {formatTime(task.time)}
                  </p>
                )}
              </div>
            </div>
            {/* Buttons */}
            <div className="my-2 w-[15%] relative text-center">
              <div className="absolute bottom-0 right-0 flex flex-col gap-1 w-full">
                <button className="bg-[#822cb2]" onClick={handleEdit}>
                  <EditIcon className="text-white" />
                </button>
                <button className="bg-[#c22525]" onClick={() => removeEntry()}>
                  <DeleteIcon className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

function formatTime(dt) {
  const fDay = new Date(dt).toLocaleDateString("en-in", {
    month: "2-digit",
    year: "2-digit",
  });
  const fTime = new Date(dt).toLocaleTimeString("en-in", {
    timeStyle: "short",
  });
  return ` ${fDay} at ${fTime}`;
}

function formatDay(t) {
  return new Date(t).toLocaleDateString("en-us", {
    day: "numeric",
    weekday: "long",
    year: "2-digit",
  });
}

export default EntryItem;
