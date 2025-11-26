import {Images} from '@/assets';
import {CInput, CText} from '@/components';
import {Colors, Fonts} from '@/themes';
import React, {useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import {scale, width} from 'react-native-utils-scale';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import CButton from '@/components/button';

const validationSchema = yup.object({
  phone: yup
    .string()
    .required('Vui lòng nhập số điện thoại')
    .matches(/^[0-9]{10}$/, 'Số điện thoại phải có 10 chữ số'),
});

const LoginScreen = () => {
  const form = useForm({
    defaultValues: {
      phone: '',
    },
    resolver: yupResolver(validationSchema),
  });
  const [phoneNumber, setPhoneNumber] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <FormProvider {...form}>
        <View style={styles.contentContainer}>
          <View style={styles.viewImage}>
            <Image
              source={Images.logo}
              resizeMode="contain"
              style={styles.imageLogo}
            />
          </View>
          <View>
            <CText color={Colors.white}>
              {'Xin chào! Chào mừng bà con đến với'}
            </CText>
            <CText color={Colors.white} fontSize={30} fontFamily={Fonts.BOLD}>
              {'Quang Nông 719'}
            </CText>
          </View>
          <View style={styles.gap}>
            <CText color={Colors.white}>{'Nhập số điện thoại'}</CText>
            <CInput
              name="phone"
              isIconPhone
              value={phoneNumber}
              onChangeText={text => setPhoneNumber(text)}
              keyboardType="phone-pad"
              maxLength={12}
            />
          </View>
          <View style={styles.viewButton}>
            <CButton title="Đăng nhập" onPress={() => {}} />
          </View>
        </View>
      </FormProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: scale(20),
    gap: scale(20),
  },
  viewImage: {
    alignItems: 'center',
    marginTop: scale(50),
  },
  imageLogo: {
    width: width / 2.5,
    height: width / 2.5,
  },
  viewButton: {
    paddingHorizontal: scale(50),
    marginTop: scale(20),
  },
  gap: {
    gap: scale(8),
  },
});

export default LoginScreen;
