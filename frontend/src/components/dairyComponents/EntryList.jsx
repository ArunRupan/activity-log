import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EntryItem from "./EntryItem";
import { Button } from "@mui/material";

const EntryList = () => {
  const entry = useSelector((state) => {
    return state.entries;
  });

  const year = new Date().getFullYear();
  const [currYear, setCurrYear] = useState(year);

  const month = new Date().getMonth() + 1;
  const [currMonth, setCurrMonth] = useState(month);

  const allYears = entry.map((w) => new Date(w.date).getFullYear());
  const yrArr = [...new Set(allYears)].filter((q) => q !== currYear);

  const currYearTask = entry.filter(
    (q) => new Date(q.date).getFullYear() === currYear
  );

  const allMonths = currYearTask.map((q) => new Date(q.date).getMonth() + 1);
  const mArr = [...new Set(allMonths)].sort((a, b) => b - a);

  const currMonthTask = currYearTask.filter(
    (q) => new Date(q.date).getMonth() + 1 === currMonth
  );

  const monthTasks = currMonthTask.sort((a, b) => b.id - a.id);

  const changeYear = (e) => {
    // e.preventDefault();
    setCurrYear(Number(e.target.innerText));
  };

  const today = () => {
    setCurrYear(year);
    setCurrMonth(month);
  };

  useEffect(() => {
    setCurrMonth(mArr[0]);
  }, [currYear]);

  return (
    <div>
      {/* Year Links */}

      {/* add h-10 overflow-y-hidden to hide scroll */}
      <div className="touch-pan-x">
        {/* add pb-6 to hide scroll */}
        <div className="years pt-20 flex gap-3 w-1/2 mx-auto overflow-x-auto select-none justify-between">
          {yrArr.map((yr) => (
            <Button key={yr} onClick={changeYear}>
              {yr}
            </Button>
          ))}
        </div>
      </div>
      <div className="relative">
        <h1 className="text-center my-5">{currYear}</h1>
        {currMonth != month || currYear != year ? (
          <div className="absolute top-[25%] left-[60%] select-none">
            <Button onClick={today}>Today</Button>
          </div>
        ) : null}
      </div>

      {/* Month Links */}
      <div className="flex flex-col md:w-2/3 mx-auto">
        <div className="w-[60%] mb-5 mx-auto bg-stone-300 ">
          {mArr.map((month) => (
            <button key={month} onClick={() => setCurrMonth(month)}>
              {/* <button key={month} onClick={() => setCurrMonth(month)}> */}
              {formatMonth(month)}
            </button>
          ))}
        </div>

        {/* Task List */}
        <div className="m-6">
          {monthTasks.map((q) => (
            <div key={q.id}>
              {/* day tasks map  */}
              <EntryItem id={q.id} task={q} />
            </div>
          ))}
          {monthTasks.length < 1 && (
            <div className="w-1/2 mx-auto h-[10rem] border-4 border-dashed grid place-items-center text-3xl">
              Empty
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function formatMonth(month) {
  const date = new Date();
  date.setMonth(month - 1);
  return date.toLocaleString("en-US", {
    month: "long",
  });
}

export default EntryList;
