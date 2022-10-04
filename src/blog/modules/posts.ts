import fs from 'fs';
import path from 'path';
import matter from 'gray-matter'
import { Tag } from './tags'
import { remark } from 'remark';
import html from 'remark-html';
import { isSameTag } from './tags'

export type PostMetaData = {
    title: string,
    postedAt: string,
    tags: Tag[]
};

export type Post = {
    body: string
} & PostMetaData;

const postDirectory = path.join(process.cwd(), 'markdown');

export const getPosts = async (): Promise<PostMetaData[]> => {
    const fileNames = fs.readdirSync(postDirectory)
    const posts = fileNames.map((fileName) => {
        const fullPath = path.join(postDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath)
        const metaDatas = matter(fileContents).data
        const contentTags = metaDatas.tags
            ? metaDatas.tags.split(',')
            : []
        return {
            title: metaDatas.title,
            postedAt: metaDatas.date,
            tags: contentTags.map((v: string) => { return { name: v } })
        }
    })
    return posts;
}

export const getPostsByTag = async (tag: Tag): Promise<PostMetaData[]> => {
    const all = await getPosts()

    const posts: PostMetaData[] = []
    all.map((post: PostMetaData) => {
        post.tags.map((t) => {
            if (isSameTag(t, tag)) {
                posts.push(post)
            }
        })
    })
    return posts;
}

export const getPostByTitle = async (title: string): Promise<Post> => {
    const fullPath = path.join(postDirectory, title)
    const fileContents = fs.readFileSync(fullPath)
    const matterResult = matter(fileContents)
    const metaDatas = matterResult.data
    const content = matterResult.content
    const contentTags = metaDatas.tags
        ? metaDatas.tags.split(',')
        : []
    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    return {
        title: metaDatas.title,
        postedAt: metaDatas.date,
        tags: contentTags.map((v: string) => { return { name: v } }),
        body: contentHtml,
    }
}

export const getPostTitles = async (): Promise<string[]> => {
    const fileNames = fs.readdirSync(postDirectory)
    return fileNames.map((fileName) => {
        const fullPath = path.join(postDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath)
        const metaDatas = matter(fileContents).data
        return metaDatas.title
    })
}
