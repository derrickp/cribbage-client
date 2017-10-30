
import "whatwg-fetch";
import "core-js";

import * as React from "react";
import * as ReactDOM from "react-dom";

import { BasicScorer } from "./data/BasicScorer";
import { calculateScore } from "./support/score";
import { Cribbage } from "./Cribbage";
import { getCards } from "./support/cards";
import { sortByName } from "./data/Card";

getCards().then((cards) => {
    const element = document.getElementById("cribbage");
    const deck = cards.sort(sortByName);
    const scorer = new BasicScorer();
    scorer.calculateScore = calculateScore;
    ReactDOM.render(<Cribbage deck={deck} scorer={scorer} />, element);
});