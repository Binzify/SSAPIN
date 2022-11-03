import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { BigYellowButton } from "../../components/Buttons/YellowButton";
import { ITogetherMap } from "../../utils/types/togethermap.interface";

type QuestionProps = {
  item: ITogetherMap;
};

const QuestionContainer = styled.div<{ size: number }>`
  width: 100%;
  height: 35vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 0 1rem 0 1rem;

  p {
    font-size: ${(props) =>
      props.size >= 550 ? props.theme.fontSizes.h1 : props.theme.fontSizes.h3};
    color: ${(props) => props.theme.colors.gray50};
    font-family: ${(props) => props.theme.fontFamily.h1bold};
  }
`;

function Question({ item }: QuestionProps) {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    const resizeListener = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener("resize", resizeListener);
  });

  const placeText = `${item.userCnt}개의 장소들!`;

  return (
    <QuestionContainer size={innerWidth}>
      <p>{item.emoji}</p>
      <p>{item.question}</p>
      <BigYellowButton type="button" text1={placeText} text2="참여하러 가기" />
    </QuestionContainer>
  );
}

export default Question;