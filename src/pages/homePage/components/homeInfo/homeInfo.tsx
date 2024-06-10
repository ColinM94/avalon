import { classes } from "utils";
import { Heading } from "components";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const HomeInfo = ({ className }: Props) => {
  return (
    <div className={classes(styles.container, className)}>
      <Heading heading="Info" />

      <a
        target="_blank"
        href="https://fgbradleys.com/wp-content/uploads/Avalon-Big-Box-Rulebook.pdf"
        className={styles.rulesLink}
      >
        Game Rules
      </a>

      <a
        target="_blank"
        href="https://fgbradleys.com/wp-content/uploads/Avalon-Big-Box-Rulebook.pdf"
        className={styles.rulesLink}
      >
        Characters
      </a>
    </div>
  );
};
