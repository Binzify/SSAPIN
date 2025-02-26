import styled from "@emotion/styled";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import LoginModal from "../../pages/Login/LoginModal";
import { authState, userInformationState } from "../../store/atom";
import useUserActions from "../../utils/hooks/useUserActions";
import ModalPortal from "../containers/ModalPortalContainer";
import Footer from "./Footer";
import { ReactComponent as Logout } from "../../assets/svgs/logoutbutton.svg";
import { ReactComponent as Xbutton } from "../../assets/svgs/xbutton.svg";

const Container = styled.nav`
  hr {
    width: 100%;
  }
  z-index: 999;

  .nav-menu {
    background-color: white;
    width: 30vw;
    height: 100vh;

    ${(props) => props.theme.mq.tablet} {
      width: 70vw;
    }

    ${(props) => props.theme.mq.mobile} {
      width: 90vw;
    }

    position: fixed;
    top: 0;
    right: -100%;
    transition: 850ms;
    z-index: 4;

    img {
      width: 18px;
      height: auto;
      border-radius: 3px;
    }
  }

  .nav-menu.active {
    right: 0;
    transition: 350ms;
    display: flex;
    flex-direction: column;
    z-index: 4;
  }

  .nav-content {
    padding: 2rem;
    height: 70%;
  }

  .buttons {
  }

  .nav-user {
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 8px 0 8px 16px;
    list-style: none;
    height: 60px;

    ${(props) => props.theme.mq.mobile} {
      padding: 8px 0 8px 0;
      font-family: ${(props) => props.theme.fontFamily.h5bold};
      font-size: ${(props) => props.theme.fontSizes.h5};
    }
  }

  .nav-text:hover {
    scale: 1.05;
    cursor: pointer;
  }
`;
const NavContent = styled.button`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 8px 0 8px 16px;
  list-style: none;
  height: 70%;
  font-family: ${(props) => props.theme.fontFamily.h5};
  font-size: ${(props) => props.theme.fontSizes.h5};

  ${(props) => props.theme.mq.mobile} {
    padding: 8px 0 8px 0;
    font-family: ${(props) => props.theme.fontFamily.h5};
    font-size: ${(props) => props.theme.fontSizes.h5};
  }
`;
const MyInfo = styled.div`
  margin-bottom: 1rem;
  div {
    font-family: ${(props) => props.theme.fontFamily.h4bold};
    font-size: ${(props) => props.theme.fontSizes.h4};
    color: ${(props) => props.theme.colors.mainNavy};
  }

  button {
    font-family: ${(props) => props.theme.fontFamily.h5};
    font-size: ${(props) => props.theme.fontSizes.h5};
    color: ${(props) => props.theme.colors.mainNavy};
  }
`;
const NavContentFirst = styled.div`
  button {
    font-family: ${(props) => props.theme.fontFamily.h5};
    font-size: ${(props) => props.theme.fontSizes.h5};
    color: black;
  }
`;

const NavContentSecond = styled.div`
  button {
    font-family: ${(props) => props.theme.fontFamily.h5};
    font-size: ${(props) => props.theme.fontSizes.h5};
    color: black;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 0.5rem;
  button {
    transition: transform 0.2s ease-in;
    &:hover {
      transform: scale(1.05);
    }
  }
`;

type NavbarProps = {
  sidebar: boolean;
  func?: () => void;
};

function Navbar({ sidebar, func }: NavbarProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const auth = useRecoilValue(authState);
  const useUserAction = useUserActions();

  const userInformation = useRecoilValue(userInformationState);
  const navigate = useNavigate();
  const handleModal = () => {
    setModalOpen(true);
  };

  const movePage = (url: string) => {
    func();
    navigate(url);
  };

  return (
    <Container>
      <div className={sidebar ? "nav-menu active" : "nav-menu"}>
        <div className="nav-content">
          <ButtonContainer>
            {auth.accessToken && (
              <button
                type="button"
                aria-label="logout"
                onClick={useUserAction.logout}
              >
                <Logout />
              </button>
            )}
            <button type="button" onClick={func} aria-label="close button">
              <Xbutton />
            </button>
          </ButtonContainer>
          <MyInfo>
            {auth.accessToken ? (
              <div className="nav-user">
                {userInformation.emoji} {userInformation.nickname}
              </div>
            ) : (
              <button type="button" onClick={handleModal}>
                로그인
              </button>
            )}
          </MyInfo>

          {modalOpen && (
            <ModalPortal>
              <LoginModal onClose={() => setModalOpen(false)} />
            </ModalPortal>
          )}
          <hr />
          <NavContentFirst>
            <NavContent type="button" onClick={() => movePage("/")}>
              🏠 홈
            </NavContent>
            <NavContent type="button" onClick={() => movePage("/search")}>
              🗺 지도 찾기
            </NavContent>
            {auth.accessToken && (
              <NavContent type="button" onClick={() => movePage("/mypage")}>
                💡 마이페이지
              </NavContent>
            )}
          </NavContentFirst>
          <hr />
          <NavContentSecond>
            <NavContent
              type="button"
              onClick={() => {
                window.open(
                  "https://positive-gambler-f01.notion.site/SSAPIN-9ab287af8b1b4226924574edef1017be",
                );
              }}
            >
              ⚙️ 이용가이드
            </NavContent>
            <NavContent
              type="button"
              onClick={() => {
                window.open("http://pf.kakao.com/_mLgKxj");
              }}
            >
              <img
                alt="ri_kakao-talk-fill.png"
                src="https://ifh.cc/g/qlBz3y.png"
                width="18px"
                height="18px"
              />
              &nbsp;카카오톡 채널
            </NavContent>
            <NavContent
              type="button"
              onClick={() => {
                window.open(
                  "https://docs.google.com/forms/d/1PcgzJyhUO4gG550dDawSxQiCff_3mr6KYzNIyKrVvdU",
                );
              }}
            >
              🗣 건의사항
            </NavContent>
          </NavContentSecond>
        </div>

        <Footer nav />
      </div>
    </Container>
  );
}
export default Navbar;
