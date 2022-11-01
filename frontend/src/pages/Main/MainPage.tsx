import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Carousel from "react-material-ui-carousel";
import CreateButton from "../../components/Buttons/CreateButton";
import MoveToTopButton from "../../components/Buttons/MoveToTopButton";
import ShowMoreButton from "../../components/Buttons/ShowMoreButton";
import HotPlaceCard from "../../components/card/HotPlaceCard";
import MapCard from "../../components/card/MapCard";
import RankingUserCard from "../../components/card/RankingUserCard";
import Footer from "../../components/etc/Footer";
import MapSearch from "../../components/etc/MapSearch";
import Question from "./Question";
import { pixelToRem } from "../../utils/functions/util";
import TogetherMapCard from "../../components/card/TogetherMapCard";
import CreateButtonMobile from "../../components/Buttons/CreateButtonMobile";

const HeadContainer = styled.div`
  width: 100%;
  height: 70vh;
  background-color: ${(props) => props.theme.colors.mainBlue};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Navbar = styled.div`
  width: 100%;
  height: 15%;
`;

const QuestionContainer = styled.div`
  width: 100%;
  height: 55%;
  text-align: center;
`;

const Searchbar = styled.div`
  width: 100%;
  height: 30%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MainContainer = styled.div`
  width: 100%;
  height: fit-content;
`;

const UserRanking = styled.div<{ innerWidth: number }>`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: ${(props) => (props.innerWidth < 550 ? `7vw` : `20vw`)};
  padding-right: ${(props) => (props.innerWidth < 550 ? `7vw` : `20vw`)};
  margin-top: 3rem;
`;

const RankingContainer = styled.div<{ innerWidth?: number }>`
  display: flex;
  flex-direction: ${(props) => (props.innerWidth < 950 ? `column` : `row`)};
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
`;

const Title = styled.div<{ innerWidth: number }>`
  padding-left: ${(props) => (props.innerWidth < 950 ? `0` : `1rem`)};
  font-size: ${(props) => props.theme.fontSizes.h2};
  color: ${(props) => props.theme.colors.gray900};
  font-family: ${(props) => props.theme.fontFamily.h2bold};
  text-align: ${(props) => (props.innerWidth < 950 ? `center` : `left`)};

  span {
    display: inline;
    box-shadow: inset 0 -25px 0 ${(props) => props.theme.colors.subYellow};
  }
`;

const Description = styled.div<{ innerWidth: number }>`
  padding-top: 1rem;
  padding-left: ${(props) => (props.innerWidth < 950 ? `1rem` : `2rem`)};
  padding-right: ${(props) => (props.innerWidth < 950 ? `1rem` : `0`)};
  font-size: ${(props) => props.theme.fontSizes.h5};
  color: ${(props) => props.theme.colors.gray500};
  font-family: ${(props) => props.theme.fontFamily.h5};
  text-align: ${(props) => (props.innerWidth < 950 ? `center` : `left`)};
`;

const PlaceRanking = styled.div<{ innerWidth: number }>`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: ${(props) => (props.innerWidth < 550 ? `7vw` : `20vw`)};
  padding-right: ${(props) => (props.innerWidth < 550 ? `7vw` : `20vw`)};
  margin-top: 3rem;
`;

const MapList = styled.div<{ innerWidth: number }>`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: ${(props) => (props.innerWidth < 550 ? `7vw` : `20vw`)};
  padding-right: ${(props) => (props.innerWidth < 550 ? `7vw` : `20vw`)};
  margin-top: 3rem;
`;

const FixContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 999;

  button {
    margin-bottom: 1rem;
    box-shadow: 0 ${pixelToRem(10)} ${pixelToRem(20)} 0 rgba(0, 0, 0, 0.25);
  }
