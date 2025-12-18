import { yupResolver } from '@hookform/resolvers/yup';
import { Calendar, Camera, ChevronDown, MapPin, User2 } from 'lucide-react-native';
import React, { useCallback, useMemo, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fontScale, scale } from 'react-native-utils-scale';
import * as yup from 'yup';

import CButton from '@/components/button';
import CInput from '@/components/input';
import CText from '@/components/text';
import { Colors } from '@/themes';
import CropMultiSelect, { CropOption } from './components/CropMultiSelect';
import { styles } from './style.module';

type FormValues = {
  avatarUri?: string | null;
  fullName: string;
  addressLine: string;
  area: {id: string; name: string} | null;
  ward: {id: string; name: string} | null;
  birthday?: string;
  crops: string[];
};

const schema: yup.ObjectSchema<FormValues> = yup.object({
  avatarUri: yup.string().optional().nullable(),
  fullName: yup.string().trim().required('Vui lòng nhập Họ và tên'),
  addressLine: yup.string().trim().required('Vui lòng nhập Địa chỉ'),
  area: yup.mixed().required('Vui lòng chọn Khu vực').nullable(false),
  ward: yup.mixed().nullable(true),
  birthday: yup.string().optional(),
  crops: yup.array().of(yup.string().required()).min(1, 'Vui lòng chọn ít nhất 1 loại cây').required(),
});

const cropsData: CropOption[] = [
  {id: 'coffee', label: 'Cà phê'},
  {id: 'durian', label: 'Sầu riêng'},
  {id: 'pepper', label: 'Tiêu'},
  {id: 'rice', label: 'Lúa'},
  {id: 'cassava', label: 'Khoai mì'},
  {id: 'avocado', label: 'Bơ'},
  {id: 'cashew', label: 'Điều'},
  {id: 'banana', label: 'Chuối'},
];

