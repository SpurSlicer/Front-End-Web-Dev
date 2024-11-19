import './EditorLine.css'
import {useRef, useEffect, useState} from 'react'


class editor_line {
    retrieve(id) {
        return (
            <tr>
                <td className='line_c'>{id.id.toString(16).toUpperCase()}</td>
                <td><input className='line_input' id={id.id} type="text" autoFocus={true}/></td>
            </tr> 
        );
    }
    render(id) {
        return (
            <div className='editorline'>
                {this.retrieve(id)}
            </div>
        )
    }
}

const c_line = new editor_line();

function Editor(props) {
    return (
        <>
            {c_line.render(props.children)}
        </>
    );
}

export default Editor;
