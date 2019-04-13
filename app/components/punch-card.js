import Component from "@ember/component";
import moment from "moment";
import {
  dataByHourOfDay,
  chartOptions,
  eventSource
} from "../constants/punch-card";

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
    var { refreshing, refreshRate, initialRender } = this;
    var graphCoordinates = [];

    eventSource.onmessage = event => {
      this.updateGraphCoordinates(event.data, graphCoordinates);
      if (initialRender) {
        props.setProperties({
          chartData: graphCoordinates,
          initialRender: false
        });
      }
    };

    if (refreshing) {
      setTimeout(() => {
        props.setProperties({
          chartData: graphCoordinates
        });
      }, refreshRate * 1000);
    }
  },

  updateGraphCoordinates(data, graphCoordinates) {
    var { dataByHourOfDay } = this;
    const postObject = JSON.parse(data);
    const postType = Object.keys(postObject)[0];
    const timestamp = postObject[postType].timestamp;
    const timestampDay = moment(timestamp).day();
    const timestampHour = parseInt(moment(timestamp).format("H"));
    const dataDayObject = dataByHourOfDay[timestampDay];
    var days = Object.keys(dataByHourOfDay);
    dataDayObject[timestampHour] = dataDayObject[timestampHour] + 1;

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
  },

  actions: {
    stopRefreshing() {
      this.setProperties({ refreshing: false });
      eventSource.close();
    }
  }
});