const ProfileCompletionScreen: React.FC = () => {
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<FormValues>({
    defaultValues: {
      avatarUri: null,
      fullName: '',
      addressLine: '',
      area: null,
      ward: null,
      birthday: '',
      crops: [],
    },
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const {
    handleSubmit,
    setValue,
    watch,
    formState: {errors, isDirty, isValid},
  } = form;

  const selectedCrops = watch('crops');
  const area = watch('area');

  const progress = useMemo(() => {
    let done = 0;
    if (watch('fullName')?.trim()) {done++;}
    if (watch('addressLine')?.trim()) {done++;}
    if (watch('area')) {done++;}
    if ((watch('crops') || []).length > 0) {done++;}
    return done / 4;

  }, [watch('fullName'), watch('addressLine'), watch('area'), watch('crops')]);

  const onPickAvatar = useCallback(async () => {
    try {
      setUploadingAvatar(true);

      await new Promise(r => setTimeout(r, 500));
      setValue('avatarUri', 'mock://new-avatar-uri', {shouldDirty: true});
    } finally {
      setUploadingAvatar(false);
    }
  }, [setValue]);

  const onPickArea = useCallback(() => {

    setValue('area', {id: '79-q1', name: 'TP.HCM - Quận 1'}, {shouldDirty: true});
    setValue('ward', null, {shouldDirty: true});
  }, [setValue]);

  const onPickWard = useCallback(() => {
    if (!area) {return;}

    setValue('ward', {id: 'bn', name: 'Phường Bến Nghé'}, {shouldDirty: true});
  }, [area, setValue]);

  const onPickBirthday = useCallback(() => {

    setValue('birthday', '1990-01-01', {shouldDirty: true});
  }, [setValue]);

  const submitDisabled = !isDirty || !isValid || submitting || uploadingAvatar;

  const onSubmit = useCallback(async (values: FormValues) => {
    Keyboard.dismiss();
    setSubmitting(true);
    try {

      await new Promise(r => setTimeout(r, 700));
      console.log(values);
    } finally {
      setSubmitting(false);
    }
  }, []);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 8 : 0}>
        <FormProvider {...form}>
          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>

            <View style={styles.brandRow}>
              <View style={styles.logoDot} />
              <CText style={styles.brandName}>Quang Nông 719</CText>
            </View>

            <View style={styles.heroCard}>
              <CText style={styles.h1}>Hoàn tất hồ sơ của bạn</CText>
              <CText style={styles.sub}>Hãy cho chúng tôi biết về vườn cây của bạn</CText>


              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, {width: `${Math.round(progress * 100)}%`}]} />
              </View>
              <CText style={styles.progressText}>
                {Math.round(progress * 100)}% • Còn {4 - Math.round(progress * 4)} mục bắt buộc
              </CText>


              <View style={styles.tipBanner}>
                <CText style={styles.tipText}>🎉 Gần xong rồi! Hoàn thiện hồ sơ để bắt đầu sử dụng</CText>
              </View>
            </View>


            <View style={styles.formCard}>

              <View style={styles.avatarRow}>
                <View style={styles.avatarCircle}>
                  <Camera size={22} color={'rgba(0,0,0,0.55)'} />
                </View>

                <View style={{flex: 1}}>
                  <CText style={styles.sectionLabel}>Ảnh đại diện (Không bắt buộc)</CText>
                  <Pressable
                    onPress={onPickAvatar}
                    style={({pressed}) => [
                      styles.uploadBtn,
                      pressed && {opacity: 0.92},
                    ]}>
                    <CText style={styles.uploadText}>
                      {uploadingAvatar ? 'Đang tải...' : 'Tải ảnh lên'}
                    </CText>
                  </Pressable>
                  <CText style={styles.hint}>Ảnh không được vượt quá 2MB</CText>
                </View>
              </View>


              <LabelRow label="Họ và tên" required icon={<User2 size={16} color={Colors.greenPrimary} />} />
              <CInput
                name="fullName"
                placeholder="Nguyễn Văn A"
                fontSize={fontScale(16)}
                returnKeyType="next"
              />


              <View style={{marginTop: scale(12)}} />
              <LabelRow label="Địa chỉ" required icon={<MapPin size={16} color={Colors.greenPrimary} />} />
              <CInput
                name="addressLine"
                placeholder="147 Thôn 8A"
                fontSize={fontScale(16)}
                returnKeyType="next"
              />


              <View style={{marginTop: scale(12)}} />
              <LabelRow label="Khu vực" required />
              <SelectBox
                value={watch('area')?.name || 'Nhập tìm Tỉnh/Thành phố - Quận/Huyện'}
                onPress={onPickArea}
                error={!!errors.area}
              />
              {errors.area ? <ErrorText text={errors.area.message as string} /> : null}


              <View style={{marginTop: scale(12)}} />
              <LabelRow label="Phường/Xã" />
              <SelectBox
                value={watch('ward')?.name || 'Nhập tìm Phường/Xã'}
                onPress={onPickWard}
                disabled={!area}
                hint={!area ? 'Vui lòng chọn Khu vực trước' : undefined}
              />


              <View style={{marginTop: scale(12)}} />
              <LabelRow label="Sinh nhật (Không bắt buộc)" icon={<Calendar size={16} color={Colors.greenPrimary} />} />
              <SelectBox
                value={watch('birthday') || 'Bấm để chọn ngày'}
                onPress={onPickBirthday}
              />


              <View style={{marginTop: scale(14)}} />
              <LabelRow label="Bạn đang trồng những loại cây nào?" required />
              <Controller
                name="crops"
                render={({field: {value, onChange}}) => (
                  <CropMultiSelect
                    options={cropsData}
                    value={value || []}
                    onChange={onChange}
                    columns={2}
                    maxVisible={8}
                  />
                )}
              />
              {errors.crops ? <ErrorText text={errors.crops.message as string} /> : null}
            </View>

            <View style={{height: scale(90)}} />
          </ScrollView>


          <View style={styles.bottomBar}>
            {Object.keys(errors).length ? (
              <CText style={styles.bottomHint}>
                Vui lòng kiểm tra lại các mục bắt buộc (*)
              </CText>
            ) : null}

            <CButton
              title={submitting ? 'Đang hoàn tất...' : 'Hoàn tất'}
              onPress={handleSubmit(onSubmit)}
              disabled={submitDisabled}
              isLoading={submitting || uploadingAvatar}
              style={styles.cta}
            />
          </View>
        </FormProvider>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ProfileCompletionScreen;


const LabelRow = ({
  label,
  required,
  icon,
}: {
  label: string;
  required?: boolean;
  icon?: React.ReactNode;
}) => {
  return (
    <View style={styles.labelRow}>
      {icon ? <View style={styles.labelIcon}>{icon}</View> : null}
      <CText style={styles.label}>
        {label} {required ? <CText style={{color: Colors.red}}>*</CText> : null}
      </CText>
    </View>
  );
};

const SelectBox = ({
  value,
  onPress,
  disabled,
  hint,
  error,
}: {
  value: string;
  onPress: () => void;
  disabled?: boolean;
  hint?: string;
  error?: boolean;
}) => {
  return (
    <View>
      <Pressable
        disabled={disabled}
        onPress={onPress}
        style={({pressed}) => [
          styles.select,
          disabled && styles.selectDisabled,
          error && styles.selectError,
          pressed && !disabled && {opacity: 0.92},
        ]}>
        <CText style={[styles.selectText, value.includes('Nhập') || value.includes('Bấm') ? styles.placeholder : null]}>
          {value}
        </CText>
        <ChevronDown size={18} color={'rgba(0,0,0,0.45)'} />
      </Pressable>
      {hint ? <CText style={styles.hint}>{hint}</CText> : null}
    </View>
  );
};

const ErrorText = ({text}: {text: string}) => (
  <CText style={styles.err}>{text}</CText>
);

