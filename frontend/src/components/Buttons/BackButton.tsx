import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { pixelToRem } from "../../utils/functions/util";
import { ReactComponent as BackArrowIcon } from "../../assets/svgs/backarrow.svg";

const BackBtnBg = styled.button`
  display: flex;
  justify-content: center;
  width: 61px;
  height: 61px;
  border-radius: ${pixelToRem(10)};
  background-color: ${(props) => props.theme.colors.lightBlue};
  &:hover {
    background-color: ${(props) => props.theme.colors.mainBlue};
  }
  .arrow-size {
    width: 61px;
    height: 61px;
  }
`;

export default function BackButton() {
  const navigate = useNavigate();

  const moveBack = () => {
    navigate(-1);
  };

  return (
    <BackBtnBg onClick={moveBack}>
      <BackArrowIcon className="arrow-size" />
    </BackBtnBg>
  );
}