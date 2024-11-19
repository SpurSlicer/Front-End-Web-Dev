import './Menubar.css'
import menubar_json from "./objects/menubar_json"
import {useState} from 'react'

class menuopt {
  constructor(name, callback) {
      this.name = name;
      this.callback = callback;
  }
  execute() { this?.callback(); }
}
class menubar {
  /* JSON Format
  [
      {
          "name": "name",
          "opts": [
              {
                  "name": "name",
                  "callback": () => {}
              }
          ]
      }
  ]
  */
  constructor(menubar) {
      this.dropdown = [];
      this.menu_item_names = [];
      this.menu_item_cells = [];
      this.current_open_menu = -1;
      this.dropdown_left = 0;
      let callback_cell_index = 0;
      for (const menucell of menubar) {
          this.menu_item_names.push(menucell.name);
          this.menu_item_cells.push([]);
          for (const menuopt_cell of menucell.opts) {
              this.menu_item_cells[callback_cell_index].push(new menuopt(menuopt_cell.name, menuopt_cell.callback));
          }
          callback_cell_index++;
      }
  }
  toggleMenu(index, x) {
    this.dropdown_left = x;
    if (this.current_open_menu == index) {
      this.current_open_menu = -1;
      this.dropdown = <></>;
    } else {
      this.dropdown = [];
      this.current_open_menu = index;
      for (const cell of this.menu_item_cells[index]) {
        this.dropdown.push(<button className='cell' onClick={cell.callback}>{cell.name}</button>)
      }
    }
  }
  render() {
    const menucells = [];
    let menucell_index = 0;
    for (const menucell of this.menu_item_names) {
        const style = (menucell_index == this.current_open_menu) ? ({"backgroundColor": "var(--menubar-background-hover"}) : ({});
        menucells.push(<button id={menucell_index} key={menucell_index} onClick={handleDropDown} style={style}>{menucell}</button>);
        menucell_index++;
    }
    return (
        <div className='menubar'>
            {menucells}
        </div>
    )
  }
  renderDropDown() {
    const style = {"left": this.dropdown_left};
    return (
      <div className='dropdown' style={style}>
        {this.dropdown}
      </div>
    );
  }
}
const c_menubar = new menubar(menubar_json);
let handleDropDown = () => {}

function Menubar(props) {
  const [dropdown_switch, setDropdownSwitch] = useState(true);

  handleDropDown = (target) => {
    setDropdownSwitch(!dropdown_switch);
    c_menubar.toggleMenu(target.target.id, target.target.offsetLeft);
    return;
  }

  return (
  <>
    {c_menubar.render()}
    {c_menubar.renderDropDown()}
  </>
  );
}

export default Menubar;