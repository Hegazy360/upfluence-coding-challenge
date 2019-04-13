import Component from "@ember/component";
import moment from "moment";

const es = new EventSource("https://stream.upfluence.co/stream");
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

const dataByHourOfDay = {
  0: { ...hoursOfDay },
  1: { ...hoursOfDay },
  2: { ...hoursOfDay },
  3: { ...hoursOfDay },
  4: { ...hoursOfDay },
  5: { ...hoursOfDay },
  6: { ...hoursOfDay }
};
const chartOptions = {
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
      step: 1
    },
    categories: [
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
    ],
  },

  yAxis: {
    gridLineWidth: 0,
    startOnTick: false,
    endOnTick: false,
    title: {
      text: "Days"
    },
    categories: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
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

export default Component.extend({
  init() {
    this._super(...arguments);
    this.setProperties({
      chartData: [],
      chartOptions,
      dataByHourOfDay,
      refreshing: true,
      refreshRate: 3,
      initialRender: true
    });
  },
  willRender() {
    var props = this;
    var { dataByHourOfDay, refreshing, refreshRate, initialRender } = props;
    var graphCoordinates = [];

    es.onmessage = event => {
      const postObject = JSON.parse(event.data);
      const postType = Object.keys(postObject)[0];
      const timestamp = postObject[postType].timestamp;
      const timestampDay = moment(timestamp).day();
      const timestampHour = parseInt(moment(timestamp).format("H"));
      const dataDayObject = dataByHourOfDay[timestampDay];
      dataDayObject[timestampHour] = dataDayObject[timestampHour] + 1;

      var days = Object.keys(dataByHourOfDay);
      days.map(day => {
        var hours = dataByHourOfDay[day];
        Object.keys(hours).map(hour => {
          if (dataByHourOfDay[day][hour] > 0) {
            graphCoordinates.pushObject({
              data: [
                {
                  x: parseInt(hour),
                  y: parseInt(day),
                  z: dataByHourOfDay[day][hour]
                }
              ]
            });
          }
        });
      });
      if (initialRender) {
        props.setProperties({
          chartData: graphCoordinates,
          initialRender: false
        });
      }
    };
    if (refreshing) {
      setTimeout(() => {
        props.setProperties({ chartData: graphCoordinates });
      }, refreshRate * 1000);
    }
  },
  actions: {
    stopRefreshing() {
      this.setProperties({ refreshing: false });
      es.close();
    }
  }
});
