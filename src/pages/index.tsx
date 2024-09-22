import Head from "next/head";
import styles from "./Home.module.scss";
export default function Home() {
    return (
        <main>
            <div className={styles.container}>
                <Head>
                    <title>Private Tutor</title>
                    <meta name="description" />
                </Head>

                <main className={styles.main}>
                    <div className={styles.main__content}>
                        <h1 className={styles.main__content__title}>
                            Welcome to Private Tutor
                        </h1>
                    </div>

                    <section className={styles.main__features}>
                        <h2 className={styles.main__features__title}>Features</h2>
                        <div className={styles.main__featureContainer}>
                            <div className={styles.main__feature__first}>
                                <div className={styles.main__feature__first__content}>
                                    <h3>Belajar dirumah</h3>
                                    <p>
                                        Manfaatkan waktu di rumah dengan belajar secara fleksibel,
                                        sesuai kebutuhanmu.
                                    </p>
                                </div>
                            </div>
                            <div className={styles.main__feature__second}>
                                <div className={styles.main__feature__second__content}>
                                    <h3>Kembangkan Skillmu</h3>
                                    <p>
                                        Perdalam kemampuanmu dengan berbagai kursus yang dirancang
                                        untuk mengasah keahlian praktis.
                                    </p>
                                </div>
                            </div>
                            <div className={styles.main__feature__third}>
                                <div className={styles.main__feature__third__content}>
                                    <h3>Berbagai Jenis Materi</h3>
                                    <p>
                                        Jelajahi beragam topik dan materi pelajaran yang tersedia
                                        untuk mendukung perkembanganmu.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
                {/*
        <footer className={styles.footer}>
          <p>© 2024 My Landing Page. All rights reserved.</p>
        </footer> */}
            </div>
        </main>
    );
}
