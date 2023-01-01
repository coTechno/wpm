import React from "react";
import Account from "./Account";
import Compare from "./Compare";

function Header() {
  return (
    <div className="header">
      <div className="logo">
        <span>
          <img
            style={{ height: "4.3rem", position: "relative", top: "-1.5rem" }}
            src="https://img.icons8.com/bubbles/2x/000000/keyboard.png"
            alt="logo"
          />
        </span>
        <Compare />
      </div>
      <div className="icons">
        <Account />
      </div>
    </div>
  );
}

export default Header;
