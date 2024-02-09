import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {Pagination} from "semantic-ui-react";

const PaginateTodos = () => {
    const { totalPages = 1, currentPage = 1 } = useSelector(state => ({
        totalPages: state.todoApi.total,
        currentPage: state.todoApi.page
    }));
    const dispatch = useDispatch();
    const changePage = page => dispatch({type: 'PAGE', value: page});
    useEffect(() => {}, [currentPage]);
    return <Pagination
        siblingRange={0}
        boundaryRange={0}
        totalPages={totalPages}
        activePage={currentPage}
        onPageChange={(e, d) => changePage(d.activePage)}/>;
};

export default PaginateTodos;
