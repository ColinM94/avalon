import { Outlet } from "react-router-dom";
import styles from "./styles.module.scss";

export const MainLayout = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};
