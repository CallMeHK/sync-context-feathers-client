import React, { useState } from "react";
import { Link } from "react-router-dom";
import useWindowSize from "../client-hook/useWindowSize";
import "../styles.css";

export default function SideNav(props) {
  const [slider, setSlider] = useState(false);
  const size = useWindowSize();
  const extrapaths = [
    // {
    //   name: "UseLocalStorageEx",
    //   path: "/uselocal"
    // },
    // {
    //   name: "UseOnClickOutsideDemo",
    //   path: "/useonclickoutside"
    // },
    // {
    //   name: "UseOnScreenDemo",
    //   path: "/usescreen"
    // }
  ];
  return (
    <>
      <nav className="navbar-theme">
        <div
          className="sidenav-trigger"
          onClick={() => setSlider(s => !s)}
        >
          <i className="material-icons">menu</i>
        </div>
      </nav>
      <div
        className="sidenav-overlay"
        onClick={() => setSlider(s => !s)}
        style={{
          display: slider && size.width < 980 ? "block" : "none",
          opacity: "1"
        }}
      />
      <ul
        id="slide-out"
        className="sidenav"
        style={{
          transform: slider || size.width > 980 ? "translateX(0%)" : "",
          transitionProperty: "transform",
          transitionDuration: ".25s"
        }}
      >
        <li>
          <h4>{props.title}</h4>
        </li>
        {props.paths.map(elt => (
          <li key={elt.name} onClick={() => setSlider(s => !s)}>
            <Link className="waves-effect" to={elt.path}>
              {elt.name}
            </Link>
          </li>
        ))}
        <li>
          <div className="divider" />
        </li>
        <li>
          <div className="subheader">Submenu</div>
        </li>
        {extrapaths.map(elt => (
          <li onClick={() => setSlider(s => !s)}>
            <Link className="waves-effect" to={elt.path}>
              {elt.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
