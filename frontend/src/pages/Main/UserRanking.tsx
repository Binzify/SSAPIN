import styled from "@emotion/styled";
import RankingUserCard from "../../components/card/RankingUserCard";
import { LessPC, PC } from "../../components/containers/MediaQueryContainer";
import { IUserRanking } from "../../utils/types/user.interface";

const Container = styled.section`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 4rem;
`;

const RankingContainer = styled.div<{ size?: number }>`
  width: 95%;
  display: grid;
  margin: auto;
  margin-top: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(15%, 1fr));
  grid-gap: 2rem;
  margin-bottom: 1rem;
  justify-items: center;

  ${(props) => props.theme.mq.tablet} {
    grid-template-columns: repeat(auto-fill, minmax(40%, 1fr));
  }

  ${(props) => props.theme.mq.mobile} {
    grid-template-columns: repeat(auto-fill, minmax(40%, 1fr));
  }
`;

const Title = styled.div`
  padding-left: 1rem;
  font-size: ${(props) => props.theme.fontSizes.h2};
  color: ${(props) => props.theme.colors.gray900};
  font-family: ${(props) => props.theme.fontFamily.h2bold};
  text-align: left;

  span {
    display: inline;
    box-shadow: inset 0 -25px 0 ${(props) => props.theme.colors.subYellow};
  }

  ${(props) => props.theme.mq.tablet} {
    text-align: center;
    padding-left: 0;
  }

  ${(props) => props.theme.mq.mobile} {
    font-family: ${(props) => props.theme.fontFamily.h3bold};
    font-size: ${(props) => props.theme.fontSizes.h3};
  }
`;

const Description = styled.div`
  padding-top: 1rem;
  padding-left: 2rem;
  padding-right: 0;
  font-size: ${(props) => props.theme.fontSizes.paragraph};
  color: ${(props) => props.theme.colors.gray500};
  font-family: ${(props) => props.theme.fontFamily.h5};
  text-align: left;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .textRight {
    padding-top: 0.5rem;
    padding-right: 1rem;
    color: ${(props) => props.theme.colors.gray400};
    font-size: ${(props) => props.theme.fontSizes.s1};
    font-family: ${(props) => props.theme.fontFamily.paragraph};

    ${(props) => props.theme.mq.tablet} {
      padding-right: 0;
    }

    ${(props) => props.theme.mq.mobile} {
      font-family: ${(props) => props.theme.fontFamily.s1};
      font-size: ${(props) => props.theme.fontSizes.s1};
    }
  }

  ${(props) => props.theme.mq.tablet} {
    text-align: center;
    padding-left: 1rem;
    padding-right: 1rem;
    flex-direction: column;
  }

  ${(props) => props.theme.mq.mobile} {
    font-family: ${(props) => props.theme.fontFamily.h5};
    font-size: ${(props) => props.theme.fontSizes.paragraph};
  }
`;

const NoContainer = styled.div`
  width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: auto;
  font-size: ${(props) => props.theme.fontSizes.h5};
  color: ${(props) => props.theme.colors.gray500};
  font-family: ${(props) => props.theme.fontFamily.h5};
`;

type UserProps = {
  users: IUserRanking[];
};

function UserRanking({ users }: UserProps) {
  return (
    <Container>
      <Title>
        🔥 <span>열정적인 싸핀러 Top 5</span>
      </Title>
      <Description>
        <p>싸핀을 열심히 이용하는 열.정.적.인 싸핀러들을 소개합니다 😎</p>
        <p className="textRight">매일 오전 08:00 기준</p>
      </Description>

      <PC>
        <RankingContainer size={users.length}>
          {users.length !== 0 &&
            users.map((user, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <RankingUserCard key={i} user={user} />
            ))}
        </RankingContainer>
        {users?.length === 0 && (
          <NoContainer>아직 지도를 만든 유저가 없어요 😥</NoContainer>
        )}
      </PC>

      <LessPC>
        {users.length !== 0 && (
          <>
            <RankingUserCard user={users[0]} type="full" />
            {users.length >= 2 && (
              <RankingContainer>
                {users.map(
                  (user, id) =>
                    id >= 1 && (
                      // eslint-disable-next-line react/no-array-index-key
                      <RankingUserCard key={id} user={user} />
                    ),
                )}
              </RankingContainer>
            )}
          </>
        )}
        {users?.length === 0 && (
          <NoContainer>아직 지도를 만든 유저가 없어요 😥</NoContainer>
        )}
      </LessPC>
    </Container>
  );
}

export default UserRanking;
