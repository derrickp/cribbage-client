
import * as React from "react";

import { create } from "react-test-renderer";

import { Score } from "../src/components/Score";

describe("Score", () => {
    it("renders the score", () => {
        const component = create(<Score score={2} />).toJSON();
        expect(component).not.toBe(undefined);
        expect(component).toMatchSnapshot();
    });
});