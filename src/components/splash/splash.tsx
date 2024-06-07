import { Props } from "./types";
import styles from "./styles.module.scss";

export const Splash = ({ show, setShow }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>Welcome to the Avalon Ritual</div>
    </div>
  );
};
