import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image'],
    ['clean']
  ],
}

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
]
const TextEditor = ({
  defaultValue,
  onChange
}) => {
  console.log(defaultValue);
  
  return (
    <div className="text-editor">
      <ReactQuill theme="snow"
        modules={modules}
        formats={formats}
        value={`${defaultValue}`}
        onChange={onChange}
      >
      </ReactQuill>
    </div>
  )
}

export default TextEditor