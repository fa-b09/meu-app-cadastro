import AsyncStorage from '@react-native-async-storage/async-storage';
import { ClienteData } from '../types/ClienteData';

const isWeb = typeof window !== 'undefined';

const getItem = async (key: string): Promise<string | null> => {
  return isWeb ? localStorage.getItem(key) : await AsyncStorage.getItem(key);
};

const setItem = async (key: string, value: string): Promise<void> => {
  return isWeb ? localStorage.setItem(key, value) : await AsyncStorage.setItem(key, value);
};

const removeItem = async (key: string): Promise<void> => {
  return isWeb ? localStorage.removeItem(key) : await AsyncStorage.removeItem(key);
};

export const salvarCliente = async (cliente: ClienteData): Promise<void> => {
  const dados = await getItem('clientes');
  const lista: ClienteData[] = dados ? JSON.parse(dados) : [];
  lista.push(cliente);
  await setItem('clientes', JSON.stringify(lista));
};

export const buscarClientes = async (): Promise<ClienteData[]> => {
  const dados = await getItem('clientes');
  return dados ? JSON.parse(dados) : [];
};

export const editarCliente = async (id: string, novosDados: Partial<ClienteData>): Promise<void> => {
  const dados = await getItem('clientes');
  const lista: ClienteData[] = dados ? JSON.parse(dados) : [];
  const atualizada = lista.map((c) =>
    c.id === id ? { ...c, ...novosDados, dataAlteracao: new Date().toISOString() } : c
  );
  await setItem('clientes', JSON.stringify(atualizada));
};

export const excluirCliente = async (id: string): Promise<void> => {
  const dados = await getItem('clientes');
  const lista: ClienteData[] = dados ? JSON.parse(dados) : [];
  const filtrada = lista.filter((c) => c.id !== id);
  await setItem('clientes', JSON.stringify(filtrada));
};

export const limparTodosClientes = async (): Promise<void> => {
  await removeItem('clientes');
};