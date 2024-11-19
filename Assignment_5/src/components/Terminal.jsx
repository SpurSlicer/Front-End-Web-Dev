import "./Terminal.css"
import {useState, useRef} from 'react'

const TERMINAL_C = "> ";

class terminal {
    constructor() {
      this.lines = [];
      this.commands = [];
    }
    retrieveEnter() {
      return(
        <>
          <tr>
            <td className='terminal_c'>{TERMINAL_C}</td>
            <td><input className='terminal_input' type="text" placeholder="[]" onKeyDownCapture={handleTerminalEnter} autoFocus={true}/></td>
          </tr> 
          <tr className="terminal_bd" ref={bottom_ref}></tr>
        </>
      )
    }

    retrieveLines() {
      const newLines = [];
      for (const line of this.lines) {
        newLines.push(line);
      }
      return (<>{newLines}</>);
    }
    render() {
        return (
          <div className='terminal'>
          <table>
            <tbody>
              {this.retrieveLines()}
              {this.retrieveEnter()}
          </tbody>
          </table>
        </div>
        )
    }
    checkCommands(line) {
      if (line == "") return;
      const args = line.trim().split(" ").filter((element) => {return (element.trim() != "")});
      if (args[0].toLowerCase().startsWith("clear")) {
        this.lines = [];
      }
      if (args[0].toLowerCase().startsWith("echo")) {
        this.lines.push(
          <tr>
            <td className='terminal_c'>{TERMINAL_C}</td>
            <td className="terminal_d">{args[1]}</td>
          </tr>
        );
      }
    }
    addLine(line) {
      this.lines.push(
        <tr>
          <td className='terminal_c'>{TERMINAL_C}</td>
          <td className="terminal_d">{line}</td>
        </tr>
      );
      this.checkCommands(line);
    }
}

const c_terminal = new terminal();
let handleTerminalEnter = () => {};
let bottom_ref = null;

function Terminal(props) {
    const [update, setUpdate] = useState(false);
    bottom_ref = useRef();
    handleTerminalEnter = (e) => {
      if (e.key == "Enter") {
        c_terminal.addLine(e.target.value);
        e.target.value = "";
        bottom_ref.current.scrollIntoView({ behavior: "instant" });
        setUpdate(!update);
      }
      return;
    }

    return (
        c_terminal.render()
    );
}

export default Terminal;
