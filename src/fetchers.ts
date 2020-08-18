import { get, put, del, post } from "node-kall";
import { PageModel, ResponseModel, CategoryModel, EmailModel, PaymentRequestModel, CoordinateModel } from "./models/models";
import Stripe from "stripe";

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

export const getLineCoordinates = (pageId: string) =>
    get<CoordinateModel>(`/api/pages/${pageId}/charts/line`);

export const postEmail = (email: EmailModel) =>
    post<EmailModel>(`/api/mail`, email);


export const postSubscription = (paymentRequest: PaymentRequestModel) =>
    post<any>(`/api/payment/subscription`, paymentRequest);

export const getProducts = () =>
    get<Stripe.Product[]>(`/api/payment/products`);

export const getPrices = (productId: string) =>
    get<Stripe.Price[]>(`/api/payment/prices?productId=${productId}`); 