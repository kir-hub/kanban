import React, { useState, useCallback } from "react";

export default function Input(props) {
  const { onSubmit } = props;

  const [text, setText] = useState("");

  const textHandler = () => {
    setText(text);
    onSubmit(text);
    setText("");
  };
  const onChangeHandler = useCallback((e) => {
    setText(e.target.value);
  }, []);

  return (
    <div className="input-div">
      <input onChange={onChangeHandler} value={text} palceholder="title" />
      <button onClick={textHandler}> confirm </button>
    </div>
  );
}