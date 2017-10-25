
import "whatwg-fetch";
import "core-js";

import * as React from "react";
import * as ReactDOM from "react-dom";

import { Cribbage } from "./Cribbage";

const element = document.getElementById("cribbage");

ReactDOM.render(<Cribbage />, element);