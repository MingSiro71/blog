import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import Head from 'next/head'
import BackLink from "../../compornents/BackLink"
import Layout from '../../layouts/MainLayout'
import { getPostByTitle, getPostTitles, Post } from '../../modules/posts'

type Params = {
    title: string
}

type Props = {
    post: Post
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
    const titles = await getPostTitles()
    return {
        paths: titles.map((title) => {
            return {
                params: {
                    title: title
                }
            }
        }),
        fallback: false,
    }
}

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
    const params = context.params!
    return {
        props: {
            post: await getPostByTitle(params.title),
        }
    }
}

const PostPage: NextPage<Props> = ({ post }) => {
    return (
        <Layout>
            <Head>
                <meta property="og:url" content="https://blog.hentech.work/" />
            </Head>
            <h1 className="page-title">
                {post.title}
            </h1>
            <div className="content-body">
                <div className="markdown-content" dangerouslySetInnerHTML={{ __html: post.body }} />
                <section>
                    <BackLink />
                </section>
            </div>
        </Layout>
    )
}

export default PostPage
