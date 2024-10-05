import {useCallback, useEffect, useState} from 'react'; // Your axios instance configured with baseURL and credentials
import AuthService from '../services/auth.service';

let isAuthInitialized = false;
let isAuthenticatedState = false;
let setIsAuthenticatedState: (status: boolean) => void = () => {};

export const useAuth = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(isAuthenticatedState);

  setIsAuthenticatedState = setIsAuthenticated;

  const checkAuthStatus = useCallback(async () => {
    const res = await AuthService.validateAuth();
    setIsAuthenticatedState(res);
    setIsAuthenticating(false);
    isAuthenticatedState = res;
  }, []);

  useEffect(() => {
    if (!isAuthInitialized) {
      isAuthInitialized = true;
      checkAuthStatus();
    } else {
      setIsAuthenticated(isAuthenticatedState);
      setIsAuthenticating(false);
    }
  }, [checkAuthStatus]);

  return {
    isAuthenticating,
    isAuthenticated,
    setIsAuthenticated,
  };
};
