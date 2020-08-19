export interface PaginatedModel<T> {
    data: T[],
    next: string
}