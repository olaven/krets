import * as faker from "faker";
import { users, pages, responses } from "../../src/database/database";
import { PageModel, ResponseModel, Emotion, UserModel } from "../../src/models";

export const randomUser = (id = faker.random.uuid()): UserModel => ({
    id,
    customer_id: faker.random.uuid(),
    invoice_paid: false
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

export const blindSetup = async (): Promise<[PageModel, UserModel, ResponseModel[]]> => {

    const user = await users.createUser(randomUser());
    const page = await pages.createPage(randomPage(user.id));
    const createdResonses = [];

    const responseCount = faker.random.number({ min: 1, max: 30 });
    for (let i = 0; i < responseCount; i++) {

        const response = await responses.createResponse(randomResponse(page.id));
        createdResonses.push(response);
    }

    return [page, user, createdResonses];
}