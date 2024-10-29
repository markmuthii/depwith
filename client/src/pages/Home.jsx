import { useCount } from "../hooks/use-count";

const HomePage = (props) => {
  const [count, setCount] = useCount(5);

  return props.order !== "second" ? (
    <>{props.children}</>
  ) : (
    "This will render in place of the second div"
  );
};

export { HomePage };
