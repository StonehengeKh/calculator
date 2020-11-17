import React from "react";
import classNames from "classnames";

import "./style.css";

type Props = {
  title: string;
  color: string;
  size: string;
  onPress: () => void;
};

const Button: React.FC<Props> = ({
  title,
  size = "small",
  color = "darkgrey",
  onPress,
}) => {
  const buttonClasses = classNames({
    button: true,
    [size]: !!size,
    [color]: !!color,
  });
  return (
    <div className={buttonClasses} onClick={onPress}>
      {title}
    </div>
  );
};

export default Button;
