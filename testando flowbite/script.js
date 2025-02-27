const options = {
  series: [
    {
      name: "Feitas",
      data: [0, 0, 15, 17, 20, 28, 42, 52, 60],
      color: "#3B5A1A",
    },
    {
      name: "A fazer",
      data: [60, 60, 45, 43, 40, 32, 18, 8, 0],
      color: "#DD1155",
    },
  ],
  chart: {
    height: "300px",
    maxWidth: "100%",
    type: "area",
    fontFamily: "Inter, sans-serif",
    toolbar: {
      show: true,
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      opacityFrom: 0.55,
      opacityTo: 0,
    },
  },
  stroke: {
    width: 6,
  },
  xaxis: {
    categories: [
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
    ],
    labels: {
      style: {
        colors: "#FFFFFF",
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: "#FFFFFF",
      },
    },
  },
  dataLabels: {
    enabled: true,
    style: {
      colors: ["#3B5A1A", "#dd1155"], // "Feitas" texto branco, "A fazer" texto azul
    },
    background: {
      enabled: true,
      colors: ["#dd1155", "#3B5A1A"], // "Feitas" fundo azul, "A fazer" fundo branco
    },
  },
};

if (document.getElementById("data-series-chart")) {
  const chart = new ApexCharts(
    document.getElementById("data-series-chart"),
    options
  );
  chart.render();
}