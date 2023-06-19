import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoins } from "./api";
import { Helmet } from "react-helmet-async";
import { ICoin } from "./interface";
import Loader from "../components/Loader";

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
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  background-color: ${props => props.theme.cardBgColor};
  color: ${props => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  border: 1px solid white;

  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }

  &:hover {
    a {
      color: ${props => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  color: ${props => props.theme.accentColor};
  font-size: 48px;
`;

const Img = styled.img`
  width: 35px;
  margin-right: 10px;
`;

interface ICoinsProps {
  toggleDark: () => void;
}

function Coins({ toggleDark }: ICoinsProps) {
  const [isDark, setIsDark] = useState(false);
  const { isLoading, data } = useQuery<ICoin>("allCoins", fetchCoins);

  return (
    <Container>
      <Helmet>
        <title>Coins</title>
      </Helmet>
      <Header>
        <Title>Coins</Title>
        <button onClick={toggleDark}>Toggle Mode</button>
      </Header>
      {isLoading ? (
        <Loader />
      ) : (
        <CoinList>
          {data?.Data.map(coin => (
            <Coin key={coin.CoinInfo.Id}>
              <Link
                to={{
                  pathname: `/${coin.CoinInfo.Name}/Chart`,
                  state: { name: coin.CoinInfo.FullName },
                }}>
                <Img src={`https://www.cryptocompare.com${coin.CoinInfo.ImageUrl}`} alt={`${coin.CoinInfo.FullName} symbol`} />
                {coin.CoinInfo.FullName} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}

export default Coins;
