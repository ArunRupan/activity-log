import CircularProgress from "@mui/material/CircularProgress";

const Loader = () => {
  return (
    <div className="absolute w-full h-full grid place-items-center">
      <CircularProgress size={20} />
    </div>
  );
};

export default Loader;
