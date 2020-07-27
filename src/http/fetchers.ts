import { get, put, del } from "node-kall";
import { PageModel, ReseponseModel } from "../models";

export const putPage = (page: PageModel) =>
    put<PageModel>(`/api/pages/${page.id}`, page);

export const deletePage = (id: string) =>
    del<PageModel>(`/api/pages/${id}`);

export const getPage = (id: string) =>
    get<PageModel>(`/api/pages/${id}`);

export const getPages = () =>
    get<PageModel[]>("/api/pages");



export const getResponses = (pageId: string) =>
    get<ReseponseModel[]>(`/api/pages/${pageId}/responses`);