import React, { useRef, useEffect, DragEvent, FC, MutableRefObject } from "react";

interface DragEditTextProps {
  isEditable: boolean;
  prompt: string;
  setPrompt: (text: string) => void;
  editPrompts: Array<{ id: number; title: string; value: string }>;
}

const DragEditText: React.FC<DragEditTextProps> = ({ isEditable, prompt, setPrompt, editPrompts }) => {
  const editorRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const text = e.dataTransfer.getData("text/plain");
    const editor = editorRef.current;
    if (!editor) return;

    const { clientX, clientY } = e;
    let range: Range | undefined;
    
    if (document.caretRangeFromPoint) {
      range = document.caretRangeFromPoint(clientX, clientY) ?? undefined;
    } else {
      const elements = document.elementsFromPoint(clientX, clientY);
      for (const element of elements) {
        if (editor.contains(element) && element instanceof Text) {
          range = document.createRange();
          range.selectNodeContents(element);
          range.collapse(true);
          break;
        }
      }
    }

    if (range) {
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
      document.execCommand("insertText", false, `{${text}}`);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      // Replace <br> with \n to save back to the prompt state
      const updatedPrompt = editorRef.current.innerHTML.replace(/<br>/g, "\n");
      setPrompt(updatedPrompt);
    }
  };

  const replacePlaceholders = () => {
    const text = prompt;
    return text.replace(/{(.*?)}/g, (_, key) => {
      const promptItem = editPrompts.find(item => item.title === key);
      return promptItem ? promptItem.value : `{${key}}`;
    });
  };

  useEffect(() => {
    if (editorRef.current) {
      // Replace newline characters with <br> tags
      if (isEditable) {
        const formattedPrompt = prompt.replace(/\n/g, '<br>');
        editorRef.current.innerHTML = formattedPrompt;
      } else {
        const formattedPrompt = replacePlaceholders();
        console.log("formattedPrompt");
        editorRef.current.innerHTML = formattedPrompt.replace(/\n/g, '<br>');
      }
    }

  }, [isEditable, editPrompts]);

  return isEditable ? (
    <div
      ref={editorRef}
      contentEditable
      onDrop={handleDrop}
      onInput={handleInput} // Attach handleInput to the input event
      className="text-editor"
    />
  ) : (
    <div ref={editorRef} className="text-editor no-border" />
  );
};

export default DragEditText;