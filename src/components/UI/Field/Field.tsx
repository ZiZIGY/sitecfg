import { SectionItemProperties } from "../../../types/config";
import styles from "./Field.module.scss";

export const Field = (props: SectionItemProperties) => {
  return <input {...props} className={styles.field} />;
};
