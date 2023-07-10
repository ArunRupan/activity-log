/* eslint-disable react/prop-types */
import { convertToHTML } from "draft-convert";
import {
  ContentState,
  Editor,
  EditorState,
  RichUtils,
  convertFromHTML,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { useEffect, useState } from "react";
import BlockStyles from "./BlockStyles";
import InlineStyle from "./InlineStyles";

const DraftEditor = ({ description, setDescription }) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setDescription(html);
  }, [editorState, setDescription]);

  useEffect(() => {
    const blocksFromHTML = convertFromHTML(description);
    const HTMLstate = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );

    setEditorState(EditorState.createWithContent(HTMLstate));
  }, []);

  const handleKey = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const inlineToggle = (inlineStyle) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };
  const blockToggle = (blockStyle) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockStyle));
  };

  return (
    <div className="border p-3 ">
      <div className="flex">
        <BlockStyles editorState={editorState} onToggle={blockToggle} />
        <InlineStyle editorState={editorState} onToggle={inlineToggle} />
      </div>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        handleKeyCommand={handleKey}
      />
    </div>
  );
};

export default DraftEditor;
