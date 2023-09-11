import React from "react";

function Header(props) {
  return (
    <header data-testid="todo-header">
      To Do List: {/*props.incomplete*/} items pending
    </header>
  );
}

export default Header;
