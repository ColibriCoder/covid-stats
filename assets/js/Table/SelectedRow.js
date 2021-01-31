import React from 'react';

function SelectedRow(props) {
    return (
        <div className="card">
            <div className="card-body">
                <ul>
                    <li>Date: <b>{props.data.dateString}</b></li>
                    <li>State: <b>{props.data.stateName}</b></li>
                    <li>Deaths: <b>{props.data.death}</b></li>
                    <li>Deaths (confirmed): <b>{props.data.deathConfirmed}</b></li>
                </ul>
            </div>
        </div>
    );
}

export default SelectedRow;