import * as React from "react";

import { classes } from "utils";
import { characterNames } from "consts";
import { CharacterModal } from "components";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const CharacterCard = (props: Props) => {
  const {
    character,
    onClick,
    showName,
    orientation = "portrait",
    alwaysActive,
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
      const tempImage = await import(
        `assets/images/characters/${character.id}.webp`
      );

      setImage(tempImage.default);
    };

    loadImage();
  }, [character.id]);

  const handleInfoClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();

    setShowInfo(true);
  };

  const handleReveal = () => {
    setIsReavealed(!isRevealed);
  };

  const classNames = classes(
    styles.container,
    className,
    (alwaysActive || character.isActive) &&
      character.allegiance === "good" &&
      styles.activeGood,
    (alwaysActive || character.isActive) &&
      character.allegiance === "evil" &&
      styles.activeEvil,
    character.allegiance === "good" && styles.good,
    character.allegiance === "evil" && styles.evil,
    orientation === "portrait" && styles.portrait,
    orientation === "landscape" && styles.landscape,
    disableAnimation && styles.animationDisabled
  );

  return (
    <>
      <div onClick={() => onClick?.(character.id)} className={classNames}>
        {!revealed && (
          <div
            onClick={handleReveal}
            className={classes(
              styles.cover,
              isRevealed && styles.coverRevealed
            )}
          />
        )}

        {showInfoButton && (
          <div onClick={handleInfoClick} className={styles.infoButton}>
            ?
          </div>
        )}

        {showName && (
          <div className={styles.name}>
            {characterNames[character.id] || character.id}
          </div>
        )}

        {showDescription && (
          <div className={styles.description}>
            {character.description.map((item) => (
              <div key={item} className={styles.descriptionItem}>
                • {item}
              </div>
            ))}
          </div>
        )}

        {image && <img loading="lazy" src={image} className={styles.image} />}
      </div>

      {showInfoButton && (
        <CharacterModal
          characterId={character.id}
          show={showInfo}
          setShow={setShowInfo}
        />
      )}
    </>
  );
};
