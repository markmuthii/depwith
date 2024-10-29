import { useState } from "react";

export const useCount = (initialCountValue) => {
  const [value, setValue] = useState(initialCountValue);

  const count = value;

  const handleUpdateCountState = (v) => {
    setValue(v);
  };

  return [count, handleUpdateCountState];
};
