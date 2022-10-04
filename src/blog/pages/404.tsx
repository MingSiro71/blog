import type { NextPage } from 'next'
import BackLink from '../compornents/BackLink'
import Layout from '../layouts/MainLayout'
import styles from './error.module.scss'

const Custom404: NextPage = () => {
  return (
    <Layout>
      <div className={styles.jumbotron}>
        <section>
          <h1>404: Page not Found.</h1>
        </section>
        <section>
          <BackLink />
        </section>
      </div>

    </Layout>
  )
}

export default Custom404