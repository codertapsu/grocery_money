import './App.css';
import { Web3ContextProvider } from './contexts/wallet.context';
import { Demo } from './components/demo';

function App() {
  console.log('App');
  
  return (
    <Web3ContextProvider>
      <div className='App'>
        <Demo />
      </div>
    </Web3ContextProvider>
  );
}

export default App;
