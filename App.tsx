import React from 'react';

import 'expo-dev-client';

import { Tab, TabView, ThemeProvider } from '@rneui/themed';
import theme from 'ui/theme';
import { RenderWithLoadingView } from 'ui/common';

import { WorkoutView, StepView, TestThreeView } from 'app';
import { useHealthPermissions } from 'health';

export default function App() {
  const { authorizing, error, isAuthorized } = useHealthPermissions();
  const [index, setIndex] = React.useState(0);
  return (
    <ThemeProvider theme={theme}>
      <RenderWithLoadingView isLoading={authorizing || !isAuthorized} isError={!!error}>
        <>
          <Tab
            style={{ marginTop: 48 }}
            value={index}
            onChange={(e) => setIndex(e)}
            indicatorStyle={{
              backgroundColor: 'white',
              height: 3,
            }}
            variant="primary"
          >
            <Tab.Item title="Workouts" titleStyle={{ fontSize: 12 }} />
            <Tab.Item title="Steps" titleStyle={{ fontSize: 12 }} />
          </Tab>
          <TabView value={index} onChange={setIndex} animationType="spring">
            <TabView.Item style={{ width: '100%' }}>
              <WorkoutView />
            </TabView.Item>
            <TabView.Item style={{ width: '100%' }}>
              <StepView />
            </TabView.Item>
          </TabView>
        </>
      </RenderWithLoadingView>
    </ThemeProvider>
  );
}

// export default function App() {
//   return <TestThreeView />;
// }
