import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheck,
  faCopy,
  faCrown,
  faHourglass,
  faPencil,
  faX,
} from "@fortawesome/free-solid-svg-icons";

export const initIcons = () => {
  library.add(faPencil, faX, faCopy, faHourglass, faCrown, faCheck);
};
