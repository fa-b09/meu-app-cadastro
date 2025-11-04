// EM utils/auth.ts

import AsyncStorage from '@react-native-async-storage/async-storage';
// IMPORTANTE: Use 'Platform' do React Native para verificar o ambiente
import { Platform } from 'react-native';

const STORAGE_KEY = 'usuarioLogado'; // Garanta que esta chave está correta

// Função para buscar o valor do armazenamento
const getItem = async (key: string): Promise<string | null> => {
  // Se for o ambiente WEB (navegador):
  if (Platform.OS === 'web') {
    // Certifique-se de que o localStorage existe antes de usar
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage.getItem(key);
    }
    return null; 
  }
  // Para iOS e Android (Ambiente Native):
  return await AsyncStorage.getItem(key);
};

export const isLoggedIn = async (): Promise<boolean> => {
  try {
    const user = await getItem(STORAGE_KEY);
    // Se o valor for uma string não vazia, significa que está logado
    return Boolean(user); 
  } catch (error) {
    console.error('Falha ao verificar o login na web:', error);
    // Em caso de falha de leitura (evita loop):
    return false; 
  }
};

// ... Sua função 'login' deve usar o 'setItem' da mesma forma ...
export const login = async (username: string) => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, username);
    } else {
        await AsyncStorage.setItem(STORAGE_KEY, username);
    }
};

// ... E sua função 'logout' deve usar o 'removeItem' ...
export const logout = async () => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
        window.localStorage.removeItem(STORAGE_KEY);
    } else {
        await AsyncStorage.removeItem(STORAGE_KEY);
    }
};