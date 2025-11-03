import { Redirect, Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

// IMPORTANTE: Ajuste este caminho se o seu arquivo 'auth.ts' estiver em outro lugar
import { isLoggedIn } from '../utils/auth';

export default function RootLayout() {
  const [isLogged, setIsLogged] = useState<boolean | null>(null);

  // 1. EFEITO QUE VERIFICA O LOGIN APENAS UMA VEZ
  useEffect(() => {
    const verificarLogin = async () => {
      // Chama a função de autenticação do seu arquivo utils/auth.ts
      const logado = await isLoggedIn(); 
      console.log('Verificação de login concluída:', logado);
      setIsLogged(logado); // Atualiza o estado
    };
    verificarLogin();
  }, []); // Array de dependências vazio garante que rode apenas na montagem

  // 2. ESTADO DE CARREGAMENTO (Tela de "Verificando Autenticação...")
  if (isLogged === null) {
    console.log('Estado: Carregando...');
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#673AB7" />
        <Text>Verificando autenticação...</Text>
      </View>
    );
  }

  // 3. REDIRECIONAMENTO PARA LOGIN (Área Deslogada)
  if (!isLogged) {
    console.log('Estado: Deslogado. Redirecionando...');
    // O Redirect para "/" fará com que o Router procure a rota mais próxima,
    // que geralmente é a que está no seu grupo (auth).
    return <Redirect href="/(auth)" />; 
  }

  // 4. NAVEGAÇÃO PRINCIPAL (Área Logada)
  console.log('Estado: Logado. Renderizando Stack...');
  return (
    <Stack>
      {/* O nome '(app)' aponta para a pasta app/(app)/_layout.tsx */}
      <Stack.Screen name="(app)" options={{ headerShown: false }} />
      {/* O nome '(auth)' aponta para a pasta app/(auth)/_layout.tsx */}
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
}