import alanBtn from "@alan-ai/alan-sdk-web";
import { useEffect, useState } from "react";

import wordsToNumbers from "words-to-numbers";

import img from "./img.jpg"

import NewsCards from "./components/newsCards/NewsCards";
import useStyles from "./styles.js";
const alanKey =
  "20b2aaf3c7369ed55ab11bc67ea35ff42e956eca572e1d8b807a3e2338fdd0dc/stage";

function App() {
  const classes = useStyles();
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);
  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if (command === "newHeadlines") {
          console.log(articles);
          setNewsArticles(articles);
        } else if (command === "highlight") {
          setActiveArticle((prevActiveArticle) => {
            return prevActiveArticle + 1;
          });
        } else if (command === "open") {
          const parsedNumber =
            number.length > 2 ? wordsToNumbers(number) : number;
          const article = articles[parsedNumber - 1];
          if (parsedNumber > 20) {
            alanBtn().playText("Please try that again")
          } else if (article) {
            window.open(articles[parsedNumber].url, "_blank");
            alanBtn().playText("Opening...")
          }
        }
      },
    });
  }, []);
  return (
    <div>
      <div className={classes.logoContainer}>
        <img
          src={img}
          className={classes.alanLogo}
          alt="logo"
        />
      </div>

      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  );
}

export default App;
