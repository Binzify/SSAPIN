import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ReactComponent as TrashIcon } from "../../assets/svgs/trashcan.svg";
import { userInformationState } from "../../store/atom";
import axiosInstance from "../../utils/apis/api";
import { MAP_APIS } from "../../utils/apis/mapApi";
import { IMap } from "../../utils/types/map.interface";

type MapCardProps = {
  prop: IMap;
  isAdmin: boolean;
};

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.gray0};
  border-radius: 10px;
  margin: 1rem;
  width: 100%;
  height: 9rem;
  box-shadow: 1px 3px 12px 0px ${(props) => props.theme.colors.gray300};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;

  ${(props) => props.theme.mq.mobile} {
    height: 7.5rem;
    margin: 0;
  }

  .icon {
    text-align: center;
    font-size: ${(props) => props.theme.fontSizes.h4};
    color: ${(props) => props.theme.colors.gray900};
    font-family: ${(props) => props.theme.fontFamily.h4bold};

    ${(props) => props.theme.mq.mobile} {
      font-family: ${(props) => props.theme.fontFamily.h5bold};
      font-size: ${(props) => props.theme.fontSizes.h5};
    }
  }

  .title {
    margin-top: 0.7rem;
    text-align: center;
    font-size: ${(props) => props.theme.fontSizes.h4};
    color: ${(props) => props.theme.colors.gray900};
    font-family: ${(props) => props.theme.fontFamily.h4bold};

    ${(props) => props.theme.mq.mobile} {
      margin-top: 0.3rem;
      font-family: ${(props) => props.theme.fontFamily.h5bold};
      font-size: ${(props) => props.theme.fontSizes.h5};
    }

    width: 100%;
    text-align: center;
    display: block;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }

  .user {
    margin-top: 0.7rem;
    text-align: center;
    font-size: ${(props) => props.theme.fontSizes.s2};
    color: ${(props) => props.theme.colors.gray500};
    font-family: ${(props) => props.theme.fontFamily.s2};

    ${(props) => props.theme.mq.mobile} {
      margin-top: 0.3rem;
    }
  }

  :hover {
    scale: 1.06;
    cursor: pointer;
  }
`;

const Bottom = styled.div`
  font-size: ${(props) => props.theme.fontSizes.s2};
  color: ${(props) => props.theme.colors.gray500};
  font-family: ${(props) => props.theme.fontFamily.s2bold};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

function MapCard({ prop, isAdmin }: MapCardProps) {
  const user = useRecoilValue(userInformationState);
  const navigate = useNavigate();
  const onClickMap = () => {
    navigate(`/maps/${prop.mapId}/detail`);
  };

  const onDeletePlace = async (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    if (isAdmin && prop.userId !== user.userId) {
      // eslint-disable-next-line no-alert
      alert("본인의 지도가 아니예요~");
      return;
    }

    // eslint-disable-next-line no-alert
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    const response = await axiosInstance.delete(MAP_APIS.MAP, {
      data: { mapId: prop.mapId },
    });

    try {
      if (response.status === 200) {
        // eslint-disable-next-line no-alert
        alert(`지도가 삭제되었습니다.`);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container onClick={onClickMap}>
      <p className="icon">{prop.mapEmoji}</p>
      <p className="title">{prop.title}</p>
      <p className="user">{`${prop.userEmoji} ${prop.nickname}`}</p>
      <Bottom>
        <div className="delete">
          {isAdmin && prop.userId === user.userId && (
            <TrashIcon className="trashIcon" onClick={onDeletePlace} />
          )}
        </div>
        <p className="summary">
          📌 {prop.placeCnt} &nbsp; 🙋‍♂️ {prop.userCnt}
        </p>
      </Bottom>
    </Container>
  );
}

export default MapCard;
