export type createProfileDto = {
    bio: string;
    image: string;
    id: string;
    name: string;
}

export type updateProfileDto = {
    bio?: string;
    image?: string;
    name?: string;
}
