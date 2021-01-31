import React from 'react';

function Pagination(props) {
    let numbers = [];

    for (let i = 1; i < (props.dataCount / props.rowsPerPage); i++) {
        let className_ = 'page-item ';

        if ((props.currentPage / props.rowsPerPage) + 1 === i) {
            className_ += 'active';
        }

        numbers.push(<li key={i} data-page={i} className={className_} onClick={ (i) => props.setPage(parseInt(i.target.innerHTML) - 1) }><a className="page-link">{i}</a></li>);
    }

    return (
        <div>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    { numbers }
                </ul>
            </nav>
            <button type="button" className="btn btn-secondary mb-3" onClick={props.showFullList}>Full list</button>
        </div>
    );
}

export default Pagination;