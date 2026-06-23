import { useLocation } from "wouter";

import { useSessionStore } from "stores/useSessionStore/useSessionStore";
import { Button } from "components/button/button";

import styles from "./styles.module.scss";

export const GameOver = () => {
  const [, navigate] = useLocation();
  const { numFailVotesToApproveMembers, numFailQuests } = useSessionStore();

  const result = () => {
    const value = {
      evilHasWon: true,
      description: "",
    };

    if (numFailVotesToApproveMembers >= 5) {
      value.description =
        "With the fifth failed vote, the court’s final hope collapses into silence. The nobles have argued, doubted, and delayed until the kingdom can no longer bear its own indecision, and evil takes the throne unchallenged as Camelot falls into ruin.";
    }

    if (numFailQuests >= 3) {
      value.description =
        "Three quests have failed, and the truth now lies buried beneath ash and betrayal. The kingdom’s champions are shattered by their own uncertainty, and as hope drains from Camelot, evil steps forward to seize its victory without mercy.";
    }

    // Merlin is assasinated
    // if (true) {
    //   value.description =
    //     "Merlin is dead, and with him dies the last guiding light of the resistance. The hidden wisdom that once protected the realm is lost forever, and evil rises from the shadows to claim Camelot while the faithful are left blind and broken."
    // }

    if (numFailQuests < 3 && numFailVotesToApproveMembers < 5) {
      value.description =
        "Camelot stands at last in the light, its defenders victorious and its enemies exposed. The lies have been stripped away, the faithful have held the line, and with the forces of evil driven back, peace returns to the kingdom.";

      value.evilHasWon = false;
    }

    return value;
  };

  return (
    <div className={styles.container}>
      {result().evilHasWon && <div className={styles.headingEvil}>Evil has Won</div>}
      {!result().evilHasWon && <div className={styles.headingGood}>Good has Won</div>}

      <div className={styles.description}>{result().description}</div>

      <Button label="Leave Game" onClick={() => navigate("/")} className={styles.container} />
    </div>
  );
};
