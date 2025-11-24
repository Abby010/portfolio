import PortfolioContainer from './components/PortfolioContainer'

function App() {
  try {
    return <PortfolioContainer />
  } catch (error) {
    console.error('App Error:', error)
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        <h1>Error Loading App</h1>
        <p>{error.message}</p>
      </div>
    )
  }
}

export default App
