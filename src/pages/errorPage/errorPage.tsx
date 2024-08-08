import { useNavigate, useRouteError } from "react-router-dom";

import { deleteDocument } from "services";
import { useSessionStore } from "stores";
import { Button } from "components";

import styles from "./styles.module.scss";

export const ErrorPage = () => {
  const { session } = useSessionStore();
  const error = useRouteError() as Error;

  const navigate = useNavigate();

  const parseStackTrace = (stackTrace: string | undefined) => {
    if (stackTrace === undefined) return null;

    const lines = stackTrace.split("\n");

    const line = lines[1];

    let mySubString = "";

    if (line.includes(".tsx")) {
      mySubString = line.substring(
        line.indexOf("src") + 4,
        line.indexOf(".tsx") + 4
      );
    } else if (line.includes(".ts")) {
      mySubString = line.substring(
        line.indexOf("src") + 4,
        line.indexOf(".ts") + 3
      );
    }

    return mySubString;
  };

  const handleReset = async () => {
    if (!session?.id) return;

    await deleteDocument({
      id: session.id,
      collection: "sessions",
    });

    navigate("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}>Error</div>

      <div className={styles.description}>
        {error.name} : {error.message}
      </div>
      <div className={styles.description}>
        The Error is probably located at: {parseStackTrace(error.stack)}
      </div>

      <Button label="Reset" onClick={handleReset} />
    </div>
  );
};
