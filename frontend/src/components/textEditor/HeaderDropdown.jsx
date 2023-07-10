/* eslint-disable react/prop-types */
const HeaderDropdown = ({ headerOptions, active, onToggle }) => {
  return (
    <select
      className="heading h-full"
      value={active}
      onChange={(e) => onToggle(e.target.value)}
    >
      <option>Header</option>
      {headerOptions.map((header) => {
        return (
          <option key={header.style} value={header.style}>
            {header.label}
          </option>
        );
      })}
    </select>
  );
};

export default HeaderDropdown;
