
import * as React from "react";

import { create } from "react-test-renderer";

import { DraggableLocation } from "react-beautiful-dnd";

import { Card } from "../src/data/Card";
import { Cribbage, DroppableIds, moveCards } from "../src/Cribbage";

import { createCards } from "./support/cards";

describe("Cribbage", () => {
    it("moves cards between deck and hand as expected", () => {
        const initialDeck = createCards("AS 2H 3H");
        const initialHand = createCards("5H");
        const initialCut = createCards("2S");

        const expectedDeck = [ initialDeck[1], initialDeck[2] ];
        const expectedHand = [ initialHand[0], initialDeck[0] ];

        const source: DraggableLocation = {
            droppableId: DroppableIds.DECK,
            index: 0
        };
        
        const destination: DraggableLocation = {
            droppableId: DroppableIds.HAND,
            index: 1
        };

        const { deck, hand, cut } = moveCards(initialDeck, initialHand, initialCut, source, destination);
        expect(initialDeck).toHaveLength(3); // Does not modify initial array
        expect(deck).toHaveLength(2); // Resulting deck has card removed
        expect(deck).toEqual(expectedDeck);
        expect(deck).not.toEqual(initialDeck);
    });

    it("renders the app", () => {
        const deck = createCards("AS 2H 3H");
        const component = create(<Cribbage deck={deck} />).toJSON();
        expect(component).not.toBe(undefined);
        expect(component).toMatchSnapshot();
    });
});