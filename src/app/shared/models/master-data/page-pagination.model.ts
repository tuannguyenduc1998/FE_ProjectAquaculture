export class PagePagination<T> {
    pageIndex: 0;
    pageSize: 0;
    totalCount: 0;
    totalPages: 0;
    items: T[];
    hasPreviousPage?: true;
    hasNextPage?: true;
    extraData?: {}
};
