import React, { SFC } from "react";
import "./Press.css";
import { RouteComponentProps } from "react-router";
import { useGetRequest } from "../../../../hooks/useRequest";

import NewsList, { Types } from "../../NewsList/NewsList";
import PressTop from "./PressTop";
import PressItem from "./PressItem";

interface MatchParams {
  name: string;
}

const Press: SFC<RouteComponentProps<MatchParams>> = ({ match }) => {
  const { name } = match.params;

  const [response, loading, error] = useGetRequest(
    `${process.env["REACT_APP_BACKEND_SERVER"]}/press/${name}`
  );

  if (loading) return <div>loading...</div>;
  if (error) return <div>error!</div>;

  if (!response) return null;
  const { pressId, followCnt, newsCnt, recentTopic } = response.data;

  return (
    <div className="PressComponentWrapper">
      <div className="PressComponent">
        <PressTop name={name} pId={pressId} />
        <div className="pInfo">
          <PressItem
            icon="fas fa-thumbs-up"
            data={followCnt + "명"}
            exp="이 언론사를 팔로우 하는 사람들"
          />
          <PressItem
            icon="fas fa-newspaper"
            data={newsCnt + "개"}
            exp="이 언론사의 기사 개수"
          />
          <PressItem
            icon="fas fa-comments"
            data={recentTopic}
            exp="이 언론사가 최근 자주 다루는 주제"
          />
        </div>
      </div>
      <NewsList type={Types.ONLYPRESS} name={name} />
    </div>
  );
};

export default Press;
