import { EmbeddableModel } from "../models/models";
import { first } from "./helpers/query"

/**
 * NOTE: gets __only the first__ of embeddables (support more in frontend later?)
 * (based on token order)
 * @param pageId 
 */
export const getByPage = (pageId: string) =>
    first<EmbeddableModel>(
        "select * from embeddables where page_id = $1 order by token",
        [pageId]
    )

export const getByToken = (token: string) =>
    first<EmbeddableModel>(
        "select * from embeddables where token = $1",
        [token]
    );

export const create = (embeddable: EmbeddableModel) =>
    first<EmbeddableModel>(
        "insert into embeddables(token, page_id) values($1, $2) RETURNING *",
        [embeddable.token, embeddable.page_id]
    );

