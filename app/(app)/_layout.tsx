// EM app/(app)/_layout.tsx

import { Stack } from 'expo-router';
import React from 'react';

// Importe aqui qualquer Context Provider ou lógica que SÓ se aplica a usuários LOGADOS
// (Mas evite useState/useEffect aqui para não causar loops)

export default function AppStackLayout() {
  return (
    <Stack>
      {/* O nome 'index' corresponde a app/(app)/index.tsx */}
      <Stack.Screen name="index" options={{ title: 'Home Logada' }} />
      
      {/* Outras telas da área logada */}
      <Stack.Screen name="clientes" options={{ title: 'Lista de Clientes' }} />
      <Stack.Screen name="cadastro" options={{ title: 'Novo Cadastro' }} />

      {/* Se houver um _layout.tsx dentro de outra pasta (ex: (app)/config/), use o nome da pasta */}
      {/* <Stack.Screen name="config" options={{ headerShown: false }} /> */}
    </Stack>
  );
}