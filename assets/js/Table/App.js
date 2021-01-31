import React from "react";
import Header from "./Header";
import Loader from "./Loader";
import { getUsers } from "../Commonn/statsAPI";
import Body from "./Body";
import * as statesHash from '../Commonn/states_hash';
import Pagination from "./Pagination";
import SelectedRow from "./SelectedRow";

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            stats: {},
            data: {},
            statsIsLoading: true,
            direction: {
                ts: 'asc',
                death: 'asc',
                state: 'asc',
                deathConfirmed: 'asc'
            },
            paginationOffset: 0,
            defaultRowsPerPage: 100,
            rowsPerPage: 100,
            selectedRow: null
        };
        this.sortBy = this.sortBy.bind(this);
        this.getData = this.getData.bind(this);
        this.setPage = this.setPage.bind(this);
        this.showFullList = this.showFullList.bind(this);
        this.selectRow = this.selectRow.bind(this);
    }

    componentDidMount() {
        getUsers().then(json => {
            Object.entries(json).forEach(([key, value]) => {
                let dateString = value.date.toString();

                value.dateString = dateString.substring(0, 4) + '-' + dateString.substring(4, 6) + '-'
                    + dateString.substring(6, 8);

                value.ts = Date.parse(value.dateString);

                value.stateName = statesHash[value.state];

                if (value.deathConfirmed === null) {
                    value.deathConfirmed = 0;
                }
            });
            this.setState({
                data: json,
            });
            this.getData();
        });
    }

    sortBy(key) {
        // this.setState({statsIsLoading: true});
        this.setState({
            stats: this.state.data.sort((a, b) => {
                if (typeof a[key] === 'string') {
                    if (this.state.direction[key] === 'asc') {
                        if (a[key] < b[key]) {
                            return -1;
                        }
                        if (a[key] > b[key]) {
                            return 1;
                        }
                    } else {
                        if (a[key] > b[key]) {
                            return -1;
                        }
                        if (a[key] < b[key]) {
                            return 1;
                        }
                    }
                } else {
                    if (this.state.direction[key] === 'asc') {
                        return parseInt(a[key]) - parseInt(b[key])
                    } else {
                        return parseInt(b[key]) - parseInt(a[key])
                    }
                }
            }),
            direction: {
                [key]: this.state.direction[key] === 'asc'
                    ? 'desc'
                    : 'asc'
            },
        });
        this.getData();
    }

    setPage(page) {
        this.setState({
            rowsPerPage: this.state.defaultRowsPerPage,
            selectedRow: null
        }, () => {
            this.setState({
                paginationOffset: page * this.state.rowsPerPage
            }, () => {
                this.getData();
            });
        });
    }

    getData() {
        this.setState({
            stats: this.state.data.slice(this.state.paginationOffset, this.state.paginationOffset + this.state.rowsPerPage),
        }, () => {
            this.setState({
                statsIsLoading: false
            })
        });
    }

    showFullList() {
        this.setState({
            rowsPerPage: this.state.data.length,
            statsIsLoading: true,
            paginationOffset: 0,
            selectedRow: null
        }, () => {
            this.getData()
        });
    }

    selectRow(id) {
        let elements = document.getElementsByClassName('stats-row');

        for (let i = 0; i < elements.length; i++) {
            elements.item(i).classList.remove("table-active");
        }
        elements.item(id).classList.add("table-active");
        this.setState({
            selectedRow: id
        });
    }

    render() {
        let table = <Loader />;

        if (!this.state.statsIsLoading) {
            table = <table className="table table-hover">
                <Header sortBy={this.sortBy} />
                <Body stats={this.state.stats} select={this.selectRow} />
            </table>;
        }

        let selectedCardData = "";

        if (this.state.selectedRow !== null) {
            selectedCardData = <SelectedRow data={this.state.stats[this.state.selectedRow]} />;
        }

        return (
            <div>
                <Pagination
                    currentPage={ this.state.paginationOffset }
                    rowsPerPage={ this.state.defaultRowsPerPage }
                    dataCount={ this.state.data.length }
                    setPage={ this.setPage }
                    showFullList={ this.showFullList }
                />
                { selectedCardData }
                { table }
            </div>
        );
    };
}

export default App;