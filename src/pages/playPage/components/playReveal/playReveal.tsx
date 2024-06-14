import * as React from "react";

import { CharacterRevealer } from "components";
import { useAppStore } from "stores";

import { Props } from "./types";

export const PlayReveal = (props: Props) => {
  const { session, className } = props;

  const [showCharacter, setShowCharacter] = React.useState(false);

  const { user } = useAppStore();

  const characterId = session.players[user.id].characterId;

  return (
    <CharacterRevealer
      characterId={characterId}
      show={showCharacter}
      setShow={setShowCharacter}
      // onReveal={() => setHasViewedCharacter(true)}
    />
  );
};
