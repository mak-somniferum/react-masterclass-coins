import ApexChart from "react-apexcharts";
import { IHistorical } from "../../routes/interface";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../../atoms";

interface IProps {
  data: IHistorical | undefined;
}

function LineChart({ data }: IProps) {
  const datas = data?.Data.Data;
  const isDark = useRecoilValue(isDarkAtom);

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
