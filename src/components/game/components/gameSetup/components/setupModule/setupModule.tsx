import * as React from "react";

import { characters } from "consts/characters";
import { useAppStore } from "stores/useAppStore/useAppStore";
import { classes } from "utils/classes";

import styles from "./styles.module.scss";
import { Props } from "./types";

export const SetupModule = (props: Props) => {
  const { characterId, selected, onSelect } = props;
  const { showToast } = useAppStore();

  const [image, setImage] = React.useState<string | null>(null);

  const character = characters[characterId];

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

    onSelect(characterId);
  };

  return (
    <div onClick={handleClick} className={classes(styles.container, selected && styles.containerChecked)}>
      <div className={character.allegiance === "good" ? styles.imageContainerGood : styles.imageContainerEvil}>
        {image && <img loading="lazy" src={image} className={styles.image} />}
      </div>

      <div className={styles.text}>
        <div className={styles.name}>{character.name}</div>

        <div className={styles.description}>{character.description}</div>
      </div>

      <div className={character.boosts === "good" ? styles.boostsGood : styles.boostsBad}>
        {character.boosts === "good" ? "Boosts Good" : "Boosts Evil"}
      </div>
    </div>
  );
};
