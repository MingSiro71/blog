import Link from 'next/link'
import { Tag } from '../modules/tags'
import { FC } from 'react'

const LinkableTagBadge: FC<{tag: Tag}> = ({ tag }) => {
    return (
        <Link href={`/tags/${tag.name}`}>
            <a><div className="tag-badge">{tag.name}</div></a>
        </Link>
    )
}
export default LinkableTagBadge