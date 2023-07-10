/* eslint-disable react/prop-types */
const INLINE_STYLES = [
  { label: <strong>B</strong>, style: "BOLD" },
  { label: <em>I</em>, style: "ITALIC" },
  { label: <u>U</u>, style: "UNDERLINE" },
  { label: "</>", style: "CODE" },
];

const InlineStyle = ({ onToggle }) => {
  return (
    <>
      {INLINE_STYLES.map((type) => (
        <span
          className="opt"
          key={type.style}
          onClick={() => onToggle(type.style)}
        >
          {/* active={currentStyle.has(type.style)} */}
          {type.label}
        </span>
      ))}
    </>
  );
};

export default InlineStyle;
