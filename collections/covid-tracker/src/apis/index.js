import { useEffect, useState } from "react";

const BASE_URL = "https://covid19.mathdro.id/api";

export const useFetch = (endpoint) => {
  const [state, setState] = useState({data: null, isLoading: true});

  useEffect(() => {
    setState((state) => ({data: state.data, isLoading: true}));
    fetch(BASE_URL + endpoint)
    .then(res => res.json())
    .then(data => setState({data: data, isLoading: false}))
    .catch(err => console.log(err));

  }, [endpoint]);

  return state;
};

// /api: global summary
export const useFetchGlobalSummary = () => {
  return useFetch("/");
};

// /api/confirmed: global cases per region sorted by confirmed cases
export const useFetchGlobalConfirmed = () => {
  return useFetch("/confirmed");
};

// /api/recovered: global cases per region sorted by recovered cases
export const useFetchGlobalRecovered = () => {
  return useFetch("/recovered");
};

// /api/deaths: global cases per region sorted by death toll
export const useFetchGlobalDeaths = () => {
  return useFetch("/deaths");
};

// /api/daily: global cases per day
export const useFetchDaily = () => {
  return useFetch("/daily");
};

// /api/daily/[date]: detail of updates in a [date] (e.g. /api/daily/2-14-2020)
export const useFetchDailyAt = (date) => {
  return useFetch(`/daily/${date}`);
};

// /api/countries: all countries and their ISO codes
export const useFetchCountryNames = () => {
  return useFetch("/countries");
};

// /api/countries/[country]: a [country] summary (e.g. /api/countries/Indonesia or /api/countries/USA or /api/countries/CN)
export const useFetchCountrySummary = (name) => {
  return useFetch(`/countries/${name}`);
};

// /api/countries/[country]/confirmed: a [country] cases per region sorted by confirmed cases
export const useFetchCountryConfirmed = (name) => {
  return useFetch(`/countries/${name}/confirmed`);
};

// /api/countries/[country]/recovered: a [country] cases per region sorted by recovered cases
export const useFetchCountryRecovered = (name) => {
  return useFetch(`/countries/${name}/recovered`);
};

// /api/countries/[country]/deaths: a [country] cases per region sorted by death toll
export const useFetchCountryDeaths = (name) => {
  return useFetch(`/countries/${name}/deaths`);
};