import AsyncStorage from '@react-native-async-storage/async-storage';

const isWeb = typeof window !== 'undefined';
const STORAGE_KEY = 'usuarioLogado';

// Funções auxiliares
const setItem = async (key: string, value: string) => {
  if (isWeb) {
    localStorage.setItem(key, value);
  } else {
    await AsyncStorage.setItem(key, value);
  }
};

const getItem = async (key: string): Promise<string | null> => {
  if (isWeb) {
    return localStorage.getItem(key);
  } else {
    return await AsyncStorage.getItem(key);
  }
};

const removeItem = async (key: string) => {
  if (isWeb) {
    localStorage.removeItem(key);
  } else {
    await AsyncStorage.removeItem(key);
  }
};

// Funções principais
export const login = async (username: string): Promise<void> => {
  try {
    await setItem(STORAGE_KEY, username);
    console.log('Login salvo com sucesso');
  } catch (error) {
    console.error('Erro ao salvar login:', error);
  }
};

export const logout = async (): Promise<void> => {
  try {
    await removeItem(STORAGE_KEY);
    console.log('Logout realizado com sucesso');
  } catch (error) {
    console.error('Erro ao remover login:', error);
  }
};

export const isLoggedIn = async (): Promise<boolean> => {
  try {
    const user = await getItem(STORAGE_KEY);
    console.log('Verificação de login:', user);
    return Boolean(user);
  } catch (error) {
    console.error('Erro ao verificar login:', error);
    return false;
  }
};