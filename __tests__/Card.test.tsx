import * as React from "react";
import { Card } from "../src/components/Card";
import { Card as DataCard } from "../src/data/Card";
import { create } from "react-test-renderer";
import { shallow, mount } from "enzyme";

describe("Card", () => {
    it("renders as expected", () => {
        const card: DataCard = {
            fullName: "ace of spades",
            name: "ace",
            suit: "spades",
            image: "",
            key: "AS"
        };
        const component = create(<Card card={card} />).toJSON();
        expect(component).toMatchSnapshot();
    });
});