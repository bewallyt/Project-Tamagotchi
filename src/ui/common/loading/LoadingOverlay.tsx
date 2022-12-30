import React, { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet } from 'react-native';

import cx from 'classnames';
import { Fold } from 'react-native-animated-spinkit';

import { FadeInView } from '../animate';

const styles = StyleSheet.create({
  button: {
    margin: 10,
  },
  loadingContainer: {
    height: '100%',
    width: '100%',
    zIndex: 1250,
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    opacity: 0.6,
  },
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

interface IProps {
  pending: boolean;
  showLinearProgress?: boolean;
  backgroundColor?: string;
  opacity?: number;
  zIndex?: number;
  className?: string;
}

// TODO(Benson): Add pending transition fade.
const LoadingOverlay = ({
  showLinearProgress = true,
  children,
  className,
}: PropsWithChildren<IProps>): ReactElement => {
  return (
    <div className={cx(styles.loadingContainer, className)}>
      {showLinearProgress ? (
        <FadeInView style={styles.container}>
          <Fold style={styles.fold} size={48} />
        </FadeInView>
      ) : null}
      {children}
    </div>
  );
};

export default LoadingOverlay;
