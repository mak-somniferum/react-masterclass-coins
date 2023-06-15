import { useState } from "react";
import { useQuery } from "react-query";
import { fetchOrderBook } from "./api";
import { IOrderBook } from "./interface";
import styled from "styled-components";
import Loader from "../components/Loader";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const ListContainer = styled.div`
  flex: 1;
`;

const ListTitle = styled.h5`
  text-align: center;
  padding: 10px 0;
  font-size: 12px;
  font-weight: 600;
  background-color: rgba(0,0,0,0.5);
`;

const Category = styled.ul`
  display: flex;
  background-color: rgba(0, 0, 0, 0.5);

  li {
    flex: 1;
    text-align: center;
    padding: 0 0 8px;
    font-size: 11px;
    opacity: 0.7;
  }
`;

const ListWrap = styled.div`
  max-height: 192px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
`;

const ListItem = styled.li`
  display: flex;
  background-color: rgba(0, 0, 0, 0.25);
  padding: 10px 0;
  font-size: 12px;

  &:nth-of-type(even) {
    background-color: rgba(0, 0, 0, 0.5);
  }

  span {
    flex: 1;
    text-align: center;
  }
`;

const Info = styled.p`
  margin: 10px 0;
  font-size: 11px;
  opacity: 0.7;
`;
interface OrderBookProps {
  coinId: string;
}
interface IBtnProps {
  isActive: boolean;
  value: string;
}

function OrderBook({ coinId }: OrderBookProps) {
  const [type, setType] = useState("bid");
  const { isLoading, data } = useQuery<IOrderBook>(["orderbook", coinId], () => fetchOrderBook(coinId), {
    refetchInterval: 10000,
  });
  const bid = data?.Data.BID;
  const ask = data?.Data.ASK;

  const changeType = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setType(value);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Info>Market: {data?.Data.M} &#124; Cache duration: 10s</Info>
          <Container>
            <ListContainer>
              <ListTitle>BID</ListTitle>
              <Category>
                <li>Price</li>
                <li>Quantity</li>
              </Category>
              <ListWrap>
                <List>
                  {bid?.map((trade, i) => {
                    return (
                      <ListItem key={i}>
                        <span>{trade.P}</span>
                        <span>{trade.Q}</span>
                      </ListItem>
                    );
                  })}
                </List>
              </ListWrap>
            </ListContainer>

            <ListContainer>
              <ListTitle>ASK</ListTitle>
              <Category>
                <li>Price</li>
                <li>Quantity</li>
              </Category>
              <ListWrap>
                <List>
                  {ask?.map((trade, i) => {
                    return (
                      <ListItem key={i}>
                        <span>{trade.P}</span>
                        <span>{trade.Q}</span>
                      </ListItem>
                    );
                  })}
                </List>
              </ListWrap>
            </ListContainer>
          </Container>
        </div>
      )}
    </>
  );
}

export default OrderBook;
