import React, { useEffect, useState } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";
import styles from "./CountryPicker.module.css";
import { fetchCountries } from "../../api/index";

function CountryPicker({ handleCountryChange }) {
  const [fetchedCountries, setFetchedCountries] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      setFetchedCountries(await fetchCountries());
    };
    return fetchAPI();
  }, [setFetchedCountries]);
  return (
    <FormControl className={styles.formControl}>
      <NativeSelect
        defaultValue=""
        onChange={(e) => handleCountryChange(e.target.value)}
      >
        <option value="">Global</option>
        {fetchedCountries.map((country) => (
          <option value={country} key={country}>
            {country}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
}

export default CountryPicker;
