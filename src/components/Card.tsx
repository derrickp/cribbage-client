
import * as React from "react";

import * as classNames from "classnames";
import { Draggable } from 'react-beautiful-dnd';

import { Card as DataCard } from "../data/Card";

export interface CardProps {
    card: DataCard;
}

export class Card extends React.Component<CardProps, any> {

    constructor(props: CardProps) {
        super(props);

        this.getCardClass = this.getCardClass.bind(this);
    }

    getCardClass(dragging: boolean): string {
        const drag = ({
            [CardClasses.DRAGGING]: dragging
        } as any);
        return classNames(CardClasses.CARD, drag);
    }

    render() {
        const card = this.props.card;
        return <Draggable key={card.fullName} draggableId={card.fullName}>
            {(provided: any, snapshot) => (
                <div>
                    <div
                        ref={provided.innerRef}
                        style={{...provided.draggableStyle}}
                        className={this.getCardClass(snapshot.isDragging)}
                        {...provided.dragHandleProps}
                    >
                        {card.fullName}
                    </div>
                    {provided.placeholder}
                </div>
            )}
        </Draggable>
    }
}

export enum CardClasses {
    CARD = "card",
    DRAGGING = "card-dragging"
}