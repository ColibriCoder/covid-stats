import React from 'react';

function Header(props) {
    return (
        <thead>
            <tr>
                <th scope="col" onClick={() => props.sortBy('ts')}>Date</th>
                <th scope="col" onClick={() => props.sortBy('state')}>State</th>
                <th scope="col" onClick={() => props.sortBy('death')}>Deaths</th>
                <th scope="col" onClick={() => props.sortBy('deathConfirmed')}>Deaths (confirmed)</th>
            </tr>
        </thead>
    );
}

export default Header;