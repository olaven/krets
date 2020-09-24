import { EmbeddableModel } from "../models/models";
import { first } from "./helpers/query"

const getByToken = (token: string) =>
    first<EmbeddableModel>(
        "select * from embeddables where token = $1",
        [token]
    );

const createEmbeddable = (embeddable: EmbeddableModel) =>
    first<EmbeddableModel>(
        "insert into embeddables(token, origin, page_id) values($1, $2, $3) RETURNING *",
        [embeddable.token, embeddable.origin, embeddable.page_id]
    );

export const embeddables = {
    getByToken, createEmbeddable
}