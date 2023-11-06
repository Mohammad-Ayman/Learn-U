import styles from "./styles/actionButton.module.css";

const ActionButton = (props) => {
  return (
    <button className={styles["action-button"]} onClick={props.onClick}>
      {props.action}
    </button>
  );
};

export default ActionButton;
