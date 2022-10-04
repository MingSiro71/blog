import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import Head from 'next/head'
import Layout from '../../layouts/MainLayout'
import { PostMetaData, getPostsByTag } from '../../modules/posts'
import { Tag, getTags, getTagByName, getEmptyTag } from '../../modules/tags'
import PostListItem from "../../compornents/PostListItem"
import BackLink from "../../compornents/BackLink"

type Params = {
    name: string
}

type Props = {
    tag: Tag,
    posts: PostMetaData[]
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
    const tags = await getTags()
    const paths = tags.map((tag) => {
        return {
            params: {
                name: tag.name
            }
        }
    })
    return {
        paths,
        fallback: false,
    }
}

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
    const params = context.params!
    const tag = await getTagByName(params.name);
    const posts = tag ? await getPostsByTag(tag) : []
    return {
        props: {
            tag: tag ? tag : getEmptyTag(),
            posts,
        }
    }
}

const TagPage: NextPage<Props> = ({ tag, posts }) => {
    return (
        <Layout>
            <Head>
                <meta property="og:url" content={`https://blog.hentech.work/tags/${tag.name}`} />
            </Head>
            <h1 className="page-title">
                Tag: {tag.name}
            </h1>
            <div className="content-body">
                <section>
                    <h2 className="section-title">Related Posts</h2>
                    <ul>
                        {posts.map((post) => {
                            return (
                                <div key={post.title}>
                                    <PostListItem
                                        title={post.title}
                                        tags={post.tags}
                                    ></PostListItem>
                                </div>
                            )
                        })}
                    </ul>
                </section>
                <section>
                    <BackLink />
                </section>
            </div>
        </Layout>
    )
}

export default TagPage
