import * as React from "react";

import { classes } from "utils/classes";
import { CharacterModal } from "components/characterModal/characterModal";
import { characterNames } from "consts/characters";

import styles from "./styles.module.scss";
import { Props } from "./types";

export const CharacterCard = (props: Props) => {
  const {
    character,
    onClick,
    showName,
    orientation = "portrait",
    isActive = true,
    showInfoButton,
    showDescription,
    disableAnimation,
    revealed = true,
    className,
  } = props;

  const [showInfo, setShowInfo] = React.useState(false);
  const [image, setImage] = React.useState<string | null>(null);
  const [isRevealed, setIsReavealed] = React.useState(false);

  React.useEffect(() => {
    const loadImage = async () => {
      const tempImage = await import(`assets/images/characters/${character.id}.webp`);

      setImage(tempImage.default);
    };

    void loadImage();
  }, [character.id]);

  const handleInfoClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();

    setShowInfo(true);
  };

  const handleReveal = () => {
    setIsReavealed(!isRevealed);
  };

  const classNames = classes(
    styles.container,
    className,
    isActive && character.allegiance === "good" && styles.activeGood,
    isActive && character.allegiance === "evil" && styles.activeEvil,
    character.allegiance === "good" && styles.good,
    character.allegiance === "evil" && styles.evil,
    orientation === "portrait" && styles.portrait,
    orientation === "landscape" && styles.landscape,
    disableAnimation && styles.animationDisabled,
  );

  return (
    <>
      <div onClick={() => onClick?.(character.id)} title={characterNames[character.id]} className={classNames}>
        {!revealed && (
          <div onClick={handleReveal} className={classes(styles.cover, isRevealed && styles.coverRevealed)} />
        )}

        {showInfoButton && (
          <div onClick={handleInfoClick} className={styles.infoButton}>
            ?
          </div>
        )}

        {(showName || showDescription) && (
          <div className={styles.description}>
            {showName && <div className={styles.name}>{characterNames[character.id] || character.id}</div>}

            {showDescription && <div className={styles.descriptionText}>{character.howToPlay}</div>}
          </div>
        )}

        {image && <img loading="lazy" src={image} className={styles.image} />}
      </div>

      {showInfoButton && <CharacterModal characterId={character.id} show={showInfo} setShow={setShowInfo} />}
    </>
  );
};
