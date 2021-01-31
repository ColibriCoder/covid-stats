import React from 'react';

function Row(props) {
    return (
        <tr onClick={() => props.select(props.id)} className={"stats-row"}>
            <th>{props.data.dateString}</th>
            <td>{props.data.stateName}</td>
            <td>{props.data.death}</td>
            <td>{props.data.deathConfirmed}</td>
        </tr>
    );
}

export default Row;