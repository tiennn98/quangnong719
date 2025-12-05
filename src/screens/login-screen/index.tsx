import {yupResolver} from '@hookform/resolvers/yup';
import React, {useCallback} from 'react';
import {Controller, FormProvider, useForm} from 'react-hook-form';
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import * as yup from 'yup';

import {Images} from '@/assets';
import {CInput, CText} from '@/components';
import CButton from '@/components/button';
import {SCREEN_NAME} from '@/constants';
import {useLogin} from '@/hooks/useAuth';
import {navigate} from '@/navigators';
import {Colors} from '@/themes';
import {styles} from './styles.module';

const validationSchema = yup.object({
  phone: yup
    .string()
    .trim()
    .required('Vui lòng nhập số điện thoại')
    .matches(/^[0-9]+$/, 'Số điện thoại chỉ được chứa số')
    .test(
      'vn-phone',
      'Số điện thoại không hợp lệ (đầu số phải là 03, 05, 07, 08, 09)',
      value => {
        if (!value) {
          return false;
        }
        if (value.length < 10) {
          return false;
        }
        return /^(03|05|07|08|09)[0-9]{8}$/.test(value);
      },
    ),
  acceptTerms: yup
    .boolean()
    .oneOf(
      [true],
      'Bạn cần đồng ý với Điều khoản dịch vụ và Chính sách bảo mật',
    ),
});

type LoginFormValues = {
  phone: string;
  acceptTerms?: boolean;
};

const LoginScreen = () => {
  const form = useForm<LoginFormValues>({
    defaultValues: {
      phone: '',
      acceptTerms: false,
    },
    resolver: yupResolver(validationSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const {
    handleSubmit,
    control,
    formState: {errors},
  } = form;

  const loginMutation = useLogin();

  const onSubmit = useCallback(
    (values: LoginFormValues) => {
      loginMutation.mutate(values.phone, {
        onSuccess: () => {
          navigate(SCREEN_NAME.CONFIRM_OTP_SCREEN, {phone: values.phone});
        },
        onError: (error: any) => {
          const message =
            error instanceof Error
              ? error.message
              : 'Gửi OTP không thành công, vui lòng thử lại!';
          Alert.alert('Thông báo', message);
        },
      });
    },
    [loginMutation],
  );

  const isButtonDisabled = loginMutation.isPending;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled">
            <FormProvider {...form}>
              <View style={styles.contentContainer}>
                <View style={styles.viewImage}>
                  <Image
                    source={Images.logo}
                    resizeMode="contain"
                    style={styles.imageLogo}
                  />
                </View>

                <View style={styles.center}>
                  <CText color={Colors.h2}>Nông dân cần - Có Quang Nông</CText>
                </View>

                <View style={styles.whiteBox}>
                  <CText style={styles.titleText}>
                    Đăng nhập bằng tài khoản của bạn
                  </CText>

                  <CText style={styles.subtitleText}>
                    Nhập số điện thoại của bạn để nhận mã OTP
                  </CText>

                  <CText style={styles.labelText}>Nhập số điện thoại</CText>

                  <CInput
                    name="phone"
                    placeholder="Nhập 10 số điện thoại của bạn"
                    keyboardType="phone-pad"
                    maxLength={10}
                    style={styles.input}
                    returnKeyType="done"
                    onSubmitEditing={Keyboard.dismiss}
                  />

                  <View style={styles.viewButton}>
                    <CButton
                      title={
                        loginMutation.isPending
                          ? 'Đang gửi OTP...'
                          : 'Đăng nhập'
                      }
                      onPress={handleSubmit(onSubmit)}
                      disabled={isButtonDisabled}
                      isLoading={loginMutation.isPending}
                      style={styles.button}
                    />
                  </View>

                  <CText color={Colors.h2}>
                    Chưa có tài khoản? Bạn sẽ được tạo sau khi xác minh OTP
                  </CText>
                </View>

                <Controller
                  control={control}
                  name="acceptTerms"
                  render={({field: {value, onChange}}) => (
                    <View>
                      <TouchableOpacity
                        style={styles.rowAgree}
                        activeOpacity={0.8}
                        onPress={() => onChange(!value)}>
                        <View style={styles.checkbox}>
                          {value && (
                            <Image
                              source={Images.iconCheckedbox}
                              style={styles.checkboxDot}
                            />
                          )}
                        </View>

                        <CText color={Colors.h2} style={styles.termsText}>
                          Bằng cách tiếp tục, bạn đồng ý với{' '}
                          <CText style={styles.linkText}>
                            Điều khoản dịch vụ
                          </CText>
                          {' và '}
                          <CText style={styles.linkText}>
                            Chính sách bảo mật
                          </CText>
                          {' của chúng tôi'}
                        </CText>
                      </TouchableOpacity>

                      {errors.acceptTerms && (
                        <CText style={styles.errorText}>
                          {errors.acceptTerms.message as string}
                        </CText>
                      )}
                    </View>
                  )}
                />
              </View>
            </FormProvider>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
