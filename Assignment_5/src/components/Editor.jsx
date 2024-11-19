import './Editor.css'
import EditorLine from './EditorLine'
import {useRef, useEffect, useState} from 'react'


class editor {
    constructor() {
        this.max_line = 1;
        this.lines = [{}];
        this.lines[0].id = {"id": 1};
        this.lines[0].component = <EditorLine>{this.lines[0].id}</EditorLine>
    }
    retrieve() {
        const newLines = [];
        for (const line of this.lines) {
            newLines.push(line.component);
        }
        return (
        <div className='editor'>
            <table onKeyDown={handleEditorEnter}>
            <tbody>
                {newLines}
            </tbody>
            </table>
        </div>
        )
    }
    render() {
        if ((this.lines.length == 0) && (this.max_line == 0)) {
            this.addLine();
        }
        return ( <>{this.retrieve()}</> );
    }
    addLine(id) {
        const new_arr = [];
        let iter = 1;
        for (const line of this.lines) {
            line.id.id = iter;
            new_arr.push(line);
            if (iter == id) {
                iter++;
                const new_line = {};
                new_line.id = {"id": iter};
                new_line.component = <EditorLine>{new_line.id}</EditorLine>;
                new_arr.push(new_line);
            }
            iter++;
        }
        this.max_line++;
        this.lines = new_arr;
    }
    removeLine(id) {
        if (this.max_line == 1) return;
        const new_arr = [];
        let iter = 1;
        for (const line of this.lines) {
            if (iter == id) {iter++; continue;}
            if (iter > id) {
                line.id.id = iter-1;
            } else {
                line.id.id = iter;
            }
            new_arr.push(line);  
            iter++;
        }
        this.max_line--;
        this.lines = new_arr;
    }
}

const c_editors = [new editor(0), new editor(1), new editor(2)];
let handleEditorEnter = () => {};
let bottom_ref = null;


function Editor(props) {
    const c_editor = c_editors[props.children.diff];
    const [update, setUpdate] = useState(false);
    bottom_ref = useRef();
    handleEditorEnter = (e) => {
      if (e.key == "Enter") {
        c_editor.addLine(e.target.id);
        //bottom_ref.current.scrollIntoView({ behavior: "instant" });
        setUpdate(!update);
      } else if (e.key == "Backspace" && e.target.value == "") {
        c_editor.removeLine(e.target.id);
        //bottom_ref.current.scrollIntoView({ behavior: "instant" });
        setUpdate(!update);
      }
      return;
    }

    return (
        <>
            {c_editor.render()}
        </>
    );
}

export default Editor;
