import ApexChart from "react-apexcharts";
import { IHistorical } from "../../routes/interface";

interface IProps {
  data: IHistorical | undefined;
  isDark: boolean;
}

function LineChart({ data, isDark }: IProps) {
  const datas = data?.Data.Data;
  return (
    <ApexChart
      type="line"
      series={[
        {
          name: "Closing Price",
          data: datas?.map(priceInfo => Number(priceInfo.close)) ?? [],
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
          categories: datas?.map(priceInfo => priceInfo.time * 1000),
        },
        chart: {
          toolbar: { show: true },
          width: 500,
          height: 300,
          background: "transparent",
        },
        stroke: {
          curve: "smooth",
          width: 3,
        },
      }}
    />
  );
}

export default LineChart;
