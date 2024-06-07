import styles from "./styles.module.scss";

export const InvalidPage = () => {
  return (
    <div className={styles.container}>
      <h1>Page Not Found {":("}</h1>
    </div>
  );
};
