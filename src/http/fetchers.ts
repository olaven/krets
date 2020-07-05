import { get } from "./methods";
import { PageModel, ReseponseModel } from "../models";

export const getPage = (id: string) =>
    get<PageModel>(`/api/pages/${id}`);

export const getResponses = (pageId: string) =>
    get<ReseponseModel[]>(`/api/pages/${pageId}/responses`);