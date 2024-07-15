import { InputTypes, SectionItemProperties } from "../../../types/config";
import { useDeferredValue, useEffect, useState } from "react";

import styles from "./Field.module.scss";

export const Field = (props: SectionItemProperties) => {
  const { min, max } = props;
  const [value, setValue] = useState(props.defaultValue);

  const deferredValue = useDeferredValue(value);

  const handleInput = ({ target }: { target: HTMLInputElement }) => {
    let value;

    if (props.type === InputTypes.Number) {
      value = parseInt(target.value);

      if (min && max) {
        if (value > max) {
          setValue(max);
        } else {
          setValue(value);
        }
      }
    }
  };
  return (
    <input
      onChange={handleInput}
      {...props}
      value={deferredValue}
      className={styles.field}
    />
  );
};
