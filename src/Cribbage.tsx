
import * as React from "react";

import * as classNames from "classnames";
import { DragDropContext, DropResult, DraggableLocation } from 'react-beautiful-dnd';

import { Card, sortByName, sortBySuit, sortOptions } from "./data/Card";
import { Option } from "./data/Option";
import { CardBucket } from "./components/CardBucket";
import { Common } from "./classes";

import { calculateScore } from "./api/score";
import { getCards } from "./api/cards";

export interface CribbageProps { }

export interface CribbageState {
    deck: Card[];
    sortOption: Option;
    hand: Card[];
    cut: Card[];
    isCrib: boolean;
    score: number;
}

export class Cribbage extends React.Component<CribbageProps, CribbageState> {
    constructor(props: CribbageProps) {
        super(props);
        const nameSortOption = sortOptions.find(option => option.value === "name");
        this.state = {
            deck: [],
            hand: [],
            cut: [],
            isCrib: false,
            score: 0,
            sortOption: nameSortOption
        };

        this.onDragEnd = this.onDragEnd.bind(this);
        this.calculateScore = this.calculateScore.bind(this);
        this.toggleIsCrib = this.toggleIsCrib.bind(this);
        this.sortCards = this.sortCards.bind(this);
    }

    async componentWillMount() {
        const deck = (await getCards()).sort((a, b) => sortByName(a, b));

        if (deck && deck.length) {
            this.setState({
                deck
            });
        }
    }

    async calculateScore() {
        const score = await calculateScore(this.state.hand, this.state.cut[0], this.state.isCrib);
        this.setState({
            score
        });
    }

    onDragEnd(result: DropResult) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const { deck, hand, cut } = moveCards(
            this.state.deck,
            this.state.hand,
            this.state.cut,
            result.source,
            result.destination
        );

        const sortFunc = this.state.sortOption.value === "name" ? sortByName : sortBySuit;
        const sortedDeck = deck.sort(sortFunc);

        this.setState({
            cut,
            hand,
            deck: sortedDeck,
        });
    }

    toggleIsCrib(event: React.ChangeEvent<HTMLInputElement>) {
        const isCrib = !this.state.isCrib;
        this.setState({
            isCrib
        });
    }

    sortCards(sortOption: Option, id: string) {
        let sortFunc: (a: Card, b: Card) => number = sortOption.value === "name" ? sortByName : sortBySuit;
        const deck = Array.from(this.state.deck).sort(sortFunc)
        this.setState({
            deck,
            sortOption
        });
    }

    render() {
        if (!this.state.deck || this.state.deck.length <= 0) {
            return <div>Loading deck...</div>;
        }

        const className = classNames(Classes.APP);
        const handError = this.state.hand.length > 4 ? Common.ERROR : "";
        const cutError = this.state.cut.length > 1 ? Common.ERROR : "";
        const calcDisabled = handError !== "" || cutError !== "" || this.state.hand.length === 0;
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div className={className}>
                    <CardBucket key={DroppableIds.DECK} id={DroppableIds.DECK} name="Deck (available cards)" cards={this.state.deck} sortCards={this.sortCards} sortEnabled={true} sortOptions={sortOptions} sortValue={this.state.sortOption}>
                    </CardBucket>
                    <CardBucket key={DroppableIds.HAND} id={DroppableIds.HAND} name="Hand (max: 4)" cards={this.state.hand} additionalClass={handError} sortCards={this.sortCards} sortEnabled={false}>
                    </CardBucket>
                    <CardBucket key={DroppableIds.CUT} id={DroppableIds.CUT} name="Cut Card (max: 1)" cards={this.state.cut} additionalClass={cutError} sortEnabled={false}>
                    </CardBucket>
                    <div className={Classes.SCORE_CONTAINER}>
                        <label><input type="checkbox" checked={this.state.isCrib} onChange={this.toggleIsCrib}></input>Crib?</label>
                        <button disabled={calcDisabled} className={Classes.SCORE_BUTTON} onClick={this.calculateScore}>Get Score</button>
                        {<div className={Classes.SCORE}>{`Your current score is ${this.state.score}`}</div>}
                    </div>
                </div>
            </DragDropContext>
        );
    }
}

enum DroppableIds {
    DECK = "deck",
    HAND = "hand",
    CUT = "cut"
};

export enum Classes {
    APP = "app",
    SCORE_BUTTON = "score-button",
    SCORE = "score",
    SCORE_CONTAINER = "score-container"
};

// a little function to help us with reordering the result
function moveCards(initialDeck: Card[], initialHand: Card[], initialCut: Card[], sourceLocation: DraggableLocation, destinationLocation: DraggableLocation) {
    // Make a copy of our arrays
    const deck = Array.from(initialDeck);
    const hand = Array.from(initialHand);
    const cut = Array.from(initialCut);

    let sourceIndex: number = sourceLocation.index;
    let destinationIndex: number = destinationLocation.index;

    let moved: Card;

    // Find the card that has been moved.
    // Splice it out of the list it was in.
    switch (sourceLocation.droppableId) {
        case DroppableIds.DECK:
            moved = deck.splice(sourceIndex, 1)[0];
            break;
        case DroppableIds.HAND:
            moved = hand.splice(sourceIndex, 1)[0];
            break;
        case DroppableIds.CUT:
            moved = cut.splice(sourceIndex, 1)[0];
            break;
    }

    // Add it to the list it's going in
    switch (destinationLocation.droppableId) {
        case DroppableIds.DECK:
            deck.splice(destinationIndex, 0, moved);
            break;
        case DroppableIds.HAND:
            hand.splice(destinationIndex, 0, moved);
            break;
        case DroppableIds.CUT:
            cut.splice(destinationIndex, 0, moved);
            break;
    }

    return {
        deck,
        hand,
        cut
    }
}