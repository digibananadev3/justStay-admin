import { RouterProvider } from 'react-router-dom';
import router from './routes/router';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './services/api/queryClient';
import { store } from './redux/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </Provider>
    </>
  )
}

export default App
