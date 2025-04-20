import { useState, useEffect } from 'react'
// import { useSession, getSession } from 'next-auth/react'
import MainLayout from '../components/layout/MainLayout'
import { toast } from 'react-hot-toast'

export default function AccountIntegrationsPage() {
  // Auth is enabled for integrations; if you’re not using auth temporarily, you can remove the useSession calls.
  const { data: session } = {}; // If disabling auth, leave this empty or remove session checks.

  const [integrations, setIntegrations] = useState({
    facebook: { connected: false, username: '', password: '' },
    keyglee: { connected: false, username: '', password: '' },
    offermarket: { connected: false, username: '', password: '' },
    wholster: { connected: false, username: '', password: '' },
    propstream: { connected: false, apiKey: '' },
    reddit: { connected: false, username: '', password: '' },
    dealmachine: { connected: false, apiKey: '' },
    biggerpockets: { connected: false, username: '', password: '' },
    dealsauce: { connected: false, username: '', password: '' }
  })

  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('facebook')

  useEffect(() => {
    // Load saved integrations from API
    const loadIntegrations = async () => {
      try {
        const response = await fetch('/api/account/integrations')
        if (response.ok) {
          const data = await response.json()
          setIntegrations(data.integrations)
        }
      } catch (error) {
        console.error('Error loading integrations:', error)
      }
    }
    // If auth were enabled, check session here; for now, call loadIntegrations directly
    loadIntegrations()
  }, [])

  const handleInputChange = (platform, field, value) => {
    setIntegrations(prev => ({
      ...prev,
      [platform]: { ...prev[platform], [field]: value }
    }))
  }

  const handleConnect = async (platform) => {
    setLoading(true)
    try {
      const response = await fetch('/api/account/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform,
          credentials: integrations[platform]
        }),
      })
      const data = await response.json()
      if (response.ok) {
        setIntegrations(prev => ({
          ...prev,
          [platform]: { ...prev[platform], connected: true }
        }))
        toast.success(`Successfully connected to ${platform}!`)
      } else {
        toast.error(data.message || `Failed to connect to ${platform}`)
      }
    } catch (error) {
      console.error(`Error connecting to ${platform}:`, error)
      toast.error(`Error connecting to ${platform}. Please try again.`)
    } finally {
      setLoading(false)
    }
  }

  const handleDisconnect = async (platform) => {
    setLoading(true)
    try {
      const response = await fetch('/api/account/disconnect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platform }),
      })
      if (response.ok) {
        setIntegrations(prev => ({
          ...prev,
          [platform]: { ...prev[platform], connected: false }
        }))
        toast.success(`Successfully disconnected from ${platform}`)
      } else {
        const data = await response.json()
        toast.error(data.message || `Failed to disconnect from ${platform}`)
      }
    } catch (error) {
      console.error(`Error disconnecting from ${platform}:`, error)
      toast.error(`Error disconnecting from ${platform}. Please try again.`)
    } finally {
      setLoading(false)
    }
  }

  const renderTabContent = () => {
    const platform = activeTab
    const integration = integrations[platform]

    return (
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4 capitalize">{platform} Integration</h3>
        {integration.connected ? (
          <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">Connected to {platform}</p>
              </div>
            </div>
            <div className="mt-4">
              <button
                type="button"
                onClick={() => handleDisconnect(platform)}
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                {loading ? 'Disconnecting...' : 'Disconnect'}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {platform === 'propstream' || platform === 'dealmachine' ? (
              <div>
                <label htmlFor={`${platform}-apiKey`} className="block text-sm font-medium text-gray-700">API Key</label>
                <input
                  type="text"
                  id={`${platform}-apiKey`}
                  value={integration.apiKey || ''}
                  onChange={(e) => handleInputChange(platform, 'apiKey', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
            ) : (
              <>
                <div>
                  <label htmlFor={`${platform}-username`} className="block text-sm font-medium text-gray-700">Username or Email</label>
                  <input
                    type="text"
                    id={`${platform}-username`}
                    value={integration.username || ''}
                    onChange={(e) => handleInputChange(platform, 'username', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor={`${platform}-password`} className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    id={`${platform}-password`}
                    value={integration.password || ''}
                    onChange={(e) => handleInputChange(platform, 'password', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
              </>
            )}
            <div className="pt-4">
              <button
                type="button"
                onClick={() => handleConnect(platform)}
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                {loading ? 'Connecting...' : 'Connect'}
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <MainLayout title="Account Integrations">
      <div className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900">Account Integrations</h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Connect your accounts to search for wholesale deals across multiple platforms.</p>
          </div>
          <div className="border-t border-gray-200">
            <div className="px-4 py-5 sm:p-6">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  {Object.keys(integrations).map((platform) => (
                    <button
                      key={platform}
                      onClick={() => setActiveTab(platform)}
                      className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === platform ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                    >
                      <span className="capitalize">{platform}</span>
                      {integrations[platform].connected && (
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Connected
                        </span>
                      )}
                    </button>
                  ))}
                </nav>
              </div>
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

// For integration pages, if auth is required, update getServerSideProps accordingly.
// Here we provide a mock fallback.
export async function getServerSideProps() {
  return { props: {} }
}
