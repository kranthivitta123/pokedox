import classes from "./Card.module.css";

const Card = (props) => {
  const styleName = { background: props.style };
  return (
    <div
      className={classes.card}
      tabIndex="0"
      style={styleName}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};

export default Card;
