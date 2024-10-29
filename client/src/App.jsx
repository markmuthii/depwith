import { useCount } from "./hooks/use-count";
import { useEffect, useState } from "react";
import { AboutPage, HomePage } from "./pages";

function App() {
  const [count, setCount] = useCount(4);

  console.log("Component rendered");

  const handleClick = () => {
    setCount(7);
  };

  return (
    <>
      {count}
      <br />
      <button onClick={handleClick}>Click Me</button>
    </>
  );
}

export default App;
