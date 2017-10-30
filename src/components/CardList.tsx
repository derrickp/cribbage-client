
import * as React from "react";
import * as classNames from "classnames";

import { Droppable } from 'react-beautiful-dnd';
import Select from "react-select";

import { Card } from "../data/Card";
import { Card as CardComponent } from "./Card";
import { Option } from "../data/Option";

export interface CardListProps {
    id: string;
    name: string;
    cards: Card[];
    sortCards?: (sortOption: Option, id: string) => void;
    sortOptions?: Option[];
    sortValue?: Option;
    sortEnabled?: boolean;
    additionalClass?: string;
}

interface CardListState {
    filter: string;
}

export class CardList extends React.Component<CardListProps, CardListState> {

    constructor(props: CardListProps) {
        super(props);
        this.state = {
            filter: ""
        }
        this.getBucketClass = this.getBucketClass.bind(this);
        this.sortChanged = this.sortChanged.bind(this);
    }

    getBucketClass(dragging: boolean): string {
        const classMap = ({
            [Classes.DRAGGING]: dragging
        } as any);
        return classNames(Classes.LIST, classMap, this.props.additionalClass);
    }

    sortChanged(option: Option) {
        this.props.sortCards(option, this.props.id);
    }

    render() {
        const cards = this.props.cards.map(card => <CardComponent key={card.key} card={card} />);
        const sortValue = this.props.sortValue ? this.props.sortValue.value : undefined;

        return (
            <Droppable droppableId={this.props.id}>
                {(provided, snapshot) => (
                    <div className={Classes.LIST_CONTAINER}>
                        <div className="header">
                            <h4>
                                {this.props.name}
                            </h4>
                            {this.props.sortEnabled && <Select options={this.props.sortOptions} value={sortValue} placeholder="Sort by" clearable={false} onChange={this.sortChanged}></Select>}
                        </div>
                        <div
                            ref={provided.innerRef}
                            className={this.getBucketClass(snapshot.isDraggingOver)}>
                            {cards}
                            {provided.placeholder}
                        </div>
                    </div>
                )}
            </Droppable>
        );
    }
}

export enum Classes {
    LIST = "card-list",
    LIST_CONTAINER = "list-container",
    DRAGGING = "drag-over"
};