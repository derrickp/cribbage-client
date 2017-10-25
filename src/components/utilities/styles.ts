

export function getItemStyle(draggableStyle: React.CSSProperties, isDragging: boolean): React.CSSProperties {
    return {
        ...draggableStyle,
        // some basic styles to make the items look a bit nicer
        userSelect: 'none',
        padding: grid * 2,
        margin: grid,

        // change background colour if dragging
        background: isDragging ? 'lightgreen' : 'grey',
    }
}

export function getListStyle(isDraggingOver: boolean): React.CSSProperties {
    const height = (52) * itemHeight;
    return {
        background: isDraggingOver ? 'lightblue' : 'lightgrey',
        padding: grid,
        width: 250,
        height
    };
}

const itemHeight = 60;

export const grid = 8;