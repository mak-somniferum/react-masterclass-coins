import { Switch, Route, useLocation, useParams, Link, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import Chart from "./Chart";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinPrice } from "./api";
import { Helmet } from "react-helmet-async";
import { ICoinInfo, IPriceInfo } from "./interface";
import OrderBook from "./OrderBook";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const GoBack = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;

  a {
    color: white;
  }
`;

const Title = styled.h1`
  color: ${props => props.theme.accentColor};
  font-size: 48px;
`;

const Loader = styled.span`
  display: block;
  text-align: center;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    &:first-child {
      font-weight: 400;
      font-size: 10px;
      text-transform: uppercase;
      margin-bottom: 5px;
    }
  }
`;

const Description = styled.p`
  margin: 20px 0;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin: 25px 0;
`;

const Tab = styled.div<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-size: 400;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: ${props => (props.isActive ? props.theme.accentColor : props.theme.textColor)};

  &:hover {
    background-color: #000;
  }

  a {
    display: block;
    padding: 10px;
  }
`;

interface RouteParams {
  coinId: string;
}

interface RouteState {
  name: string;
}

function Coin() {
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  const orderBookMatch = useRouteMatch("/:coinId/OrderBook");
  const chartMatch = useRouteMatch("/:coinId/Chart");

  const { isLoading: infoLoading, data: infoDataList } = useQuery<ICoinInfo>(["info", coinId], () => fetchCoinInfo(coinId));
  const { isLoading: priceLoading, data: priceDataList } = useQuery<IPriceInfo>(["price", coinId], () => fetchCoinPrice(coinId));
  const infoData = infoDataList?.Data[coinId];
  const priceData = priceDataList?.RAW[coinId].USD;
  const loading = infoLoading || priceLoading;

  return (
    <Container>
      <Helmet>
        <title>{state?.name ? state.name : loading ? "Loading..." : `${infoData?.CoinName}`}</title>
      </Helmet>
      <Header>
        <GoBack>
          <Link to="/">Back</Link>
        </GoBack>
        <Title>{state?.name ? state.name : loading ? "Loading..." : `${infoData?.CoinName}`}</Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank</span>
              <span>{infoData?.SortOrder}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol</span>
              <span>{infoData?.Name}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price</span>
              <span>${Math.ceil(Number(priceData?.PRICE))}</span>
            </OverviewItem>
          </Overview>

          <Overview>
            <OverviewItem>
              <span>Today High</span>
              <span>{Math.ceil(Number(priceData?.HIGHDAY))}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Today Low</span>
              <span>{Math.ceil(Number(priceData?.LOWDAY))}</span>
            </OverviewItem>
          </Overview>

          <Overview>
            <OverviewItem>
              <span>Market Cap</span>
              <span>{Math.ceil(Number(priceData?.MKTCAP))}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Circulating Supply</span>
              <span>{infoData?.CirculatingSupply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply</span>
              <span>{Math.ceil(Number(infoData?.MaxSupply))}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/Chart`}>Chart</Link>
            </Tab>
            <Tab isActive={orderBookMatch !== null}>
              <Link to={`/${coinId}/OrderBook`}>Order Book</Link>
            </Tab>
          </Tabs>

          <Switch>
            <Route path={`/${coinId}/Chart`}>
              <Chart coinId={coinId} />
            </Route>
            <Route path={`/${coinId}/OrderBook`}>
              <OrderBook coinId={coinId} />
            </Route>
          </Switch>

          <Description>{infoData?.Description}</Description>
        </>
      )}
    </Container>
  );
}

export default Coin;
