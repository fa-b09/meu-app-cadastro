import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Define o tipo para o contexto
interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  logIn: () => Promise<void>;
  logOut: () => Promise<void>;
}

const AUTH_TOKEN_KEY = 'user_auth_token';
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Este é o "Provedor" que gerencia o estado
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Começa carregando

  // Efeito para verificar o AsyncStorage na inicialização
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
        setIsLoggedIn(!!token); // !!token é true se token existir, false se for null
      } catch (error) {
        console.error("Erro ao ler AsyncStorage:", error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false); // Termina o carregamento
      }
    };
    checkLoginStatus();
  }, []);

  // Função de Login
  const logIn = async () => {
    setIsLoading(true);
    try {
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, 'simulated_token');
      setIsLoggedIn(true);
      // Leva para a tela de Clientes (dentro de /app/(app)/)
      router.replace('/(app)/clientes'); 
    } catch (error) {
      console.error("Erro ao salvar token:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Função de Logout
  const logOut = async () => {
    setIsLoading(true);
    try {
      await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
      setIsLoggedIn(false);
      // Leva para a tela de Login (dentro de /app/(auth)/)
      router.replace('./(auth)/index'); 
    } catch (error) {
      console.error("Erro ao remover token:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const value = { isLoggedIn, isLoading, logIn, logOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook para usar o contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};