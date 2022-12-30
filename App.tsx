import React from 'react';

import 'expo-dev-client';

import { ThemeProvider } from '@rneui/themed';
import theme from 'ui/theme';
import { RenderWithLoadingView } from 'ui/common';

import { WorkoutView } from 'app';
import { useHealthPermissions } from 'hooks';

export default function App() {
  const { authorizing, error, isAuthorized } = useHealthPermissions();
  return (
    <ThemeProvider theme={theme}>
      <RenderWithLoadingView isLoading={authorizing || !isAuthorized} isError={!!error}>
        <WorkoutView />
      </RenderWithLoadingView>
    </ThemeProvider>
  );
}
