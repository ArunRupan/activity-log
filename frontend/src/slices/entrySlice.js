import { createSlice } from "@reduxjs/toolkit";

let eId = 0;

const initialState = [
  {
    id: eId++,
    title: "title 0",
    description: "description 0",
    date: new Date("Jun 18 2022").toLocaleString(),
    edited: false,
    time: new Date("Jun 18 2022").toLocaleString(),
  },
  {
    id: eId++,
    title: "title 01",
    description: "description 01",
    date: new Date("Jun 18 2023").toLocaleString(),
    edited: false,
    time: new Date("Jun 18 2023").toLocaleString(),
  },
  {
    id: eId++,
    title: "title 1",
    description: "description 1",
    date: new Date().toLocaleString(),
    edited: true,
    time: new Date().toLocaleString(),
  },
  {
    id: eId++,
    title: "title 2 June",
    description: "description 2",
    date: new Date("Jun 18 2023").toLocaleString(),
    edited: false,
    time: new Date("Jun 18 2023").toLocaleString(),
  },
  {
    id: eId++,
    title: "title 3 April",
    description: "description 3",
    date: new Date("Apr 19 2023").toLocaleString(),
    edited: false,
    time: new Date("Apr 19 2023").toLocaleString(),
  },
  {
    id: eId++,
    title: "title 4",
    description: "description 4",
    date: new Date("Jun 19 2023").toLocaleString(),
    edited: false,
    time: new Date("Jun 19 2023").toLocaleString(),
  },
  {
    id: eId++,
    title: "title 5",
    description: "description 5",
    date: new Date("Jun 19 2024").toLocaleString(),
    edited: false,
    time: new Date("Jun 19 2024").toLocaleString(),
  },
  {
    id: eId++,
    title: "title 6",
    description: "description 6",
    date: new Date("May 19 2023").toLocaleString(),
    edited: false,
    time: new Date("May 19 2023").toLocaleString(),
  },
  {
    id: eId++,
    title: "title 7",
    description: "description 6",
    date: new Date("Aug 19 2024").toLocaleString(),
    edited: false,
    time: new Date("Aug 19 2024").toLocaleString(),
  },
];

const addEntrySlice = createSlice({
  name: "entries",
  initialState,
  reducers: {
    addEntries: (state, action) => {
      const entry = {
        id: eId++,
        title: action.payload.title,
        description: action.payload.description,
        edited: action.payload.edited,
        date: action.payload.date,
      };
      state.push(entry);
    },
    updateEntry: (state, action) => {
      const { id, title, description, time, edited } = action.payload;
      if (state[id]) {
        state[id].title = title;
        state[id].description = description;
        state[id].edited = edited;
        state[id].time = time;
      }
    },
    deleteEntry: (state, action) => {
      return state.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { addEntries, deleteEntry, updateEntry } = addEntrySlice.actions;
export default addEntrySlice.reducer;
