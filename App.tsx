import React from 'react';

import 'expo-dev-client';

import { ThemeProvider } from '@rneui/themed';
import theme from 'ui/theme';
import { RenderWithLoadingView } from 'ui/common';

import { CalorieHeatMapView, CurrentWeekProgressView } from 'app';
import { usePermissions } from 'health';

export default function App() {
  const { authorizing, error, isAuthorized } = usePermissions();
  return (
    <ThemeProvider theme={theme}>
      <RenderWithLoadingView isLoading={authorizing || !isAuthorized} isError={!!error}>
        <CurrentWeekProgressView />
      </RenderWithLoadingView>
    </ThemeProvider>
  );
}
