import styles from "./styles.module.scss";
import { Props } from "./types";

export const MainLayout = ({ children }: Props) => {
  return <div className={styles.container}>{children}</div>;
};
