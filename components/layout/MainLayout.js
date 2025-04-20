import Link from 'next/link'
import Head from 'next/head'

export default function MainLayout({ children, title = 'Wholesale Deal Finder' }) {
  // Auth is disabled – do not call useSession()
  // const { data: session } = useSession()

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>{title} | Wholesale Deal Finder</title>
        <meta name="description" content="Find wholesale real estate deals across multiple platforms" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="text-primary-500 font-bold text-xl">
                  Wholesale Deal Finder
                </Link>
              </div>

             <nav className="ml-6 flex space-x-8">
  <Link href="/search" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
    Search
  </Link>
  <Link href="/buyboxes" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
    Buy Boxes
  </Link>
  <Link href="/account-integrations" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
    Account Integrations
  </Link>
  <Link href="/saved" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
    Saved Deals
  </Link>
</nav>

            </div>

            <div className="flex items-center">
              {/* Auth buttons removed */}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>

      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Axiom Creative Real Estate Investments. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
