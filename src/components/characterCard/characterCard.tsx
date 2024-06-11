import * as React from "react";

import { classes } from "utils";
import { characterNames } from "consts";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const CharacterCard = (props: Props) => {
  const {
    character,
    onClick,
    showName,
    orientation,
    alwaysActive,
    showInfoButton,
    showDescription,
    disableAnimation,
    className,
  } = props;

  const [image, setImage] = React.useState<string | null>(null);

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

    alert(
      `${characterNames[character.id]} is a character for ${
        character.allegiance
      }`
    );
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
    <div onClick={() => onClick?.(character.id)} className={classNames}>
      {showInfoButton && (
        <div onClick={handleInfoClick} className={styles.infoButton}>
          ?
        </div>
      )}

      <div className={styles.info}>
        {showName && (
          <div className={styles.name}>
            {characterNames[character.id] || character.id}
          </div>
        )}

        {showDescription && (
          <div className={styles.description}>
            {character.description.map((item) => (
              <div className={styles.descriptionItem}>• {item}</div>
            ))}
          </div>
        )}
      </div>

      {image && <img loading="lazy" src={image} className={styles.image} />}
    </div>
  );
};
