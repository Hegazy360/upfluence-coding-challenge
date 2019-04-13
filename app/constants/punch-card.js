export const eventSource = new EventSource(
  "https://stream.upfluence.co/stream"
);

const hoursOfDay = {
  "0": 0,
  "1": 0,
  "2": 0,
  "3": 0,
  "4": 0,
  "5": 0,
  "6": 0,
  "7": 0,
  "8": 0,
  "9": 0,
  "10": 0,
  "11": 0,
  "12": 0,
  "13": 0,
  "14": 0,
  "15": 0,
  "16": 0,
  "17": 0,
  "18": 0,
  "19": 0,
  "20": 0,
  "21": 0,
  "22": 0,
  "23": 0
};

export const dataByHourOfDay = {
  0: { ...hoursOfDay },
  1: { ...hoursOfDay },
  2: { ...hoursOfDay },
  3: { ...hoursOfDay },
  4: { ...hoursOfDay },
  5: { ...hoursOfDay },
  6: { ...hoursOfDay }
};

const xAxisCategories = [
  "12am",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12pm",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11"
];

const yAxisCategories = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

export const chartOptions = {
  chart: {
    type: "bubble"
  },

  legend: {
    enabled: false
  },

  title: {
    text: "Social posts traffic"
  },
  subtitle: {
    text:
      "Posts include Instagram, Youtube, Facebook, Articles, Tweets and Pins"
  },
  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 600
        },
        chartOptions: {
          xAxis: {
            labels: {
              step: undefined
            }
          }
        }
      }
    ]
  },
  xAxis: {
    title: {
      text: "Hours"
    },
    labels: {
      step: undefined,
    },
    categories: xAxisCategories,
    showFirstLabel: false
  },

  yAxis: {
    gridLineWidth: 0,
    startOnTick: false,
    endOnTick: false,
    alignTicks: false,
    title: {
      text: "Days"
    },
    categories: yAxisCategories,
    labels: {
      step: 1
    }
  },

  tooltip: {
    useHTML: true,
    headerFormat: "<table>",
    pointFormat: "<tr><th>Number of posts:</th><td>{point.z}</td></tr>",
    footerFormat: "</table>",
    followPointer: true
  }
};
