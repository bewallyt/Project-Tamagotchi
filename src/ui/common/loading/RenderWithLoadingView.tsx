import React, { ReactElement, ReactNode, useRef } from 'react';
import { StyleSheet } from 'react-native';

import { Text } from '@rneui/themed';
import { Fold } from 'react-native-animated-spinkit';

import LoadingOverlay from './LoadingOverlay';
import { FadeInView } from '../animate';

export interface RenderWithLoadingViewProps {
  isLoading: boolean;
  isFetching?: boolean;
  isError?: boolean;
  fetchingComponent?: ReactElement | null;
  errorComponent?: ReactElement;
  useDefaultFetchingComponent?: boolean;
  showWhileLoading?: boolean;
}

/*
If prop `data` is passed in, then `RenderWithLoadingView` will do two things:
- render `loadingComponent` if data is falsy.
- pass `data` of type T (no longer undefined) as the first argument of function prop `children`

The purpose of passing `data` through is to only render `children()` and use type-checked `data` .

 ---tl;dr:--
 - If prop `data` is passed in then prop `children` should be ((data: T) => ReactNode)
 - If prop `data` is not passed in then prop `children` should be ReactNode
 */

const RenderWithLoadingView = <T,>({
  children,
  isLoading,
  isFetching,
  isError,
  fetchingComponent = null,
  errorComponent,
  data,
  useDefaultFetchingComponent,
  showWhileLoading = false,
}: RenderWithLoadingViewProps & {
  data?: T;
  children: ((data: T) => ReactNode) | ReactNode;
}): ReactElement | null => {
  /* prevState is a snapshot of previous (successfully loaded) to show on future invocations where data is undefined (loading) */
  const prevState = useRef<T>();
  if (showWhileLoading && data) {
    prevState.current = data;
  }

  if (isError) {
    return errorComponent ?? <Text>Error loading data. Please try again.</Text>;
  }

  if ((isLoading && !showWhileLoading) || (!prevState.current && data == null && typeof children === 'function')) {
    return (
      <FadeInView style={styles.container}>
        <Fold style={styles.fold} size={48} />
      </FadeInView>
    );
  }
  /*
   Note: Not sure if <LoadingOverlay /> is the best default component, given that fetching times can be really quick.
   It may be better to default to no fetching component (i.e., null).
   */
  return (
    <>
      {/* @fix-me */}
      {/* eslint-disable no-nested-ternary */}
      {isFetching ? (
        useDefaultFetchingComponent ? (
          <LoadingOverlay pending backgroundColor="transparent" zIndex={0} />
        ) : (
          fetchingComponent
        )
      ) : null}
      {/* eslint-enable no-nested-ternary */}
      {/* @fix-me */}
      {/* eslint-disable @typescript-eslint/no-non-null-assertion */}
      {typeof children === 'function' ? children(data ?? prevState.current!) : children}
      {/* eslint-enable @typescript-eslint/no-non-null-assertion */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
  fold: {
    transform: [{ translateX: -24 }, { translateY: -24 }],
    '&&': {
      position: 'absolute',
    },
  },
});

export default RenderWithLoadingView;
