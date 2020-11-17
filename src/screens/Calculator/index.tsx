import React, { useState } from "react";

import "./style.css";
import Button from "../../components/Button";

const Calculator = () => {
  const [memoryGeneral, setMemoryGeneral] = useState("0");
  const [totalStatus, setTotalStatus] = useState(false);
  const [percentInStr, setPercentInStr] = useState(false);

  const [numberForView, setNumberForView] = useState("0");

  const allClean = () => {
    setNumberForView("0");
    setPercentInStr(false);
    setTotalStatus(false);
  };

  const memoryBtns = (act: string) => () => {
    if (act === "mc") {
      setMemoryGeneral("0");
      setNumberForView("0");
    }
    if (act === "mr") setNumberForView(memoryGeneral);
    if (act === "m-" || act === "m+") {
      let newMemoryData;
      if (act === "m-") {
        newMemoryData = eval(`${memoryGeneral} - ${numberForView}`).toString();
      }
      if (act === "m+") {
        newMemoryData = eval(`${memoryGeneral} + ${numberForView}`).toString();
      }
      setMemoryGeneral(newMemoryData);
      setNumberForView(newMemoryData);
    }
  };

  const calculate = (item: string) => () => {
    if (
      (numberForView === "0" &&
        item !== "." &&
        item !== "%" &&
        item !== "-" &&
        item !== "+" &&
        item !== "*" &&
        item !== "/") ||
      (totalStatus &&
        item !== "-" &&
        item !== "+" &&
        item !== "*" &&
        item !== "/") ||
      numberForView === "very long"
    ) {
      setNumberForView(item);
      setTotalStatus(false);
    } else if (item === "%" && !percentInStr && numberForView[0] !== "0") {
      setPercentInStr(true);
      setNumberForView(numberForView + item);
      setTotalStatus(false);
    } else if (item !== "%" && !numberForView.endsWith("%")) {
      setNumberForView(numberForView + item);
      setTotalStatus(false);
    } else if (
      numberForView.endsWith("%") &&
      (item === "-" || item === "+" || item === "*" || item === "/")
    ) {
      setNumberForView(numberForView + item);
      setTotalStatus(false);
    }
  };
  const changeNumber = () => {
    const notHaveOperators =
      numberForView !== "0" &&
      !numberForView.includes("-", 1) &&
      !numberForView.includes("+", 1) &&
      !numberForView.includes("*") &&
      !numberForView.includes("/");
    if (numberForView[0] === "-" && notHaveOperators) {
      setNumberForView(numberForView.slice(1));
    } else if (numberForView[0] !== "-" && notHaveOperators) {
      setNumberForView("-" + numberForView);
    }
  };

  const total = () => {
    if (numberForView.includes("%")) {
      const arrWithoutPercent = numberForView
        .slice(0, numberForView.indexOf("%"))
        .split("");
      const arrNumbers = arrWithoutPercent.map((el) => +el).join("");
      const percent = arrNumbers.slice(arrNumbers.lastIndexOf("NaN") + 3);

      const startStr = numberForView.substring(
        0,
        numberForView.indexOf("%") - percent.length
      );
      const percentStr = `${percent} / 100`;
      const endStr = numberForView.substring(numberForView.indexOf("%") + 1);
      const newString = startStr + percentStr + endStr;

      setNumberForView(eval(newString).toString());
      setTotalStatus(true);
      setPercentInStr(false);
    } else {
      setNumberForView(eval(numberForView).toString());
      setTotalStatus(true);
      setPercentInStr(false);
    }
  };

  if (numberForView === "Infinity" || numberForView === "-Infinity")
    setNumberForView("Error");
  if (numberForView.length > 10) setNumberForView("very long");

  const BUTTONS_ITEMS = [
    {
      title: "AC",
      color: "grey",
      size: "small",
      onPress: allClean,
    },
    {
      title: "+/-",
      color: "grey",
      size: "small",
      onPress: changeNumber,
    },
    {
      title: "%",
      color: "grey",
      size: "small",
      onPress: calculate("%"),
    },
    {
      title: "/",
      color: "orange",
      size: "small",
      onPress: calculate("/"),
    },
    {
      title: "mc",
      color: "darkgrey",
      size: "small",
      onPress: memoryBtns("mc"),
    },
    {
      title: "mr",
      color: "darkgrey",
      size: "small",
      onPress: memoryBtns("mr"),
    },
    {
      title: "m-",
      color: "darkgrey",
      size: "small",
      onPress: memoryBtns("m-"),
    },
    {
      title: "m+",
      color: "orange",
      size: "small",
      onPress: memoryBtns("m+"),
    },
    {
      title: "7",
      color: "darkgrey",
      size: "small",
      onPress: calculate("7"),
    },
    {
      title: "8",
      color: "darkgrey",
      size: "small",
      onPress: calculate("8"),
    },
    {
      title: "9",
      color: "darkgrey",
      size: "small",
      onPress: calculate("9"),
    },
    {
      title: "x",
      color: "orange",
      size: "small",
      onPress: calculate("*"),
    },
    {
      title: "4",
      color: "darkgrey",
      size: "small",
      onPress: calculate("4"),
    },
    {
      title: "5",
      color: "darkgrey",
      size: "small",
      onPress: calculate("5"),
    },
    {
      title: "6",
      color: "darkgrey",
      size: "small",
      onPress: calculate("6"),
    },
    {
      title: "-",
      color: "orange",
      size: "small",
      onPress: calculate("-"),
    },
    {
      title: "1",
      color: "darkgrey",
      size: "small",
      onPress: calculate("1"),
    },
    {
      title: "2",
      color: "darkgrey",
      size: "small",
      onPress: calculate("2"),
    },
    {
      title: "3",
      color: "darkgrey",
      size: "small",
      onPress: calculate("3"),
    },
    {
      title: "+",
      color: "orange",
      size: "small",
      onPress: calculate("+"),
    },
    {
      title: "0",
      color: "darkgrey",
      size: "large",
      onPress: calculate("0"),
    },
    {
      title: ",",
      color: "darkgrey",
      size: "small",
      onPress: calculate("."),
    },
    {
      title: "=",
      color: "orange",
      size: "small",
      onPress: total,
    },
  ];

  return (
    <div className="calculator">
      <div className="calculator-container">
        <span className="total">{numberForView}</span>
        <div className="buttons-container">
          {BUTTONS_ITEMS.map(({ title, color, size, onPress }) => (
            <Button
              key={title}
              title={title}
              color={color}
              size={size}
              onPress={onPress}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
