import styles from "./Header.module.scss";

export const Header = () => {
  return (
    <header className={styles.header}>
      <h2 className={styles["header__title"]}>Выбрать размеры и цвет</h2>
      <p className={styles["header__subtitle"]}>Пакс Фардал 30 white ИКЕА</p>
    </header>
  );
};
