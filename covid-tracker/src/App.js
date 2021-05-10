import React, { useState } from "react";

import { Container, Grid, Typography, Button, ButtonGroup } from "@material-ui/core";

import styles from "./App.module.css";
import Cards from "./components/Cards/Cards";
import CovidGrid from "./components/CovidDataGrid/CovidGrid";
import CovidChart from "./components/CoividDataChart/CovidChart";
import CountryPickers from "./components/CountryPicker/CountryPicker";

import { useFetch, useFetchCountryNames } from "./apis";


const App = () => {
  const [view, setView] = useState("graph");
  const [country, setCountry] = useState("");
  const countries = useFetchCountryNames();
  const summary = useFetch(country === "" ? "/" : `/countries/${country}`);
  const countrySummary = useFetch(country === "" ? "/confirmed" : `/countries/${country}/confirmed`);

  const selectCountry = (country) => {
    setCountry(country);
  };

  return (
    <Container className={styles.container}>
      <Grid>
        <Typography align="center" variant="h3" className={styles.heading}>
          COVID-19 Case Summary
        </Typography>
      </Grid>
      <Grid container justify="center" >
        <CountryPickers isLoading={countries.isLoading} data={countries.data} onClick={selectCountry} />
      </Grid>
      <Grid container justify="center" >
        <Cards isLoading={summary.isLoading} data={summary.data}/>
      </Grid>
      <Grid container justify="center">
        <ButtonGroup variant="text" color="primary" aria-label="text primary button group" className={styles.buttonGroup}>
          <Button onClick={() => setView("table")}>Table</Button>
          <Button onClick={() => setView("graph")}>Graph</Button>
        </ButtonGroup>
      </Grid>
      <Grid container justify="center" >
          {
            view === "graph" ?
            <CovidChart 
              isLoading={countrySummary.isLoading}
              data={countrySummary.data} 
              country={country} 
            /> :
            <CovidGrid
              isLoading={countrySummary.isLoading}
              data={countrySummary.data} 
              country={country} 
            />
          }
      </Grid>
    </Container>
  );
};

export default App;