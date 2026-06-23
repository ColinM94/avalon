import { useLocation } from "wouter";

import { Button } from "components/button/button";
import { deleteDocument } from "services/firestore/deleteDocument";
import { useSessionStore } from "stores/useSessionStore/useSessionStore";

import styles from "./styles.module.scss";

export const ErrorPage = () => {
  const { sessionId } = useSessionStore();
  // const error = useRouteError() as Error

  const [, navigate] = useLocation();

  const parseStackTrace = (stackTrace: string | undefined) => {
    if (stackTrace === undefined) return null;

    const lines = stackTrace.split("\n");

    const line = lines[1];

    let mySubString = "";

    if (line.includes(".tsx")) {
      mySubString = line.substring(line.indexOf("src") + 4, line.indexOf(".tsx") + 4);
    } else if (line.includes(".ts")) {
      mySubString = line.substring(line.indexOf("src") + 4, line.indexOf(".ts") + 3);
    }

    return mySubString;
  };

  const handleReset = async () => {
    if (!sessionId) return;

    await deleteDocument({
      id: sessionId,
      collection: "sessions",
    });

    navigate("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}>Error</div>

      <div className={styles.description}>{/* {error.name} : {error.message} */}</div>
      <div className={styles.description}>The Error is probably located at: {parseStackTrace(error.stack)}</div>

      <Button label="Reset" onClick={handleReset} />
    </div>
  );
};
