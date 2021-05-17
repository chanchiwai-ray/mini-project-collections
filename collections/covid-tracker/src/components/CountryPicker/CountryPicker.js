import React, { useState } from "react";

import styles from "./CountryPicker.module.css";
import { Grid, CircularProgress } from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';;

const CountryPicker = ({isLoading, data, onClick}) => {
  const [state, setState] = useState({country: ""});

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value
    });
    onClick(event.target.value);
  };

  return (
    <Grid>
      <FormControl className={styles.formControl}>
        <InputLabel htmlFor="select-country">Select Country</InputLabel>
          {
            isLoading ?
            <CircularProgress /> :
            <NativeSelect
              id="select-country"
              name="country"
              value={state.country}
              onChange={handleChange}
            >
              <option aria-label="None" value="" />
              {
                data.countries.map((country, index) => (
                  <option key={index} value={country.name}>{country.name}</option>
                ))
              }
            </NativeSelect>
          }
      </FormControl>
    </Grid>
  );
};

export default  CountryPicker;