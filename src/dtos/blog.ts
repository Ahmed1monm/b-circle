export type createBlogDTO = {
    title: string;
    content: string;
    id: string;
    tags_ids?: string[];
    circles_ids?: string[];
};

export type updateBlogDTO = {
    id: string;
    title?: string;
    content?: string;
    tags_ids?: string[];
    circles_ids?: string[];
};
