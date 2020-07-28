import { get, put, del, post } from "node-kall";
import { PageModel, ResponseModel } from "./models";

export const putPage = (page: PageModel) =>
    put<PageModel>(`/api/pages/${page.id}`, page);

export const deletePage = (id: string) =>
    del<PageModel>(`/api/pages/${id}`);

export const getPage = (id: string) =>
    get<PageModel>(`/api/pages/${id}`);

export const getPages = () =>
    get<PageModel[]>("/api/pages");

export const getResponses = (pageId: string) =>
    get<ResponseModel[]>(`/api/pages/${pageId}/responses`);

export const postResponse = (response: ResponseModel) =>
    post<ResponseModel>(`/api/pages/${response.page_id}/responses`, response);
