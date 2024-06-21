import { classes } from "utils";

import { Header } from "./components/header/header";

import styles from "./styles.module.scss";
import { Props } from "./types";

export const MainLayout = (props: Props) => {
  const {
    showHeader,
    showBackButton,
    heading,
    onCloseClick,
    showCloseButton,
    children,
    className,
  } = props;

  return (
    <div className={styles.container}>
      {showHeader && (
        <Header
          heading={heading}
          showBackButton={showBackButton}
          onCloseClick={onCloseClick}
          showCloseButton={showCloseButton}
        />
      )}

      <div className={classes(styles.content, className)}>{children}</div>
    </div>
  );
};
