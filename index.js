const periods = [...new Set(data.map(({ period }) => period))];
const uniqueNames = [...new Set(data.map(({ name }) => name))];

const getValuesByName = (seriesName) =>
  data.filter((item) => item.name === seriesName).map(({ value }) => value);

const getSeries = (series) => [
  {
    name: uniqueNames[0],
    type: "bar",
    stack: "x",
    data: getValuesByName(uniqueNames[0]),
    itemStyle: { color: "#56B9F2" },
    label: {
      show: series?.[uniqueNames[0]] && !series?.[uniqueNames[1]],
      position: "top",
      formatter: (params) => params.value,
    },
  },
  {
    name: uniqueNames[1],
    type: "bar",
    stack: "x",
    data: getValuesByName(uniqueNames[1]),
    itemStyle: { color: "#0078D2" },
    label: {
      show: true,
      position: "top",
      formatter: (params) => {
        if (series?.[params.seriesName] && series?.[uniqueNames[0]]) {
          return (
            params.value + getValuesByName(uniqueNames[0])[params.dataIndex]
          );
        }
        return params.value;
      },
    },
  },
  {
    name: uniqueNames[2],
    type: "bar",
    stack: "y",
    data: getValuesByName(uniqueNames[2]),
    itemStyle: { color: "#22C38E" },
    label: {
      show: series?.[uniqueNames[2]] && !series?.[uniqueNames[3]],
      position: "top",
      formatter: (params) => params.value,
    },
  },
  {
    name: uniqueNames[3],
    type: "bar",
    stack: "y",
    data: getValuesByName(uniqueNames[3]),
    itemStyle: { color: "#00724C" },
    label: {
      show: true,
      position: "top",
      formatter: (params) => {
        if (series?.[params.seriesName] && series?.[uniqueNames[2]]) {
          return (
            params.value + getValuesByName(uniqueNames[2])[params.dataIndex]
          );
        }
        return params.value;
      },
    },
  },
];

const option = {
  tooltip: {
    trigger: "axis",
    showContent: "true",
    formatter: (params) => changeTooltip(params),
  },
  legend: {
    orient: "horizontal",
    top: "bottom",
    data: uniqueNames,
    icon: "pin",
  },
  xAxis: {
    data: periods,
  },
  yAxis: {},
};

const myChart = echarts.init(document.getElementById("main"));

myChart.setOption({
  ...option,
  series: getSeries(
    uniqueNames.reduce((acc, cur) => {
      acc[cur] = true;
      return acc;
    }, {})
  ),
});

myChart.on("legendselectchanged", (event) => {
  myChart.setOption({
    series: getSeries(event.selected),
  });
});
