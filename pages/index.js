import Head from 'next/head'
import Link from 'next/link'
// import { useSession, signIn } from 'next-auth/react'
import styles from '../styles/Home.module.css'

export default function Home() {
  // Auth is disabled – do not call useSession()
  // const { data: session } = useSession()

  return (
    <div className={styles.container}>
      <Head>
        <title>Wholesale Deal Finder</title>
        <meta name="description" content="Find wholesale real estate deals across multiple platforms" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <span className="text-primary-500">Wholesale Deal Finder</span>
        </h1>

        <p className={styles.description}>
          Find the best wholesale real estate deals across multiple platforms
        </p>

        <div className={styles.grid}>
          <Link href="/search" className={styles.card}>
            <h3>Search Deals &rarr;</h3>
            <p>Search for wholesale deals across multiple platforms.</p>
          </Link>
          
          <Link href="/buyboxes" className={styles.card}>
            <h3>Manage Buy Boxes &rarr;</h3>
            <p>Create and manage your investment criteria.</p>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Powered by Axiom Creative Real Estate Investments</p>
      </footer>
    </div>
  )
}
