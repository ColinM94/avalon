import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowLeft,
  faArrowRotateBack,
  faCamera,
  faCheck,
  faCopy,
  faCrown,
  faEllipsisV,
  faHatWizard,
  faHourglass,
  faPause,
  faPencil,
  faPlay,
  faRightFromBracket,
  faShareNodes,
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
    faArrowLeft,
    faCamera,
    faShareNodes,
    faEllipsisV,
    faRightFromBracket,
    faHatWizard
  );
};
