import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../components/AppContext";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  List,
  ListItem,
  ListItemText,
  TextField,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const SearchFood = () => {
  const { setCurrPage } = useContext(AppContext);
  const [input, setInput] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [results, setResults] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [showError, setShowError] = useState(false);

  const classes = useStyles();

  // Update Navbar title
  useEffect(() => {
    setCurrPage("Search Food");
  }, []);

  useEffect(() => {
    if (results.length == 0 && isMounted) {
      setShowError(true);
    }
  }, [results]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsMounted(true);

    try {
      setIsFetching(true);
      const formattedQuery = input.replace(/ /g, "%20");
      const response = await fetch(
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=kpgGjnKQtqTdZY5sRaJjPbAbfTCaHymb8l327r9d&query=${formattedQuery}`
      );
      const json = await response.json();
      setResults(json.foods);
    } catch (e) {
      console.log(e);
    }
    setIsFetching(false);
  };

  return (
    <Container>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          fullWidth
          placeholder={"Type food here"}
          onChange={handleChange}
          value={input}
          autoFocus
        />
      </form>

      {isFetching ? (
        <div className={classes.spinnerContainer}>
          <CircularProgress />
        </div>
      ) : null}

      {results.length > 0 ? (
        <List className={classes.resultsContainer}>
          {results.map((item, i) => {
            return (
              <Link
                to={{
                  pathname: `/search-food/result/${item.fdcId}`,
                  state: item,
                }}
                key={item.fdcId}
              >
                <ListItem button>
                  <ListItemText>{item.lowercaseDescription}</ListItemText>
                  <ArrowForwardIosIcon
                    style={{ fontSize: "small", color: "#333" }}
                    edge="end"
                  />
                </ListItem>
              </Link>
            );
          })}
        </List>
      ) : null}

      {showError && !isFetching ? (
        <Typography variant="h5" className={classes.centerText}>
          No results found
        </Typography>
      ) : null}
    </Container>
  );
};

export default SearchFood;

const useStyles = makeStyles((theme) => ({
  resultsContainer: {
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "#fff",
  },
  form: {
    marginBottom: "30px",
  },
  spinnerContainer: {
    display: "flex",
    justifyContent: "center",
  },
  centerText: {
    textAlign: "center",
  },
}));
