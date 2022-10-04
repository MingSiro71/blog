import Link from 'next/link'
import { FC } from 'react'
import { Tag } from '../modules/tags'
import TagBadge from './TagBadge'

const PostListItem: FC<{ title: string, tags: Tag[] }> = ({ title, tags }) => {
    return (
        <li>
            <Link href={`/posts/${title}`}>{title}</Link>
            <div className="tag-container">
                {tags.map((tag) => {
                    return (
                        <span key={tag.name}>
                            <TagBadge
                                tag={tag}
                            />
                        </span>
                    )
                })}
            </div>
        </li>
    )
}
export default PostListItem