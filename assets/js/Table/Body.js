import React from 'react';
import Row from "./Row";

function Body(props) {
    const listItems = props.stats.map((row, index) =>
        <Row data={row} key={index} select={props.select} id={index}/>
    );
    return (
        <tbody>
            {listItems}
        </tbody>
    );
}

export default Body;