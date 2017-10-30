
import { createCard, createCards } from "./support/cards";

import { BasicScorer } from "../src/data/BasicScorer";
import { Hand } from "../src/data/Hand";

describe("BasicScorer", () => {
    it("calls the provided calculator correctly", async () => {
        let called = false;
        const calculator = () => {
            called = true;
            return Promise.resolve(2);
        };
        const hand: Hand = {
            cards: createCards("AS 2H 2C"),
            cut: createCard("6S"),
            isCrib: false
        }
        const scorer = new BasicScorer();
        scorer.calculateScore = calculator;
        scorer.hand = hand;

        await scorer.calculate();
        expect(scorer.total).toEqual(2);
        expect(called).toEqual(true);
    });
})