`;

function MainPage() {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    const resizeListener = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener("resize", resizeListener);
  });

  const questions = [
    {
      emoji: "⏰✏📚🤓💻",
      place: 129,
      mapId: 1,
      description: "싸피 교육이 끝나고 어디서 공부하시나요?",
    },
    {
      emoji: "🍜🥂🍴🍲🥘",
      place: 129,
      mapId: 1,
      description: "이 곳은 찐이다.. 내가 뽑은 캠퍼스 근처 최고 맛집은?",
    },
    {
      emoji: "💸😞🌯🍙🥙",
      place: 129,
      mapId: 1,
      description: "히잉.. 꼬르륵.. 돈이없을 때 먹는 갓성비 식당은?",
    },
    {
      emoji: "🍦🧁🍷☕🍸",
      place: 129,
      mapId: 1,
      description: "싸피의 Refresh Time! 점심시간에 가장 많이 가는 카페?",
    },
    {
      emoji: "🎬🍻🎳🎮🎤",
      place: 129,
      mapId: 1,
      description:
        "싸피 끝나고 치맥 한잔! 캠퍼스 근처 놀기 좋은 장소는 어디인가요?",
    },
    {
      emoji: "🤐🍱🍽🙋‍♂️🥟",
      place: 129,
      mapId: 1,
      description: "아주머니 단무지는 빼주세요.. 혼밥 최고 장소를 찍어주세요",
    },
  ];

  const users = [
    {
      emoji: "🎈",
      nickname: "허설헬륨",
      mapcnt: 125,
    },
    {
      emoji: "🎈",
      nickname: "허설헬륨",
      mapcnt: 125,
    },
    {
      emoji: "🎈",
      nickname: "허설헬륨",
      mapcnt: 125,
    },
    {
      emoji: "🎈",
      nickname: "허설헬륨",
      mapcnt: 125,
    },
    {
      emoji: "🎈",
      nickname: "허설헬륨",
      mapcnt: 125,
    },
  ];

  const maps = [
    {
      icon: "🍩☕🍰",
      title: "싸피 근처 맛있는 카페",
      user: "🎈허설헬륨",
      placecnt: 12,
      usercnt: 13,
    },
    {
      icon: "🍩☕🍰",
      title: "싸피 근처 맛있는 카페",
      user: "🎈허설헬륨",
      placecnt: 12,
      usercnt: 13,
    },
    {
      icon: "🍩☕🍰",
      title: "싸피 근처 맛있는 카페",
      user: "🎈허설헬륨",
      placecnt: 12,
      usercnt: 13,
    },
    {
      icon: "🍩☕🍰",
      title: "싸피 근처 맛있는 카페",
      user: "🎈허설헬륨",
      placecnt: 12,
      usercnt: 13,
    },
    {
      icon: "🍩☕🍰",
      title: "싸피 근처 맛있는 카페",
      user: "🎈허설헬륨",
      placecnt: 12,
      usercnt: 13,
    },
    {
      icon: "🍩☕🍰",
      title: "싸피 근처 맛있는 카페",
      user: "🎈허설헬륨",
      placecnt: 12,
      usercnt: 13,
    },
  ];

  return (
    <>
      <HeadContainer>
        <Navbar>navbar</Navbar>
        <QuestionContainer>
          <Carousel>
            {questions.map((item, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <Question key={i} item={item} />
            ))}
          </Carousel>
        </QuestionContainer>
        <Searchbar>
          <MapSearch width="50%" height="30%" />
        </Searchbar>
      </HeadContainer>
      <MainContainer>
        <UserRanking innerWidth={innerWidth}>
          <Title innerWidth={innerWidth}>
            🔥 <span>열정적인 싸핀러 Top 5</span>
          </Title>
          <Description innerWidth={innerWidth}>
            싸핀을 열심히 이용하는 열.정.적.인 싸핀러들을 소개합니다 😎
          </Description>
          {innerWidth >= 950 ? (
            <RankingContainer innerWidth={innerWidth}>
              {users.map((user, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <RankingUserCard key={i} user={user} />
              ))}
            </RankingContainer>
          ) : (
            <RankingContainer innerWidth={innerWidth}>
              <RankingUserCard user={users[0]} type="large" />
              <RankingContainer>
                <RankingUserCard user={users[1]} />
                <RankingUserCard user={users[2]} />
              </RankingContainer>
              <RankingContainer>
                <RankingUserCard user={users[3]} />
                <RankingUserCard user={users[4]} />
              </RankingContainer>
            </RankingContainer>
          )}
        </UserRanking>
        <PlaceRanking innerWidth={innerWidth}>
          <Title innerWidth={innerWidth}>
            📍 <span>캠퍼스 근처 핫플레이스</span>
          </Title>
          <Description innerWidth={innerWidth}>
            싸핀러들에게 가장 핫한 장소들을 리뷰/핀/찜 순으로 보여드려요 😊
          </Description>
          <RankingContainer innerWidth={innerWidth}>
            <HotPlaceCard
              place="바나프레소 테헤란로점"
              address="서울특별시 강남구 역삼동 718-2"
              message="🔥 리뷰가 불타고 있어요"
            />
            <HotPlaceCard
              place="바나프레소 테헤란로점"
              address="서울특별시 강남구 역삼동 718-2"
              message="📌 가장 많은 지도에 찍힌 장소"
            />
            <HotPlaceCard
              place="바나프레소 테헤란로점"
              address="서울특별시 강남구 역삼동 718-2"
              message="💘 싸핀러들이 킹왕짱 찜한 장소"
            />
          </RankingContainer>
        </PlaceRanking>
        <MapList innerWidth={innerWidth}>
          <Title innerWidth={innerWidth}>
            🎉 <span>인기있는 추천지도</span>
          </Title>
          <Description innerWidth={innerWidth}>
            장소가 제일 많이 등록된 추천지도들을 소개합니다 👍
          </Description>
          <RankingContainer innerWidth={innerWidth}>
            {maps.map(
              (map, id) =>
                id <= 2 && (
                  <MapCard
                    // eslint-disable-next-line react/no-array-index-key
                    key={id}
                    icon={map.icon}
                    title={map.title}
                    user={map.user}
                    placecnt={map.placecnt}
                    usercnt={map.usercnt}
                  />
                ),
            )}
          </RankingContainer>
          <RankingContainer innerWidth={innerWidth}>
            {maps.map(
              (map, id) =>
                id >= 3 && (
                  <MapCard
                    // eslint-disable-next-line react/no-array-index-key
                    key={id}
                    icon={map.icon}
                    title={map.title}
                    user={map.user}
                    placecnt={map.placecnt}
                    usercnt={map.usercnt}
                  />
                ),
            )}
          </RankingContainer>
        </MapList>
        <MapList innerWidth={innerWidth}>
          <Title innerWidth={innerWidth}>
            🗺 <span>추천지도</span>
          </Title>
          <Description innerWidth={innerWidth}>
            싸핀러들에게 알리고 싶은 장소를 나만의 추천지도에 마구마구
            등록해보세요 🤩
          </Description>
          <RankingContainer innerWidth={innerWidth}>
            {maps.map(
              (map, id) =>
                id <= 2 && (
                  <MapCard
                    // eslint-disable-next-line react/no-array-index-key
                    key={id}
                    icon={map.icon}
                    title={map.title}
                    user={map.user}
                    placecnt={map.placecnt}
                    usercnt={map.usercnt}
                  />
                ),
            )}
          </RankingContainer>
          <RankingContainer innerWidth={innerWidth}>
            {maps.map(
              (map, id) =>
                id >= 3 && (
                  <MapCard
                    // eslint-disable-next-line react/no-array-index-key
                    key={id}
                    icon={map.icon}
                    title={map.title}
                    user={map.user}
                    placecnt={map.placecnt}
                    usercnt={map.usercnt}
                  />
                ),
            )}
          </RankingContainer>
          <ShowMoreButton />
        </MapList>
        <MapList innerWidth={innerWidth}>
          <Title innerWidth={innerWidth}>
            🎪 <span>모여지도</span>
          </Title>
          <Description innerWidth={innerWidth}>
            테마별 자신의 베스트 1위! 장소를 등록해보세요 🥳
          </Description>
          <RankingContainer innerWidth={innerWidth}>
            {maps.map(
              (map, id) =>
                id <= 2 && (
                  <TogetherMapCard
                    // eslint-disable-next-line react/no-array-index-key
                    key={id}
                    title={map.title}
                    usercnt={map.usercnt}
                  />
                ),
            )}
          </RankingContainer>
          <RankingContainer innerWidth={innerWidth}>
            {maps.map(
              (map, id) =>
                id >= 3 && (
                  <TogetherMapCard
                    // eslint-disable-next-line react/no-array-index-key
                    key={id}
                    title={map.title}
                    usercnt={map.usercnt}
                  />
                ),
            )}
          </RankingContainer>
        </MapList>
      </MainContainer>
      <FixContainer>
        <MoveToTopButton />
        {innerWidth > 650 ? (
          <CreateButton type="button" text="지도 만들기" />
        ) : (
          <CreateButtonMobile type="button" />
        )}
      </FixContainer>
      <Footer />
    </>
  );
}

export default MainPage;
