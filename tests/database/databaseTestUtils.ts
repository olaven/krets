import * as faker from "faker";
import { PageModel, ResponseModel, Emotion, UserModel } from "../../src/models";

export const randomUser = (): UserModel => ({
    id: faker.random.uuid()
});

export const randomPage = (ownerId: string, color: string = null, categoryId: string = null): PageModel => ({
    id: faker.random.uuid(),
    name: faker.company.companyName(),
    owner_id: ownerId,
    color,
    category_id: categoryId
});

export const randomResponse = (pageId: string, emotion: Emotion = ":-)", contactDetails: string | undefined = undefined): ResponseModel =>
    ({
        id: faker.random.uuid(),
        page_id: pageId,
        text: faker.lorem.lines(1),
        emotion: emotion,
        contact_details: contactDetails
    });