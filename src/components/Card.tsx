
import * as React from "react";

import { Draggable } from 'react-beautiful-dnd';

import { Card as DataCard } from "../data/Card";
import { getItemStyle } from "./utilities/styles";

export interface CardProps {
    card: DataCard;
}

export class Card extends React.Component<CardProps, any> {
    render() {
        const card = this.props.card;
        return <Draggable key={card.fullName} draggableId={card.fullName}>
            {(provided: any, snapshot) => (
                <div>
                    <div
                        ref={provided.innerRef}
                        style={getItemStyle(
                            provided.draggableStyle,
                            snapshot.isDragging
                        )}
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