import React from "react";

import styles from "./Cards.module.css";
import { Card, CardContent, Typography, Grid, CircularProgress } from "@material-ui/core";
import { useCountUp } from 'react-countup';

const Counter = ({end, duration}) => {
  const { countUp } = useCountUp({
    start: 0,
    end: end,
    duration: duration,
    separator: ","
  });

  return (
    <span>{countUp}</span>
  );
};

const NumCard = (props) => {
  return (
    <Card className={styles.container}>
      <CardContent style={{borderBottom: `8px solid ${props.gutterColor}`}}>
        <Typography color="textSecondary">{props.title}</Typography>
        <Typography variant="h3" style={{"color": props.textColor}}>
          <Counter end={props.num} duration={1} />
        </Typography>
        <Typography color="textSecondary">{new Date(props.date).toLocaleString("en-GB")}</Typography>
      </CardContent>
    </Card>
  );
};

const Cards = (props) => {
  return (
    <React.Fragment>
      <Grid item xs={12} sm={4} align="center">
        {
          props.isLoading ?
          <CircularProgress /> :
          <NumCard title="Confirmed" textColor="#ff6d00" gutterColor="#ff6d00" num={props.data.confirmed.value} date={props.data.lastUpdate} />
        }
      </Grid>
      <Grid item xs={12} sm={4} align="center">
        {
          props.isLoading ?
          <CircularProgress /> :
          <NumCard title="Deaths" textColor="#d50000" gutterColor="#d50000" num={props.data.deaths.value} date={props.data.lastUpdate} />
        }
      </Grid>
      <Grid item xs={12} sm={4} align="center">
        {
          props.isLoading ?
          <CircularProgress /> :
          <NumCard title="Recovered" textColor="#64dd17" gutterColor="#64dd17" num={props.data.recovered.value} date={props.data.lastUpdate} />
        }
      </Grid>
    </React.Fragment>
  );
};

export default Cards;