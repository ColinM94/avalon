import styles from "./styles.module.scss";
import { Props } from "./types";

export const StepDescription = ({ heading, description }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>{heading}</div>
      <div className={styles.description}>{description}</div>
    </div>
  );
};
