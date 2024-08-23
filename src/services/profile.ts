import {db, logger} from "../clients";
import {profile} from "../db/models";
import {createProfileDto, updateProfileDto} from "../dtos";

export async function getProfileService() {
    try {
        return await db.select().from(profile);
    } catch (error) {
        logger.error("Failed to get profile: ", error.message);
        throw new Error(`Failed to get profile, ${error.message}`);
    }
}


export async function createProfileService(profileData: createProfileDto) {
    try {
        return await db.insert(profile).values(profileData).returning();
    } catch (error) {
        logger.error("Failed to create profile: ", error.message);
        throw new Error(`Failed to create profile, ${error.message}`);
    }
}


export async function updateProfileService(profileData: updateProfileDto) {
    try {
        return await db.update(profile).set(profileData).returning();
    } catch (error) {
        logger.error("Failed to update profile: ", error.message);
        throw new Error(`Failed to update profile, ${error.message}`);
    }
}
