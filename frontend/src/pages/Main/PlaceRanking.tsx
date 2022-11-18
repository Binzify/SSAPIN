import HotPlaceCard from "../../components/card/HotPlaceCard";
import MainCardListContainer from "../../components/containers/MainCardListContainer";
import MainDescriptionContainer from "../../components/containers/MainDescriptionContainer";
import MainSectionContainer from "../../components/containers/MainSectionContainer";
import MainTitleContainer from "../../components/containers/MainTitleContainer";
import { IPlaceRanking } from "../../utils/types/place.interface";

type PlaceProps = {
  places: IPlaceRanking;
};

function PlaceRanking({ places }: PlaceProps) {
  return (
    <MainSectionContainer tag="section">
      <MainTitleContainer>
        <>
          📍 <span>캠퍼스 근처 핫플레이스</span>
        </>
      </MainTitleContainer>
      <MainDescriptionContainer>
        <p>싸핀러들에게 가장 핫한 장소들을 리뷰/핀/찜 순으로 보여드려요 😊</p>
      </MainDescriptionContainer>
      <MainCardListContainer column={30} mobileColumn={80}>
        <HotPlaceCard
          place={
            places !== undefined && places.review !== null
              ? places.review
              : undefined
          }
          message="🔥 리뷰가 불타고 있어요"
        />
        <HotPlaceCard
          place={
            places !== undefined && places.pin !== null ? places.pin : undefined
          }
          message="📌 가장 많은 지도에 찍힌 장소"
        />
        <HotPlaceCard
          place={
            places !== undefined && places.bookmark !== null
              ? places.bookmark
              : undefined
          }
          message="💘 싸핀러들이 킹왕짱 찜한 장소"
        />
      </MainCardListContainer>
    </MainSectionContainer>
  );
}

export default PlaceRanking;
