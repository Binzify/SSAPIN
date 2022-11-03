import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import MapCard from "../../components/card/MapCard";
import { IMap } from "../../utils/types/map.interface";

const Container = styled.div<{ innerWidth: number }>`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: ${(props) => props.innerWidth < 550 && `7vw`};
  padding-right: ${(props) => props.innerWidth < 550 && `7vw`};

  padding-left: ${(props) => props.innerWidth >= 1700 && `19vw`};
  padding-right: ${(props) => props.innerWidth >= 1700 && `19vw`};

  padding-left: ${(props) =>
    props.innerWidth >= 550 && props.innerWidth < 1700 && `14vw`};
  padding-right: ${(props) =>
    props.innerWidth >= 550 && props.innerWidth < 1700 && `14vw`};

  margin-top: 4rem;
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
  display: flex;
  flex-direction: ${(props) => (props.innerWidth < 950 ? `column` : `row`)};
  justify-content: space-between;

  .textRight {
    padding-top: 0.5rem;
    padding-right: ${(props) => (props.innerWidth < 950 ? `0` : `1rem`)};
    color: ${(props) => props.theme.colors.gray400};
    font-size: ${(props) => props.theme.fontSizes.paragraph};
    font-family: ${(props) => props.theme.fontFamily.paragraph};
  }
`;

type MapProps = {
  maps: IMap[];
};

function MapRanking({ maps }: MapProps) {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    const resizeListener = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener("resize", resizeListener);
  });

  return (
    <Container innerWidth={innerWidth}>
      <Title innerWidth={innerWidth}>
        🎉 <span>인기있는 추천지도</span>
      </Title>
      <Description innerWidth={innerWidth}>
        <p>장소가 제일 많이 등록된 추천지도들을 소개합니다 👍</p>
        <p className="textRight">매일 오전 08:00 기준</p>
      </Description>
      <RankingContainer innerWidth={innerWidth}>
        {maps.length !== 0 &&
          maps.map(
            (map, id) =>
              id <= 2 && (
                <MapCard
                  // eslint-disable-next-line react/no-array-index-key
                  key={id}
                  icon={map.mapEmoji}
                  title={map.title}
                  user={`${map.userEmoji} ${map.nickname}`}
                  placecnt={map.placeCnt}
                  usercnt={map.userCnt}
                />
              ),
          )}
        {maps?.length === 0 && <div>없어요</div>}
      </RankingContainer>
      {maps.length >= 3 && (
        <RankingContainer innerWidth={innerWidth}>
          {maps.map(
            (map, id) =>
              id >= 3 && (
                <MapCard
                  // eslint-disable-next-line react/no-array-index-key
                  key={id}
                  icon={map.mapEmoji}
                  title={map.title}
                  user={`${map.userEmoji} ${map.nickname}`}
                  placecnt={map.placeCnt}
                  usercnt={map.userCnt}
                />
              ),
          )}
        </RankingContainer>
      )}
    </Container>
  );
}

export default MapRanking;