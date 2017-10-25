
import * as React from "react";

import * as classNames from "classnames";
import { Droppable } from 'react-beautiful-dnd';

import { Card } from "../data/Card";
import { Card as CardComponent } from "./Card";

export interface CardBucketProps {
    id: string;
    name: string;
    cards: Card[];
    maxSize?: number;
}

export interface CardBucketState { }

export class CardBucket extends React.Component<CardBucketProps, CardBucketState> {

    constructor(props: CardBucketProps) {
        super(props);
        this.getBucketClass = this.getBucketClass.bind(this);
    }

    getBucketClass(dragging: boolean): string {
        
        const drag = ({
            [BucketClasses.DRAGGING]: dragging
        } as any);
        return classNames(BucketClasses.BUCKET, drag);
    }

    render() {
        const cards = this.props.cards.map(card => <CardComponent key={card.key} card={card} />)
        return (
            <div>
                {this.props.name}
                <Droppable droppableId={this.props.id}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        className={this.getBucketClass(snapshot.isDraggingOver)}
                    >
                        {cards}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            </div>
        )
    }
}

export enum BucketClasses {
    BUCKET = "bucket",
    DRAGGING = "dragging"
};