import { get, put, del, post } from "node-kall";
import { PageModel, ResponseModel, CategoryModel, EmailModel } from "./models";

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

export const getCategories = () =>
    get<CategoryModel>(`/api/categories`);

export const postCategory = (category: CategoryModel) =>
    post<CategoryModel>(`/api/categories`, category);

export const getOverallAverage = (pageId: string) =>
    get<number>(`/api/pages/${pageId}/average`);

export const postEmail = (email: EmailModel) =>
    post<EmailModel>(`/api/mail`, email);

//TODO: remove this and endpoint if not needed for metered billing setup 
export const getPaymentSession = () =>
    get<{ id: string }>(`/api/payment/session`);

//TODO: remove this 
export const createCustomer = (email: string) =>
    post<any>(`/api/payment/customer`, { email }); 