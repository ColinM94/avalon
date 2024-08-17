import * as React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { useSessionStore } from "stores"
import { classes } from "utils"
import { InputText } from "components"
import { getFileUrl, updateDocument, updateMyPlayer, uploadFile } from "services"
import { User } from "types"

import styles from "./styles.module.scss"
import { Props } from "./types"

export const GameLobbyProfile = ({ className }: Props) => {
  const { myPlayer, session } = useSessionStore()

  const imageInputRef = React.useRef<HTMLInputElement | null>(null)

  const [name, setName] = React.useState(myPlayer.name)
  const [image, setImage] = React.useState<File>()

  const fileUrl = image ? URL.createObjectURL(image) : null

  React.useEffect(() => {
    if (!image) return
    ;(async () => {
      await uploadFile(image, `images/${session.id}/${myPlayer.id}.png`)
      const url = await getFileUrl(`images/${session.id}/${myPlayer.id}.png`)

      updateMyPlayer({
        imageUrl: url,
      })

      updateDocument<User>({
        collection: "users",
        id: myPlayer.id,
        data: {
          imageUrl: url,
        },
      })
    })()
  }, [image])

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      updateMyPlayer({
        name,
      })
    }, 200)

    return () => clearTimeout(timeout)
  }, [name])

  React.useEffect(() => {
    updateMyPlayer({
      isReady: false,
    })
  }, [name])

  return (
    <>
      <div className={classes(styles.container, className)}>
        <div onClick={() => imageInputRef.current?.click()} className={styles.avatar}>
          {(fileUrl || myPlayer.imageUrl) && <img src={fileUrl || myPlayer.imageUrl} className={styles.avatarImage} />}

          {!myPlayer.imageUrl && !image && <FontAwesomeIcon icon="camera" className={styles.avatarIcon} />}

          <input
            type="file"
            accept="image/png"
            capture="user"
            onChange={(e) => setImage(e.target.files?.[0])}
            ref={imageInputRef}
            className={styles.imageInput}
          />
        </div>

        <InputText
          value={name}
          setValue={setName}
          placeholder="Your Name"
          maxLength={10}
          inputClassName={styles.nameInput}
          className={styles.name}
        />
      </div>
    </>
  )
}
