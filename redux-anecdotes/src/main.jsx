/** @format */

import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './components/store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
	<QueryClientProvider client={queryClient}>
		<Provider store={store}>
			<App />
		</Provider>
	</QueryClientProvider>
)
