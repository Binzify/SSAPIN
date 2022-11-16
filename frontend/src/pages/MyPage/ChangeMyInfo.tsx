import styled from "@emotion/styled";
import { SetStateAction, useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import ModalContainer from "../../components/containers/ModalContainer";
import CancelButton from "../../components/Buttons/CancelButton";
import ConfirmButton from "../../components/Buttons/ConfirmButton";
import { authState, campusState, userInformationState } from "../../store/atom";
import { CAMPUS_LIST } from "../../utils/constants/contant";
import { pixelToRem } from "../../utils/functions/util";
import axiosInstance from "../../utils/apis/api";
import USER_APIS, {
  checkDuplicateUserNickname,
} from "../../utils/apis/userApis";
import { MemoisedEmojiSlotMachine } from "../../components/Buttons/EmojiSlotMachine";
import { IUserNicknameCheck } from "../../utils/types/user.interface";

interface ChangeModalProps {
  onClose: () => void;
}

const Container = styled.div`
  position: relative;
  height: 100%;
  line-height: 29px;
`;

const RelativeContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 15px;
  letter-spacing: -1px;
  text-align: left;
  font-family: ${(props) => props.theme.fontFamily.paragraphbold};
  font-size: ${(props) => props.theme.fontSizes.paragraph};
  color: ${(props) => props.theme.colors.gray600};
  span {
    color: ${(props) => props.theme.colors.mainRed};
    font-family: ${(props) => props.theme.fontFamily.s1};
    font-size: ${(props) => props.theme.fontSizes.s1};
  }
`;

const ButtonContainer = styled.div`
  text-align: center;
  margin-top: 1rem;
  flex-direction: row;
  button {
    margin: 1rem;
  }
`;

const TiedBoxes = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .active {
    background-color: ${(props) => props.theme.colors.mainYellow};
  }
`;

const StyledCampus = styled.div`
  width: ${pixelToRem(60)};
  height: ${pixelToRem(28)};
  flex-grow: 0;
  border-radius: ${pixelToRem(20)};
  flex-grow: 0;
  font-family: ${(props) => props.theme.fontFamily.s1};
  font-size: ${(props) => props.theme.fontSizes.s1};
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  margin-right: 0.2rem;
  letter-spacing: ${pixelToRem(-0.7)};
  text-align: center;
  background-color: ${(props) => props.theme.colors.gray0};
  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.colors.subYellow};
    scale: 1.05;
  }
`;

const NicknameInput = styled.input`
  width: 276px;
  height: 43px;
  font-family: ${(props) => props.theme.fontFamily.h3bold};
  font-size: ${(props) => props.theme.fontSizes.h3};
  background-color: ${(props) => props.theme.colors.lightLightBlue};
  border: 0;
  border-radius: 10px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  outline: none;
  text-align: center;
`;

const TmpModal = styled.div`
  position: absolute;
  padding: 1rem;
  width: 250px;
  left: 50%;
  top: 30%;
  transform: translate(-50%, 0%);
  border-radius: 10px;
  text-align: center;
  word-break: keep-all;
  background-color: rgba(255, 230, 81, 0.8);
  font-family: ${(props) => props.theme.fontFamily.s1bold};
  font-size: ${(props) => props.theme.fontSizes.s1};
  cursor: pointer;
  z-index: 2;
`;

export function ChangeInfoModal({ onClose }: ChangeModalProps) {
  const camlist = CAMPUS_LIST;
  const [userInformation, setUserInformation] =
    useRecoilState(userInformationState);
  const [nickname, setNickname] = useState(userInformation.nickname);
  const [emoji, setEmoji] = useState(userInformation.emoji);
  const [campus, setCampus] = useState(userInformation.campusId);
  const setCampusId = useSetRecoilState(campusState);
  const [nicknameChk, setNicknameChk] = useState(false);
  const [nicknameEmpty, setNicknameEmpty] = useState(false);
  const [nicknameVali, setNicknameVali] = useState(false);
  const [explainModal, setExplainModal] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const [auth, setAuth] = useRecoilState(authState);

  useEffect(() => {
    if (auth.firstLogin) {
      setExplainModal(true);
      setAuth((prev) => ({ ...prev, firstLogin: false }));
    }
  }, []);

  const onChangeNickname = async (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setNickname(e.target.value);
  };

  const onChangeCampus = (e: number) => {
    setCampus(e);
  };

  const selectRandomEmoji = (selectedEmoji: string) => {
    setEmoji(selectedEmoji);
    setIsSelecting(false);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setNicknameEmpty(false);
    setNicknameVali(false);
    setNicknameChk(false);

    if (!nickname) {
      setNicknameEmpty(true);
      return;
    }

    if (nickname !== userInformation.nickname) {
      const data: IUserNicknameCheck = {
        nickname,
      };

      const nicknameCheck = await checkDuplicateUserNickname(data);
      // const nicknameCheck = await axiosInstance.get(
      //   USER_APIS.checkDuplicateUserNickname(nickname),
      // );
      setNicknameChk(nicknameCheck.data.using);
      if (nicknameCheck.data.using) {
        return;
      }
    }

    const body = {
      campusId: campus,
      nickname,
      emoji,
    };

    const response = await axiosInstance.patch(
      USER_APIS.USER_INFORMATION,
      body,
    );

    try {
      if (response.status === 200) {
        try {
          const userResponse = await axiosInstance.get(
            USER_APIS.USER_INFORMATION,
          );
          setUserInformation(userResponse.data);
          setCampusId(campus);
        } catch (error) {
          console.log(error);
        }
        onClose();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onChange = () => {
    setIsSelecting(true);
  };

  return (
    <ModalContainer onClose={onClose}>
      <Container>
        {explainModal && (
          <TmpModal onClick={() => setExplainModal(false)}>
            이곳에서 이모지, 별명, 캠퍼스를 변경할 수 있어요.😉
          </TmpModal>
        )}
        <form onSubmit={handleSubmit}>
          <RelativeContainer>
            <MemoisedEmojiSlotMachine
              originalEmoji={userInformation.emoji}
              onClick={selectRandomEmoji}
              setState={onChange}
            />
          </RelativeContainer>
          <RelativeContainer>
            닉네임
            <NicknameInput onChange={onChangeNickname} value={nickname} />
            {nicknameChk && <span>이미 존재하는 닉네임인데용.. 쩝...</span>}
            {nicknameEmpty && <span>닉네임을.. 입력해주시궜어요..?</span>}
            {nicknameVali && (
              <span>흐어..~ 닉네임 다 못읽겠어.. 10자이하가 딱.. 좋은데..</span>
            )}
          </RelativeContainer>
          <RelativeContainer>
            소속 캠퍼스
            <TiedBoxes>
              {camlist.map(
                (el, id) =>
                  id >= 1 && (
                    <StyledCampus
                      // eslint-disable-next-line react/no-array-index-key
                      key={id}
                      onClick={() => {
                        onChangeCampus(id);
                      }}
                      className={`${campus === id ? "active" : ""}`}
                    >
                      {el}
                    </StyledCampus>
                  ),
              )}
            </TiedBoxes>
          </RelativeContainer>
          <ButtonContainer>
            <ConfirmButton
              used="modal"
              type="submit"
              text="확인"
              disabled={isSelecting}
            />
            <CancelButton
              used="modal"
              type="button"
              text="취소"
              func={onClose}
            />
          </ButtonContainer>
        </form>
      </Container>
    </ModalContainer>
  );
}
