
import "whatwg-fetch";
import "core-js";

import * as React from "react";
import * as ReactDOM from "react-dom";

import { calculateScore } from "./api/score";
import { Cribbage } from "./Cribbage";
import { getCards } from "./api/cards";
import { sortByName } from "./data/Card";

getCards().then((cards) => {
    const element = document.getElementById("cribbage");
    const deck = cards.sort(sortByName);
    ReactDOM.render(<Cribbage deck={deck} calculateScore={calculateScore} />, element);
});