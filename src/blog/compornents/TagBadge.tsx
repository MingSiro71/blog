import { Tag } from '../modules/tags'
import { FC } from 'react'
import LinkableTagBadge from './LinkableTagBadge'

const TagBadge: FC<{ tag: Tag }> = ({ tag }) => {
    return (
        <div className="tag-badge">{tag.name}</div>
    )
}
export default TagBadge