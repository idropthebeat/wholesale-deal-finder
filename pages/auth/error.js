import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'

export default function AuthError() {
  const router = useRouter()
  const { error } = router.query

  let errorMessage = 'An error occurred during authentication'
  if (error === 'Signin') {
    errorMessage = 'Try signing in with a different account'
  } else if (error === 'OAuthSignin') {
    errorMessage = 'Error in OAuth sign in'
  } else if (error === 'OAuthCallback') {
    errorMessage = 'Error in OAuth callback'
  } else if (error === 'OAuthCreateAccount') {
    errorMessage = 'Error creating OAuth account'
  } else if (error === 'EmailCreateAccount') {
    errorMessage = 'Error creating email account'
  } else if (error === 'Callback') {
    errorMessage = 'Error in callback'
  } else if (error === 'OAuthAccountNotLinked') {
    errorMessage = 'Email already in use with different provider'
  } else if (error === 'EmailSignin') {
    errorMessage = 'Check your email address'
  } else if (error === 'CredentialsSignin') {
    errorMessage = 'Invalid email or password'
  } else if (error === 'SessionRequired') {
    errorMessage = 'Please sign in to access this page'
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Authentication Error | Wholesale Deal Finder</title>
      </Head>
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Authentication Error
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {errorMessage}
          </p>
        </div>
        <div className="flex justify-center">
          <Link href="/auth/signin" className="font-medium text-primary-600 hover:text-primary-500">
            Return to sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
