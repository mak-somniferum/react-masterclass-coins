import { useQuery } from "react-query";
import { fetchCoinHistory } from "./api";
import ApexChart from "react-apexcharts";
interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: string;
}
interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId));

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: "Price",
              data:
                data?.map(priceInfo => {
                  const obj = {
                    x: new Date(priceInfo.time_close * 1000),
                    y: [Number(priceInfo.open), Number(priceInfo.high), Number(priceInfo.low), Number(priceInfo.close)],
                  };
                  return obj;
                }) ?? [],
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              type: "datetime",
              categories: data?.map(time => time.time_close * 1000),
            },
            chart: {
              toolbar: { show: false },
              width: 500,
              height: 300,
              background: "transparent",
            },
            tooltip: { y: { formatter: value => `$ ${value.toFixed(3)}` } },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
