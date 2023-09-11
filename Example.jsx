import React from "react";
import { SettingContext } from "./src/context/settings/index/";
import { useContext } from "react";

export default function Example(props) {
  const site = useContext(SettingContext);
  function exampleChange() {
    if (site.example === "world war I") {
      site.setNewExample("peace");
    } else {
      site.setNewExample("world war I");
    }
  }
  console.log(props);
  return (
    <>
      <h1>{`${site.example}`}</h1>
      <button onClick={exampleChange}>click to switch the example state</button>
      {props.children}
      {props.children[0]}
      {props.children[1]}
    </>
  );
}
