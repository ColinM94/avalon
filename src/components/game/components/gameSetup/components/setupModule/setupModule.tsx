import * as React from "react";

import { characters } from "consts/characters";
import { useAppStore } from "stores/useAppStore/useAppStore";
import { classes } from "utils/classes";

import styles from "./styles.module.scss";
import { Props } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const SetupModule = (props: Props) => {
  const { characterId, selected, onSelect } = props;
  const { showToast } = useAppStore();

  const character = characters[characterId];
  const title = `${character.name} ${character.boosts === "good" ? "Makes Good Stronger" : "Makes Evil Stronger"}`;

  const [image, setImage] = React.useState<string | null>(null);

  React.useEffect(() => {
    const loadImage = async () => {
      const tempImage = await import(`assets/images/characters/${characterId}.webp`);

      setImage(tempImage.default);
    };

    void loadImage();
  }, [characterId]);

  const handleClick = () => {
    if (!character.isOptional) {
      showToast(`${character.name} is not optional`);
      return;
    }

    // showToast(title);
    onSelect(characterId);
  };

  return (
    <div onClick={handleClick} className={classes(styles.container, selected && styles.containerChecked)}>
      <div className={character.allegiance === "good" ? styles.imageContainerGood : styles.imageContainerEvil}>
        {image && <img loading="lazy" src={image} className={styles.image} />}
      </div>

      <div className={styles.text}>
        <div title={title} className={styles.nameContainer}>
          <div className={styles.name}>{character.name}</div>
        </div>

        <div className={styles.description}>{character.description}</div>
      </div>

      {/* <FontAwesomeIcon
        icon="angles-up"
        className={character.boosts === "good" ? styles.boostGoodIcon : styles.boostBadIcon}
      /> */}

      {/* <div className={styles.checkButtonContainer}>
        {checked && <FontAwesomeIcon icon="check" className={styles.checkButtonIcon} />}
      </div> */}

      <div className={character.boosts === "good" ? styles.boostsGood : styles.boostsBad}>
        {character.boosts === "good" ? "Boosts Good" : "Boosts Evil"}
      </div>
    </div>
  );
};
