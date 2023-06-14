import { useQuery } from "react-query";
import { fetchCoinPrice } from "./api";
import styled from "styled-components";

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

interface PriceProps {
  coinId: string;
}

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery(["price", coinId], () => fetchCoinPrice(coinId));
  const priceData = data?.RAW[coinId].USD;

  return (
    <div>
      {isLoading ? (
        "Loading data..."
      ) : (
        <Overview>
          <OverviewItem>
            <span>Market Cap</span>
            <span>{priceData?.MKTCAP}</span>
          </OverviewItem>
          <OverviewItem>
            <span>Max Supply</span>
            {/* <span>{Math.ceil(Number(infoData?.Data[coinId].MaxSupply))}</span> */}
          </OverviewItem>
        </Overview>
      )}
    </div>
  );
}

export default Price;
