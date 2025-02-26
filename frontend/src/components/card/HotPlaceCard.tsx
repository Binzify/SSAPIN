import styled from "@emotion/styled";
import { useState } from "react";
import PlaceInfoModal from "../../pages/Place/PlaceInfoModal";
import { IPlaceMin } from "../../utils/types/place.interface";
import ModalPortal from "../containers/ModalPortalContainer";

type HotPlaceProps = {
  place: IPlaceMin;
  message: string;
};

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.gray0};
  border-radius: 10px;
  width: 100%;
  height: 8rem;
  box-shadow: 1px 3px 12px 0px ${(props) => props.theme.colors.gray300};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem 1rem 0 1rem;
  transition: all 0.2s ease-out;

  .place {
    font-size: ${(props) => props.theme.fontSizes.h5};
    color: ${(props) => props.theme.colors.gray900};
    font-family: ${(props) => props.theme.fontFamily.h5bold};

    width: 100%;
    text-align: center;
    display: block;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }

  .address {
    width: 100%;
    margin-top: 0.4rem;
    text-align: center;
    font-size: ${(props) => props.theme.fontSizes.s2};
    color: ${(props) => props.theme.colors.gray500};
    font-family: ${(props) => props.theme.fontFamily.s2};

    ${(props) => props.theme.mq.mobile} {
      margin-top: 0.2rem;
    }

    display: block;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }

  .message {
    margin-top: 1.5rem;
    color: ${(props) => props.theme.colors.mainBlue};
    font-family: ${(props) => props.theme.fontFamily.s2bold};
    font-size: ${(props) => props.theme.fontSizes.s2};
  }

  :hover {
    scale: 1.06;
    cursor: pointer;
  }
`;

function HotPlaceCard({ place, message }: HotPlaceProps) {
  const [placeInfomodalOpen, setPlaceInfoModalOpen] = useState(false);
  const handlePlaceInfoModal = () => {
    if (place !== undefined) setPlaceInfoModalOpen(true);
  };

  return (
    <>
      <Container onClick={handlePlaceInfoModal}>
        <p className="place">
          {place !== undefined ? place.title : "장소가 없습니다"}
        </p>
        <p className="address">
          {place !== undefined ? place.address : "장소가 없습니다"}
        </p>
        <p className="message">{message}</p>
      </Container>
      {placeInfomodalOpen && (
        <ModalPortal>
          <PlaceInfoModal
            placeId={place.placeId}
            onClose={() => {
              setPlaceInfoModalOpen(false);
            }}
          />
        </ModalPortal>
      )}
    </>
  );
}

export default HotPlaceCard;
