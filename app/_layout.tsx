import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';

// 1. Define o tipo para o contexto de autenticação
interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  logIn: () => Promise<void>;
  logOut: () => Promise<void>;
}

// Chave para armazenar o token de autenticação no AsyncStorage
const AUTH_TOKEN_KEY = 'user_auth_token';

// 2. Cria o Contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Cria o Provedor de Autenticação (AuthProvider)
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Começa como true para verificar o AsyncStorage

  // Efeito para carregar o estado de login do AsyncStorage
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
        if (token) {
          // Se houver um token, o usuário está logado
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Erro ao ler AsyncStorage:", error);
        setIsLoggedIn(false); // Assume não logado em caso de erro
      } finally {
        setIsLoading(false); // O carregamento inicial terminou, mesmo que tenha falhado
      }
    };
    checkLoginStatus();
  }, []);

  // Função para simular o login (salva um token fictício)
  const logIn = async () => {
    setIsLoading(true);
    // Simulação de autenticação bem-sucedida
    try {
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, 'simulated_jwt_token_123');
      setIsLoggedIn(true);
      // CORREÇÃO: Adicionamos '/index' para navegar para o arquivo dentro do grupo (app)
      router.replace('/(app)/clientes'); 
    } catch (error) {
      console.error("Erro ao salvar token:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para simular o logout (remove o token)
  const logOut = async () => {
    setIsLoading(true);
    try {
      await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
      setIsLoggedIn(false);
      // CORREÇÃO: Adicionamos '/index' para navegar para o arquivo dentro do grupo (auth)
      router.replace('/(auth)'); 
    } catch (error) {
      console.error("Erro ao remover token:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    isLoggedIn,
    isLoading,
    logIn,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 4. Hook customizado para usar o contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

// Lembre-se de instalar a biblioteca se ainda não o fez:
// npx expo install @react-native-async-storage/async-storage