import { get, put, del, post } from "node-kall";
import { PageModel, ResponseModel, CategoryModel, EmailModel, PaymentRequestModel, CoordinateModel, PaginatedModel, AnswerModel, QuestionModel, EmbeddableModel, EmbeddableResponseModel, UserModel, AuthModel } from "./models/models";
import Stripe from "stripe";


/*
 * Contains functions for fetching API endpoints. 
 * THINKABOUT: Consider splitting this up. 
*/

export const putPage = (page: PageModel) =>
    put<PageModel>(`/api/pages/${page.id}`, page);

export const deletePage = (id: string) =>
    del<PageModel>(`/api/pages/${id}`);

export const getPage = (id: string) =>
    get<PageModel>(`/api/pages/${id}`);

export const getPages = () =>
    get<PageModel[]>("/api/pages");

export const getResponses = (pageId: string) =>
    get<PaginatedModel<ResponseModel>>(`/api/pages/${pageId}/responses`);

export const postResponse = (response: ResponseModel) =>
    post<ResponseModel>(`/api/pages/${response.page_id}/responses`, response);

export const postAnswer = (pageId: string, responseId: string, answer: AnswerModel) =>
    post<AnswerModel>(`/api/pages/${pageId}/responses/${responseId}/answers`, answer);

export const getAnswers = (pageId: string, responseId: string) =>
    get<AnswerModel[]>(`/api/pages/${pageId}/responses/${responseId}/answers`);

export const getCategories = () =>
    get<CategoryModel[]>(`/api/categories`);

export const postCategory = (category: CategoryModel) =>
    post<CategoryModel>(`/api/categories`, category);

export const getOverallAverage = (pageId: string) =>
    get<number>(`/api/pages/${pageId}/average`);

export const getCount = (pageId: string) =>
    get<{ count: number }>(`/api/pages/${pageId}/responses/count`);

export const getLineCoordinates = (pageId: string) =>
    get<CoordinateModel>(`/api/pages/${pageId}/charts/line`);

export const postEmail = (email: EmailModel) =>
    post<EmailModel>(`/api/mail`, email);

export const postSubscription = (paymentRequest: PaymentRequestModel) =>
    post<any>(`/api/payment/subscription`, paymentRequest);

export const deleteSubscription = () =>
    del(`/api/payment/subscription`);

export const getProducts = () =>
    get<Stripe.Product[]>(`/api/payment/products`);

export const getProductByUser = (userId: string) =>
    get<Stripe.Product>(`/api/users/${userId}/product`);

export const getPrices = (productId: string) =>
    get<Stripe.Price[]>(`/api/payment/prices?productId=${productId}`);

export const getQuestions = (pageId: string, includeArchived: boolean) =>
    get<QuestionModel[]>(`/api/pages/${pageId}/questions?includeArchived=${includeArchived}`);


export const postQuestion = (question: QuestionModel) =>
    post<QuestionModel>(`/api/pages/${question.page_id}/questions`, question);

export const updateQuestion = (question: QuestionModel) =>
    put<QuestionModel>(`/api/pages/${question.page_id}/questions/${question.id}`, question);

export const deleteQuestion = (question: QuestionModel) =>
    del<QuestionModel>(`/api/pages/${question.page_id}/questions/${question.id}`, {
        body: JSON.stringify(question) //backend expects question to be passed as body.
    });

//DANGER: actually deletes entire user.
export const deleteUser = (id: string) =>
    del(`/api/users/${id}`);

export const getEmbeddable = (pageId: string) =>
    get<EmbeddableModel>(`/api/pages/${pageId}/embeddables`);

export const postEmbeddable = (embeddable: EmbeddableModel) =>
    post(`/api/pages/${embeddable.page_id}/embeddables`, embeddable);

export const putEmbeddableResponse = (embeddableResponse: EmbeddableResponseModel) =>
    put(`/api/pages/${embeddableResponse.response.page_id}/embeddables`, embeddableResponse);
export const putUser = (user: UserModel) =>
    put(`/api/users/${user.id}`, user);

export const getAuthUser = (user: UserModel) =>
    get<AuthModel>(`/api/users/${user.id}/auth`); 
