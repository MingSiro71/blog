import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../layouts/MainLayout'
import { PostMetaData, getPosts } from '../modules/posts'
import { Tag, getTags } from '../modules/tags'
import PostListItem from "../compornents/PostListItem"
import LinkableTagBadge from '../compornents/LinkableTagBadge'

const getStaticProps = async () => {
  const tags: Tag[] = await getTags();
  const posts: PostMetaData[] = await getPosts();
  return {
    props: { posts: posts, tags: tags }
  };
}

type HomeProps = {
  posts: PostMetaData[]
  tags: Tag[]
}

const Home: NextPage<HomeProps> = ({ tags, posts }) => {
  return (
    <Layout>
      <Head>
        <meta property="og:url" content="https://blog.hentech.work/" />
      </Head>
      <h1 className="page-title">
        Hentech Tech Notes
      </h1>
      <div className="content-body">
        <section>
          <h2 className="section-title">Latest Notes</h2>
          <ul>
            {posts.map((post) => {
              return (
                <div key={post.title}>
                  <PostListItem title={post.title} tags={post.tags} />
                </div>
              )
            })}
          </ul>
        </section>
        <section>
          <h2 className="section-title">Tags</h2>
          <div className="tag-container">
            {tags.map((tag) => {
              return (
                <span key={tag.name}>
                  <LinkableTagBadge
                    tag={tag}
                  />
                </span>
              )
            })}
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default Home
export { getStaticProps }