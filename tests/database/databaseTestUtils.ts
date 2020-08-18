import * as faker from "faker";
import { users, pages, responses } from "../../src/database/database";
import { first, run } from "../../src/database/helpers/query";
import { PageModel, ResponseModel, Emotion, UserModel } from "../../src/models/models";

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


export const fakeCreationDate = (response: ResponseModel) => first<ResponseModel>(
    `update responses set created_at = $2 where id = $1 returning *`,
    [response.id, faker.date.past(1)]
);

export const blindSetup = async (responseCount = faker.random.number({ min: 1, max: 30 })): Promise<[PageModel, UserModel, ResponseModel[]]> => {

    const user = await users.createUser(randomUser());
    const page = await pages.createPage(randomPage(user.id));
    const createdResonses = [];

    for (let i = 0; i < responseCount; i++) {

        const response = await fakeCreationDate(
            (await responses.createResponse(randomResponse(page.id)))
        );
        createdResonses.push(response);
    }

    //NOTE: as `fakeCreationDate` messes with sorting
    createdResonses.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    return [page, user, createdResonses];
}