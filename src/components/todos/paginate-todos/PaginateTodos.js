import {connect} from "react-redux";
import React from "react";
import {Pagination} from "semantic-ui-react";

class PaginateTodos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalPages: 1,
            currentPage: props.page
        };
        this.changePage = this.changePage.bind(this);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.total !== this.props.total) {
            this.setState({totalPages: this.props.total});
        }
        if (prevProps.page !== this.props.page) {
            this.setState({currentPage: this.props.page});
        }
    }
    changePage(page) {
        this.props.onPageChange(page);
    }
    render() {
        return <Pagination
            siblingRange={0}
            boundaryRange={0}
            totalPages={this.state.totalPages}
            activePage={this.state.currentPage}
            onPageChange={(e, d) => this.changePage(d.activePage)}/>;
    }
}

const ConnectedPaginateTodos = connect(state => {
    return {
        page: state.todoApi.page,
        limit: state.todoApi.limit,
        total: state.todoApi.total
    };
}, dispatch => {
    return {};
})(PaginateTodos);

export default ConnectedPaginateTodos;
