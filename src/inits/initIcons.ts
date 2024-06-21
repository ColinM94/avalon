import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowLeft,
  faArrowRotateBack,
  faCheck,
  faCopy,
  faCrown,
  faHourglass,
  faPause,
  faPencil,
  faPlay,
  faSpinner,
  faX,
} from "@fortawesome/free-solid-svg-icons";

export const initIcons = () => {
  library.add(
    faPencil,
    faX,
    faCopy,
    faHourglass,
    faCrown,
    faCheck,
    faPlay,
    faArrowRotateBack,
    faPause,
    faSpinner,
    faArrowLeft
  );
};
