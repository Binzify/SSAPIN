/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { authState, userInformationState } from "../../store/atom";
import { getAccessToken, getUserInformation } from "../apis/userApis";
import { cookie } from "../functions/cookie";

function useUserActions() {
  const [searchParams] = useSearchParams();
  const setAuth = useSetRecoilState(authState);
  const setUser = useSetRecoilState(userInformationState);
  const navigate = useNavigate();
  const useGetUser = useGetUserInformation();

  return { login, logout };

  async function login() {
    const kakaoCode = searchParams.get("code");
    if (!kakaoCode) return navigate("-1");
    try {
      const response = await getAccessToken(kakaoCode);
      const { data } = response;
      if (data?.accessToken) {
        const option = {
          path: "/",
          secure: true,
          sameSite: true,
        };
        cookie.set("accessToken", data?.accessToken, option);
        setAuth({ accessToken: data?.accessToken });
        await useGetUser.getUser();
        if (data?.firstLogin) {
          navigate("/mypage");
        }
      }
    } catch (error) {
      console.log(error);
    }

    navigate("/");
  }

  function logout() {
    cookie.remove("accessToken", { path: "/" });
    setUser({
      campusId: 0,
      nickname: "",
      emoji: "",
      userId: 0,
      mapCnt: 0,
      placeCnt: 0,
      participateCnt: 0,
    });
    setAuth({ accessToken: "" });
    navigate("/");
  }
}

export default useUserActions;

export function useGetUserInformation() {
  const setUser = useSetRecoilState(userInformationState);
  return { getUser };

  async function getUser() {
    try {
      const userResponse = await getUserInformation();
      setUser(userResponse.data);
    } catch (error) {
      console.log(error);
    }
  }
}
