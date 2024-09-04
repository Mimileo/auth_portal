import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import '../styles/editor.styles.css'; 


const BioEditor = ({ value, onChange }) => {
  const [editorValue, setEditorValue] = useState(value || '');

  useEffect(() => {
    setEditorValue(value || '');
  }, [value]);

  const handleChange = (content) => {
    setEditorValue(content);
    onChange(content);
  };

  return (
    <ReactQuill
      value={editorValue}
      onChange={handleChange}
      placeholder="Say a bit about your self!"
    />
  );
};

export default BioEditor;
