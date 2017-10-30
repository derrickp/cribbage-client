
import "whatwg-fetch";
import "core-js";

import * as React from "react";
import * as ReactDOM from "react-dom";

import { Cribbage } from "./Cribbage";
import { getCards } from "./api/cards";

getCards().then((deck) => {
    const element = document.getElementById("cribbage");
    ReactDOM.render(<Cribbage deck={deck} />, element);
});