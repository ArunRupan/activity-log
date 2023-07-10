/* eslint-disable react/prop-types */
import { FormatListBulleted } from "@mui/icons-material";
import { FormatListNumbered } from "@mui/icons-material";
import HeaderDropdown from "./HeaderDropdown";

const HEADER_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
];

const BLOCK_TYPES = [
  { label: "Quote", style: "blockquote" },
  { label: <FormatListBulleted />, style: "unordered-list-item" },
  { label: <FormatListNumbered />, style: "ordered-list-item" },
  { label: "{ }", style: "code-block" },
];

const BlockStyles = ({ editorState, onToggle }) => {
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <>
      <HeaderDropdown
        headerOptions={HEADER_TYPES}
        active={blockType}
        onToggle={() => onToggle}
      />
      {BLOCK_TYPES.map((type) => (
        <span
          className="opt"
          key={type.style}
          onClick={() => onToggle(type.style)}
        >
          {/* active={type.style === blockType} */}
          {type.label}
        </span>
      ))}
    </>
  );
};

export default BlockStyles;
