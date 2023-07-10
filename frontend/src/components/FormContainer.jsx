/* eslint-disable react/prop-types */
const FormContainer = ({ children }) => {
  return (
    <div className="h-screen grid place-items-center overflow-y-auto">
      <div className="sm:border py-5 md:px-5 sm:shadow-lg sm:rounded-lg xl:w-1/4 lg:w-1/3 md:w-2/3">
        {children}
      </div>
    </div>
  );
};

export default FormContainer;
