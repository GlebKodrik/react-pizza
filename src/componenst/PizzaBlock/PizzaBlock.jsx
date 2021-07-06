import React, { useState } from "react";
import Button from "../shared/Button";
import { setBasketItem } from "../../redux/actions/basket";
import { useDispatch, useSelector } from "react-redux";

const PizzaBlock = ({ pizzas: el, basketItems }) => {
  const dispatch = useDispatch();
  const itemAddBasketCount = basketItems?.find((item) => item.id === el.id);
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);

  const sizeNames = ["тонкое", "традиционное"];
  const sizePizza = [26, 30, 40];

  const onSelectType = (index) => {
    setActiveType(index);
  };

  const onSelectSize = (index) => {
    setActiveSize(index);
  };
  const addItemBasket = () => {
    const obj = {
      id: el.id,
      img: el.imageUrl,
      name: el.name,
      size: sizePizza[activeSize],
      type: sizeNames[activeType],
      price: el.price,
    };
    dispatch(setBasketItem(obj));
  };
  return (
    <>
      <div className="pizza-block" key={el.id}>
        <img className="pizza-block__image" src={el.imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{el.name}</h4>
        <div className="pizza-block__selector">
          <ul>
            {sizeNames.map((s, index) => (
              <li
                key={index}
                onClick={() => onSelectType(index)}
                className={activeType === index ? "active" : ""}
              >
                {s}
              </li>
            ))}
          </ul>
          <ul>
            {sizePizza.map((el, index) => (
              <li
                key={index}
                onClick={() => onSelectSize(index)}
                className={activeSize === index ? "active" : ""}
              >
                {el}
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {el.price} ₽</div>
          <Button
            className="button button--outline button--add"
            onClick={addItemBasket}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            <i>{itemAddBasketCount?.count || 0}</i>
          </Button>
        </div>
      </div>
    </>
  );
};

export default PizzaBlock;
