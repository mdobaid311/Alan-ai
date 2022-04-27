import React, { useEffect, useState } from "react";
import NewsCard from "../NewsCard/NewsCard";
import { Grid, Grow, Typography } from "@material-ui/core";
import Marquee from "react-fast-marquee";
import "./styles.css";

import useStyles from "./styles.js";

const Homepage = ({ articles }) => {
  const classes = useStyles();
  console.log(articles);
  const [index, setIndex] = useState(0);

  const timeout = setTimeout(() => {
    if (index >= 20) {
      index = 0;
    } else {
      setIndex(index + 1);
    }
  }, 10000);

  useEffect(() => {
    return () => clearInterval(timeout);
  }, []);

  return (
    <div className="homepage-container">
      <div className="trending">
        <span>Trending Now </span>
        <Marquee pauseOnHover={true} gradient={false} speed={50} className="marquee-container">
          {articles.map((article, i) => {
            return (
              <span className="marquee-text" key={i}>
                <a href={article.url} target="_blank">{article.title}</a>
              </span>
            );
          })}
        </Marquee>
      </div>
      <Grow in>
        <Grid className={classes.container} container alignItems="stretch">
          {articles?.map((article, i) => {
            return (
              <Grid
                key={i}
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                style={{ display: "flex" }}
              >
                <NewsCard article={article} i={i} />
              </Grid>
            );
          })}
        </Grid>
      </Grow>
    </div>
  );
};

export default Homepage;
