import React, { useEffect, useState } from "react";

import { Grid, CircularProgress } from "@material-ui/core";

import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";
const Plot = createPlotlyComponent(Plotly);

const colorMap = {"confirmed": "rgb(255,109,0)", "deaths": "rgb(213,0,0)", "recovered": "rgb(100,221,23)"};

const CovidChart = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (props.data) {
      const data = Object.keys(colorMap).map(name => ({
        x: [],
        y: [],
        width: .3,
        name: name,
        type: "bar",
        orientation: 'h',
        marker: {color: colorMap[name]},
      }));
      if (props.country === "") {
        const hashMap = {};
        props.data.forEach(item => {
          if (item.countryRegion in hashMap) {
            hashMap[item.countryRegion].confirmed += item.confirmed;
            hashMap[item.countryRegion].deaths += item.deaths;
            hashMap[item.countryRegion].recovered += item.recovered;
          } else {
            hashMap[item.countryRegion] = {confirmed: item.confirmed, deaths: item.deaths, recovered: item.recovered};
          }
        });
        const labels = Object.keys(hashMap).sort((a, b) => Object.values(hashMap[a]).reduce((x,y) => x+y) - Object.values(hashMap[b]).reduce((x,y) => x+y));
        labels.forEach(label => {
          data.forEach((bar, i) => {
            bar.y.push(label);
            bar.x.push(hashMap[label][bar.name.toLowerCase()]);
          });
        });
      } else {
        props.data.forEach(item => {
          const label = item.provinceState || item.countryRegion;
          data.forEach(bar => {
            const name = bar.name;
            bar.x.unshift(item[name]);
            bar.y.unshift(label);
          });
        });
      }
      setData(data);
    }
  }, [props.data, props.country]);

  return (
    <React.Fragment>
      <Grid item xs={12} align="center">
        {
          props.isLoading ?
          <CircularProgress /> :
          <Plot
            data={data}
            layout={{
              height: 1000,
              width: 1000,
              margin: {
                l: 120
              },
              type: "bar",
              orientation: 'h',
              barmode: "stack",
              title: props.country === "" ? 
                    `Summary of Global Cases` : 
                    `Summary of ${props.country}'s Cases`,
            }}
          /> 
        }
      </Grid>
    </React.Fragment>
   );
}

export default CovidChart;