import { reactReducer } from "utils";
import { GameState } from "types";
import { useSessionStore } from "stores";
import { Game } from "components";

import styles from "./styles.module.scss";
import { Props } from "./types";

export const PlayProtected = ({}: Props) => {
  const session = useSessionStore();
  const [state, updateState] = reactReducer<GameState | null>(null);

  return (
    <div className={styles.container}>
      <Game
        state={{
          session,
          isAllReady,
        }}
      />
    </div>
  );
};
