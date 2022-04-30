import React, { useState } from "react";
import styled from "styled-components";

const DropDownContainer = styled("div")`
  background-color: white;
  width: 16rem;
  margin-top: 3rem;
`;
const DropDownHeader = styled("div")`
  color: #049dbf;
  padding: 0.8rem;
  border-radius: 10px;
  border: 1px solid #a2a8a7;
`;
const DropDownListContainer = styled("div")`
  color: white;
  background-color: #049dbf;
  border-radius: 10px;
  margin-top: 0.8rem;
  position: absolute;
  z-index: 2;
  width: 16rem;
`;
const DropDownList = styled("ul")``;
const ListItem = styled("li")`
  padding: 0.8rem 0.8rem 0.4rem 0.8rem;
  &:first-child {
    border-radius: 10px 10px 0 0;
  }
  &:last-child {
    padding-bottom: 0.8em;
    border-radius: 0 0 10px 10px;
  }
  &:hover {
    background-color: #2fc5e6;
  }
`;

export default function SelectCategory({
  category,
  setCategory,
  setShowQuiz,
  setAlert,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const availableCategories = [
    "BASH",
    "DevOps",
    "HTML",
    "JavaScript",
    "Docker",
    "MySQL",
    "PHP",
    "WordPress",
  ];

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (category) => () => {
    setShowQuiz(false);
    setAlert("");
    setCategory(category);
    setIsOpen(false);
  };

  return (
    <>
      <DropDownContainer>
        <DropDownHeader onClick={toggling}>
          {" "}
          {category || "Choose category"}
        </DropDownHeader>
        {isOpen && (
          <DropDownListContainer>
            <DropDownList>
              {availableCategories.map((category) => (
                <ListItem
                  onClick={onOptionClicked(category)}
                  key={Math.random()}
                >
                  {category}
                </ListItem>
              ))}
            </DropDownList>
          </DropDownListContainer>
        )}
      </DropDownContainer>
    </>
  );
}
