import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab, Zoom } from "@mui/material";

import AddEntry from "../dairyComponents/AddEntry";
import EntryList from "../dairyComponents/EntryList.jsx";
import Header from "../Header";

const Dairy = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Header />
      {open && <AddEntry open={open} setOpen={setOpen} />}
      <EntryList />
      <Zoom in={!open}>
        <Fab
          onClick={() => setOpen((prev) => !prev)}
          variant="circular"
          color="primary"
          sx={{
            position: "fixed",
            bottom: 10,
            right: 10,
            width: "5rem",
            height: "5rem",
          }}
        >
          <AddIcon fontSize="large" />
        </Fab>
      </Zoom>
    </>
  );
};

export default Dairy;
