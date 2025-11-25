import React, {useImperativeHandle, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {BarIndicator} from 'react-native-indicators';
import Modal from 'react-native-modal';
import {scale} from 'react-native-utils-scale';

export const globalLoadingRef = React.createRef<any>();

export const globalLoading = {
  show: () => {
    globalLoadingRef?.current?.show();
  },
  hide: () => {
    globalLoadingRef?.current?.hide();
  },
  showWithMessage: (message: string) => {
    globalLoadingRef?.current?.showWithMessage(message);
  },
  hideWithMessage: (message: string) => {
    globalLoadingRef?.current?.hideWithMessage(message);
  },
};

const GlobalLoading = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState<boolean>(false);

  useImperativeHandle(ref, () => {
    return {
      show: show,
      hide: hide,
      showWithMessage: showWithMessage,
      hideWithMessage: hideWithMessage,
    };
  });

  const show = () => {
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };

  const showWithMessage = (_message: string) => {
    setVisible(true);
  };

  const hideWithMessage = (_message: string) => {
    setTimeout(() => {
      setVisible(false);
    }, 1000);
  };

  return (
    <Modal
      isVisible={visible}
      useNativeDriver={true}
      animationInTiming={1}
      animationOutTiming={1}
      hideModalContentWhileAnimating
      style={styles.modal}>
      <View style={styles.logoContainer}>
        <BarIndicator color="#EDEEF0" size={scale(30)} />
      </View>
    </Modal>
  );
});

export default GlobalLoading;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
