import ApexChart from "react-apexcharts";
import { IHistorical } from "../../routes/interface";

interface IProps {
  data: IHistorical | undefined;
  isDark: boolean;
}

function CandlestickChart({ data, isDark }: IProps) {
  const datas = data?.Data.Data;
  return (
    <ApexChart
      type="candlestick"
      series={[
        {
          name: "Price",
          data:
            datas?.map(priceInfo => {
              const obj = {
                x: new Date(priceInfo.time * 1000),
                y: [Number(priceInfo.open), Number(priceInfo.high), Number(priceInfo.low), Number(priceInfo.close)],
              };
              return obj;
            }) ?? [],
        },
      ]}
      options={{
        theme: {
          mode: isDark ? "dark" : "light",
        },
        yaxis: {
          show: true,
          labels: {
            formatter: value => {
              return value.toFixed(0);
            },
          },
        },
        xaxis: {
          type: "datetime",
          categories: datas?.map(time => time.time * 1000),
        },
        chart: {
          toolbar: { show: true },
          width: 500,
          height: 300,
          background: "transparent",
        },
      }}
    />
  );
}

export default CandlestickChart;
