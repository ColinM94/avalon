import * as React from "react";
import { useNavigate } from "react-router-dom";

import { classes } from "utils";
import merlinImage from "assets/images/characters/merlin.png";
import lancelotGood from "assets/images/characters/lancelotGood.png";
import lancelotEvil from "assets/images/characters/lancelotEvil.png";
import percivalImage from "assets/images/characters/percival.png";
import clericImage from "assets/images/characters/cleric.png";
import assassinImage from "assets/images/characters/assassin.png";
import morganaImage from "assets/images/characters/morgana.png";
import oberonImage from "assets/images/characters/oberon.png";

import buttonBackground from "assets/images/00.png";
import buttonBackground2 from "assets/images/01.png";
import buttonBackground3 from "assets/images/02.png";
import buttonBackground4 from "assets/images/03.png";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const HomeLobby = ({ className }: Props) => {
  const navigate = useNavigate();

  const [lobbyCode, setLobbyCode] = React.useState("");

  const handleCreateLobby = () => {
    navigate("/setup");
  };

  const handleJoinLobby = () => {
    if (!lobbyCode) {
      alert("Please enter a lobby code");
      return;
    }

    navigate(`/lobby/${lobbyCode}`);
  };

  return (
    <div className={classes(styles.container, className)}>
      <div
        onClick={handleCreateLobby}
        className={classes(styles.logoContainer, styles.charactersButton)}
      >
        {/* <img src={merlinImage} className={styles.buttonImageLeft} /> */}
        <img src={buttonBackground} className={styles.buttonBackground} />
        {/* <img src={assassinImage} className={styles.buttonImageRight} /> */}
        <div className={styles.testHeading}>Create </div>
      </div>
      <div
        onClick={handleJoinLobby}
        className={classes(styles.logoContainer, styles.charactersButton)}
      >
        {/* <img src={lancelotGood} className={styles.buttonImageLeft} /> */}
        <img src={buttonBackground2} className={styles.buttonBackground} />
        {/* <img src={lancelotEvil} className={styles.buttonImageRight} /> */}
        <div className={styles.testHeading}>Join </div>
      </div>
      <div className={styles.logoContainer}>
        <img src={buttonBackground3} className={styles.buttonBackground} />

        <div className={styles.testHeading}>Rules</div>
      </div>
      <div className={styles.logoContainer}>
        <img src={buttonBackground4} className={styles.rulesImage} />
        <div className={styles.logo}>
          <img src={clericImage} className={styles.clericImage} />
          <img src={percivalImage} className={styles.percivalImage} />
          <img src={merlinImage} className={styles.merlinImage} />

          <img src={assassinImage} className={styles.assassinImage} />
          <img src={morganaImage} className={styles.morganaImage} />
          <img src={oberonImage} className={styles.oberonImage} />
        </div>
        <div className={styles.testHeading}>Characters</div>
      </div>
    </div>
  );
};
