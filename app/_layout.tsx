import { Redirect } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

// IMPORTANTE:
// 1. Use chaves {} na importação (pois é um export nomeado)
// 2. O caminho é '../AuthContext' (assumindo que AuthContext.tsx está na raiz, fora da pasta /app)
import { AuthProvider, useAuth } from './AuthContext';

// 1. Envolve todo o aplicativo com o "Cérebro" (AuthProvider)
// Este componente é o que será renderizado primeiro
const RootLayout = () => {
  return (
    // O AuthProvider fornece o contexto de login/logout para todo o app
    <AuthProvider>
      <LayoutContent />
    </AuthProvider>
  );
};

// 2. Este é o "Porteiro" que decide para onde redirecionar
// Ele só é renderizado DEPOIS que o AuthProvider está pronto
const LayoutContent = () => {
  // Pega o estado ATUALIZADO do "Cérebro" (AuthContext)
  const { isLoggedIn, isLoading } = useAuth();

  // ESTADO DE CARREGAMENTO (Resolve o freeze do GitHub Pages)
  // Se o isLoading for true, mostramos a tela de "Verificando..."
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F0F0F5' }}>
        <ActivityIndicator size="large" color="#673AB7" />
        <Text style={{ marginTop: 10, fontSize: 16 }}>Verificando autenticação...</Text>
      </View>
    );
  }

  // ESTADO DESLOGADO
  // Se o carregamento terminou (isLoading=false) E o usuário não está logado
  if (!isLoggedIn) {
    // Redireciona para a tela de Login (index.tsx dentro do grupo (auth))
    return <Redirect href="./(auth)/index" />; 
  }

  // ESTADO LOGADO
  // Se o carregamento terminou (isLoading=false) E o usuário está logado
  if (isLoggedIn) {
     // Redireciona para a tela de Clientes (clientes.tsx dentro do grupo (app))
    return <Redirect href="./(app)/clientes" />;
  }

  // (Fallback, caso algo dê errado, embora não deva chegar aqui)
  return <Redirect href="./(auth)/index" />;
};

// Exporta o RootLayout como padrão para este arquivo de rota
export default RootLayout;