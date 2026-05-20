import * as React from "react"
import ReactDOM from "react-dom/client"
import { Route, Switch } from "wouter"

import { User } from "types/user"
import { useAppStore } from "stores/useAppStore/useAppStore"
import { Splash } from "components/splash/splash"
import { Toast } from "components/toast/toast"
import { getDocumentSnapshot } from "services/firestore/getDocumentSnapshot"
import { setDocument } from "services/firestore/setDocument"
import { InvalidPage } from "pages/invalidPage/invalidPage"
import { CharactersPage } from "pages/charactersPage/charactersPage"
import { JoinPage } from "pages/joinPage/joinPage"
import { MainMenuPage } from "pages/mainMenu/mainMenuPage"
import { PlayPage } from "pages/playPage/playPage"
import { RulesPage } from "pages/rulesPage/rulesPage"
import { initIcons } from "inits/initIcons"

import "styles/global.scss"

initIcons()

export const App = () => {
  const { user, updateAppStore } = useAppStore()

  React.useEffect(() => {
    const unsubscribe = getDocumentSnapshot<User>({
      id: user.id,
      collection: "users",
      callback: (value) => {
        if (!value) {
          void setDocument<{ id: string; name: string }>({
            id: user.id,
            collection: "users",
            data: user,
          })

          return
        }

        updateAppStore({ user: value })
        return
      },
    })

    return () => unsubscribe?.()
  }, [user.id])

  return (
    <>
      <Switch>
        <Route path="/">
          <MainMenuPage />
        </Route>

        <Route path="join/:sessionId?">
          <JoinPage />
        </Route>

        <Route path="play/:sessionId">
          <PlayPage />
        </Route>

        <Route path="characters">
          <CharactersPage />
        </Route>

        <Route path="rules">
          <RulesPage />
        </Route>

        <Route path="*">
          <InvalidPage />
        </Route>
      </Switch>

      <Splash />
      <Toast />
    </>
  )
}

const rootElement = document.getElementById("root")!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}
