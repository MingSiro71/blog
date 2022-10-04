import React from "react"
import Head from "next/head";
import Image from "next/image";
import styles from '../styles/layout.module.scss'
// import FootPrint from "../modules/footprint"


const MainLayout = (props: React.PropsWithChildren) => {
    // useEffect(() => {
    //     new FootPrint()
    // });

    return (
        <>
            <Head>
                <title>Hentech Tech Notes</title>
                <meta property="og:title" content="Hentech Tech Notes" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://blog.hentech.work/" />
                {/* <meta property="og:image" content="https://www.hentech.work/image/hentech_ogp.png" /> */}
                <meta property="og:site_name" content="Hentech Tech Notes" />
                <meta name="description" content="Web development topic blog by Hentech." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className="header">
                <nav>
                    <div className={styles["navbar-logo-wrapper"]}>
                        <a href="/">
                            <Image
                                className={styles["navbar-logo-image"]}
                                src="/images/niwatori.png"
                                alt="Henteck logo with hen."
                                height={"24px"}
                                width={"24px"}
                            />
                            <span className={styles["navbar-logo-text"]}>HENTECH</span>
                        </a>
                    </div>
                </nav>
            </header>
            <div className="contents">
                {/* <canvas id="walking-hen" className="walking-hen">

                </canvas> */}
                <main className="main">
                    {props.children}
                </main>
            </div>
            <footer className="footer">
                <a href="https://www.hentech.work" target="_blank">
                    Hentech
                </a>
            </footer>
        </>
    )
}

const Layout = MainLayout;

export default Layout;