import { useNavigate } from "react-router-dom";
import { Button, Header } from "components";
import styles from "./styles.module.scss";

export const HomePage = () => {
  const navigate = useNavigate();

  const handleCreateLobby = () => {
    navigate("/setup");
  };

  const handleJoinLobby = () => {
    navigate("/lobby");
  };

  return (
    <>
      <Header heading="Avalon" hideBackButton />

      <div className={styles.menu}>
        <Button label="Create Lobby" onClick={handleCreateLobby} />
        <Button label="Join Lobby" onClick={handleJoinLobby} />
      </div>
    </>
  );
};
