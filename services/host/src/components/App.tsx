import { useState } from "react";
import styles from "./index.module.scss";
import { Link, Outlet } from "react-router-dom";
import { shopRoutes } from "@packages/shared/src/routes/shop";
import { adminRoutes } from "@packages/shared/src/routes/admin";

export function App() {
  const [counter, setCounter] = useState<number>(0);

  const increment = () => setCounter((prev) => prev + 1);

  return (
    <div>
      <Link to={adminRoutes.about}>about</Link>
      <br />
      <Link to={shopRoutes.main}>shop</Link>
      <h1>{counter}</h1>
      <button className={styles.button} onClick={increment}>
        <span>increment</span>
      </button>
      <br />
      <Outlet />
    </div>
  );
}
