import {connect} from "react-redux";
import React from "react";
import {Pagination} from "semantic-ui-react";
import TodoApi from "../../../api/TodoApi";

class PaginateTodos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalPages: 1
        };
        this.fetchTotalPages = this.fetchTotalPages.bind(this);
        this.changePage = this.changePage.bind(this);
    }
    componentDidMount() {
        this.fetchTotalPages();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.filters !== this.props.filters) {
            this.fetchTotalPages();
        }
    }
    fetchTotalPages() {
        TodoApi.getCount(this.props.filters).then(totalCount => {
            this.setState({
                totalPages: Math.max(1, Math.ceil(totalCount / this.props.limit))
            });
        });
    }
    changePage(page) {
        this.props.setPage(page);
    }
    render() {
        return <Pagination
            totalPages={this.state.totalPages}
            activePage={this.props.page}
            onPageChange={(e, d) => this.changePage(d.activePage)}/>;
    }
}

const ConnectedPaginateTodos = connect(state => {
    return {
        page: state.todoApi.page,
        limit: state.todoApi.limit
    };
}, dispatch => {
    return {
        setPage: page => dispatch({type: 'PAGE', value: page})
    };
})(PaginateTodos);

export default ConnectedPaginateTodos;
