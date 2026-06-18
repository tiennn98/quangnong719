import { Linking, Platform } from 'react-native';

export const callPhoneNumber = () => {
  const phoneNumber = '0922982986';
  let dialString = '';
  if (Platform.OS === 'android') {
    dialString = `tel:${phoneNumber}`;
  } else {
    dialString = `telprompt:${phoneNumber}`;
  }
  Linking.openURL(dialString).catch(err =>
    console.error('Error opening dialer:', err),
  );
};
