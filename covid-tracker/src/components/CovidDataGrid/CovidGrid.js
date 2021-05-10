import React, { useEffect, useState } from "react";

import styles from "./CovidGrid.module.css";
import { Grid, CircularProgress } from "@material-ui/core";
import { DataGrid } from '@material-ui/data-grid';

const CovidGrid = (props) => {
  const [data, setData] = useState({rows: [], columns: []})

  useEffect(() => {
    if (props.data) {
      let rows = [];
      let columns = [];
      if (props.country === "") {
        rows = [];
        columns = [
          { field: "countryRegion",  headerName: "Country", width: 150},
          { field: "confirmed", headerName: "Confirmed", width: 150},
          { field: "deaths", headerName: "Deaths", width: 150},
          { field: "recovered", headerName: "Recovered", width: 150},
          { field: "lastUpdate", headerName: "Last Update", width: 300},
        ];
        const hashMap = {};
        props.data.forEach(item => {
          if (item.countryRegion in hashMap) {
            hashMap[item.countryRegion].confirmed += item.confirmed;
            hashMap[item.countryRegion].deaths += item.deaths;
            hashMap[item.countryRegion].recovered += item.recovered;
          } else {
            hashMap[item.countryRegion] = {uid: item.uid, lastUpdate: new Date(item.lastUpdate).toLocaleString("en-GB"), countryRegion: item.countryRegion, confirmed: item.confirmed, deaths: item.deaths, recovered: item.recovered};
          }
        });
        // Sort by confirmed cases by default
        Object.keys(hashMap).sort((a, b) => hashMap[b].confirmed - hashMap[a].confirmed).forEach(label => rows.push(hashMap[label]));
      } else {
        rows = props.data.map(item => ({...item, lastUpdate: new Date(item.lastUpdate).toLocaleString("en-GB")}));
        columns = [
          { field: "countryRegion",  headerName: "Country", width: 150},
          { field: "provinceState",  headerName: "Province", width: 150},
          { field: "confirmed", headerName: "Confirmed", width: 150},
          { field: "deaths", headerName: "Deaths", width: 150},
          { field: "recovered", headerName: "Recovered", width: 150},
          { field: "lastUpdate", headerName: "Last Update", width: 300},
        ];
      }
      setData({rows: rows, columns: columns});
    }
  }, [props.data, props.country]);

  return (
      <Grid item xs={12} align="center">
        <div className={styles.grid}>
          {
            props.isLoading ?
            <CircularProgress /> :
            <DataGrid 
              rows={data.rows} 
              columns={data.columns}
              getRowId={(row) => row.uid}
              loading={props.isLoading}
            />
          }
        </div>
      </Grid>
   );
}

export default CovidGrid;