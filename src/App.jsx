import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { setupApi } from './api';
import AppContext from './AppContext';
import LoginPage from './pages/LoginPage';
import TodoPage from './pages/TodoPage';

const queryClient = new QueryClient({
  // defaultOptions: {
  //   queries: {
  //     refetchOnWindowFocus: false,
  //   },
  // },
});

export default function App() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    document.getElementById('loader').remove();
    const { token } = window.sessionStorage;
    if (token) setupApi(token);
    setIsInitialized(true);
  }, []);

  if (!isInitialized) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <AppContext>
        <Router>
          <Switch>
            <Route path="/" exact>
              <TodoPage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route>
              404 not found <Link to="/login">login</Link>
            </Route>
          </Switch>
        </Router>
      </AppContext>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
