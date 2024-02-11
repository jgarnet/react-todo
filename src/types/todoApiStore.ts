export type TodoFilters = {[key: string]: string | number | boolean};

export type TodoApiState = {
    filters: TodoFilters;
    page: number;
    limit: number;
    total: number;
    sort: string;
    isLoading: boolean;
};

export type TodoApiAction = {
    type: string;
    value?: any;
    filters?: TodoFilters;
};
