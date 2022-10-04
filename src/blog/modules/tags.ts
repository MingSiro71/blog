import fs from 'fs';
import path from 'path';
import matter from 'gray-matter'

export type Tag = {
    name: string
};

const postDirectory = path.join(process.cwd(), 'markdown');

export const getTags = async (): Promise<Tag[]> => {
    const fileNames = fs.readdirSync(postDirectory)
    let tagNames: string[] = []
    fileNames.map((fileName) => {
        const fullPath = path.join(postDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath)
        const metaDatas = matter(fileContents).data
        const contentTags = metaDatas.tags
            ? metaDatas.tags.split(',')
            : []
        tagNames = [...tagNames, ...contentTags]
    })
    const uniqueTags = Array.from(new Set(tagNames)).map((name) => {
        return { name }
    })

    return uniqueTags;
}

export const getTagByName = async (name: string): Promise<Tag|null> => {
    const tags = await getTags()
    let foundTag = null
    tags.map((tag) => {
        if (tag.name === name) {
            foundTag = tag
        }
    })
    return foundTag;
}

export const isSameTag = (a: Tag, b: Tag): boolean => {
    return a.name === b.name
}

export const getEmptyTag = (): Tag => {
    return {
        name: "(no data)"
    }
}
