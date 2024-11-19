import { useState, useEffect } from 'react'
import "./App.css"
import Editor from "./components/Editor"
import Menubar from "./components/Menubar"
import Terminal from "./components/Terminal"

class files {
  constructor() {
      this.files = [{
        "filename": "file1",
        "text": { "instance": <Editor>{{"diff": 0}}</Editor> }
      },
      {
        "filename": "file2",
        "text": { "instance": <Editor>{{"diff": 1}}</Editor> }
      },
      {
        "filename": "file3",
        "text": { "instance": <Editor>{{"diff": 2}}</Editor> }
      }];
      this.current_file = this.files[0];
  }
  retrieve() {
    const file_lines = [];
    const selected_style = { "backgroundColor": "gray"};
    for (const file of this.files) {
        file_lines.push(
            <button className='fileline' style={(file.filename == this.current_file.filename) ? selected_style : {}} id={file.filename}>
                {file.filename}
            </button>
        );
    }
    return (
      <>
      {this.current_file.text.instance}
      <div className='files' onClick={handleClick}>
          {file_lines}
      </div>
      </>
    )
  }
  render() {
    return(<>{this.retrieve()}</>);
  }
  addFile(filename) {
    const new_file = {
      "filename": filename,
      "text": { "instance": <Editor></Editor> }
    }
    this.lines.push(new_file);
  }
  removeFile(filename) {
    const new_arr = [];
    for (const file of this.files) {
      if (file.filename == filename) continue;
      new_arr.push(file);
    }
    this.files = new_arr;
  }
  selectFile(filename) {
    for (const file of this.files) {
      if (file.filename == filename) {
        this.current_file = file;
        break;
      }
    }
  }
}

let handleClick = () => {};


const c_files = new files();


function App() {
  const [update, setUpdate] = useState(false);
  handleClick = (e) => {
    c_files.selectFile(e.target.id);
    setUpdate(!update);
  };
  return (
    <>
      <Menubar></Menubar>
      <div className='grid'>
        {c_files.render()}
        <Terminal></Terminal>
      </div>
    </>
  )
}

export default App
