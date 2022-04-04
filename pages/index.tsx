import React from 'react'
import dynamic from 'next/dynamic'

const Loading = () => {
  return <div>Loading...</div>
}

const DynamicComponent = dynamic(() => import('../components/debug'), {
  loading: Loading,
  ssr: false,
})

const DebugPage: React.FC = () => {
  return (
    <div>
      <h1>Debug Page</h1>
      <div>
        <DynamicComponent />
      </div>
    </div>
  )
}

export default DebugPage
