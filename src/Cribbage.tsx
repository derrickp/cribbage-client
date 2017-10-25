
import * as React from "react";

import * as classNames from "classnames";
import { DragDropContext, DropResult, DraggableLocation } from 'react-beautiful-dnd';

import { Card } from "./data/Card";
import { CardBucket } from "./components/CardBucket";
import { getCards } from "./api/cards";

export interface CribbageProps { }

export interface CribbageState {
    deck: Card[];
    hand: Card[];
    cut: Card[];
    isCrib: boolean;
}

export class Cribbage extends React.Component<CribbageProps, CribbageState> {

    constructor(props: CribbageProps) {
        super(props);
        this.state = {
            deck: [],
            hand: [],
            cut: [],
            isCrib: false
        };

        this.onDragEnd = this.onDragEnd.bind(this);
    }

    async componentWillMount() {
        const deck = await getCards();
        if (deck && deck.length) {
            this.setState({
                deck
            });
        }
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

        this.setState({
            deck,
            hand,
            cut
        });
    }

    render() {
        if (!this.state.deck || this.state.deck.length <= 0) {
            return <div>Loading deck...</div>;
        }

        const className = classNames(CribbageClasses.APP);
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div className={className}>
                    <CardBucket key={DroppableIds.DECK} id={DroppableIds.DECK} name="Deck (available cards)" cards={this.state.deck}>
                    </CardBucket>
                    <CardBucket key={DroppableIds.HAND} id={DroppableIds.HAND} name="Hand (max: 4)" cards={this.state.hand} maxSize={4}>
                    </CardBucket>
                    <CardBucket key={DroppableIds.CUT} id={DroppableIds.CUT} name="Cut Card (max: 1)" cards={this.state.cut} maxSize={1}>
                    </CardBucket>
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

export enum CribbageClasses {
    APP = "app"
};

// a little function to help us with reordering the result
function moveCards(initialDeck: Card[], initialHand: Card[], initialCut: Card[], sourceLocation: DraggableLocation, destinationLocation: DraggableLocation) {
    // Make a copy of our arrays
    const deck = Array.from(initialDeck);
    const hand = Array.from(initialHand);
    const cut = Array.from(initialCut);

    let sourceIndex: number = sourceLocation.index;
    let destinationIndex: number = destinationLocation.index;
    let leftOver: Card;
    // If we are pushing into our hand or cut, and it is larger than we want, remove the "last" card
    // However, we want to ignore this if the source and destination match (then it's just a reorder)
    if (hand.length === 4 && destinationLocation.droppableId === DroppableIds.HAND && destinationLocation.droppableId !== sourceLocation.droppableId) {
        leftOver = hand.pop();
        if (destinationIndex === 4) destinationIndex--;
    } else if (cut.length === 1 && destinationLocation.droppableId === DroppableIds.CUT && destinationLocation.droppableId !== sourceLocation.droppableId) {
        leftOver = cut.pop();
        if (destinationIndex === 1) destinationIndex--;
    }

    let moved: Card;

    switch (sourceLocation.droppableId) {
        case DroppableIds.DECK:
            moved = deck.splice(sourceLocation.index, 1)[0];
            break;
        case DroppableIds.HAND:
            moved = hand.splice(sourceLocation.index, 1)[0];
            break;
        case DroppableIds.CUT:
            moved = hand.splice(sourceLocation.index, 1)[0];
            break;
    }

    switch (destinationLocation.droppableId) {
        case DroppableIds.DECK:
            deck.splice(destinationLocation.index, 0, moved);
            break;
        case DroppableIds.HAND:
            hand.splice(destinationLocation.index, 0, moved);
            break;
        case DroppableIds.CUT:
            cut.splice(destinationLocation.index, 0, moved);
            break;
    }

    if (leftOver) {
        deck.splice(sourceIndex, 0, leftOver);
    }

    return {
        deck,
        hand,
        cut
    }
}