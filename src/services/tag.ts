import { db } from '../clients';
import { tags } from '../db/models';


export async function createTagService(name: string, id: string) {
    try {
        return await db.insert(tags).values({name, id}).returning();
    } catch (err) {
        throw new Error(`Error happened while creating tag ${err.message}`);
    }
}
