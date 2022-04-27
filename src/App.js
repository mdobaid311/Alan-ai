import alanBtn from "@alan-ai/alan-sdk-web";
import { useEffect, useState } from "react";
import wordsToNumbers from "words-to-numbers";
import img from "./img.jpg";
import NewsCards from "./components/newsCards/NewsCards";
import useStyles from "./styles.js";
import Header from "./components/Header/Header";
import Homepage from "./components/Homepage/Homepage";

const alanKey =
  "20b2aaf3c7369ed55ab11bc67ea35ff42e956eca572e1d8b807a3e2338fdd0dc/stage";

const newsApiKey = "1f1f894c948d466887a38530aefa0739";

function App() {
  const classes = useStyles();
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);
  const [category, setCategory] = useState("");
  const [alanSearch, setAlanSearch] = useState(false);

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if (command === "newHeadlines") {
          console.log(articles);
          setNewsArticles(articles);
          setAlanSearch(true);
        } else if (command === "highlight") {
          setActiveArticle((prevActiveArticle) => {
            return prevActiveArticle + 1;
          });
        } else if (command === "open") {
          const parsedNumber =
            number.length > 2 ? wordsToNumbers(number) : number;
          const article = articles[parsedNumber - 1];
          if (parsedNumber > 20) {
            alanBtn().playText("Please try that again");
          } else if (article) {
            window.open(articles[parsedNumber].url, "_blank");
            alanBtn().playText("Opening...");
          }
        }
      },
    });
  }, []);

  const categorySearchHandler = async (category) => {
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=in&apiKey=${newsApiKey}`
    );
    const data = await res.json();
    setNewsArticles(data.articles);
  };
  useEffect(() => {
    categorySearchHandler("news");
  }, []);

  return (
    <div>
      <Header />
      {!alanSearch ? (
        <Homepage setAlanSearch={setAlanSearch} articles={newsArticles} />
      ) : (
        <NewsCards articles={newsArticles} activeArticle={activeArticle} />
      )}
    </div>
  );
}

export default App;
