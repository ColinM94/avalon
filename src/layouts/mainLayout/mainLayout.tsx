import { classes } from "utils";

import { Header } from "./components/header/header";

import styles from "./styles.module.scss";
import { Props } from "./types";

export const MainLayout = (props: Props) => {
  const {
    showHeader,
    showBackButton,
    heading,
    showCloseButton,
    children,
    className,
  } = props;

  return (
    <div className={styles.container}>
      {showHeader && (
        <Header
          headingTitle={heading}
          showBackButton={showBackButton}
          showCloseButton={showCloseButton}
        />
      )}

      <div className={classes(styles.content, className)}>{children}</div>
    </div>
  );
};
