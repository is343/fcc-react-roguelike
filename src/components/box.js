import React, { Component } from "react";

const Box = props => {
  return (
    <div
      className={props.boxClass}
      id={props.id}
    >
    </div>
  );
};

export default Box;
