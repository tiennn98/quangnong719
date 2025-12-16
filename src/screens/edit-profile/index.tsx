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
    StyleSheet,
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

type FormValues = {
  avatarUri?: string | null;
  fullName: string;
  addressLine: string;
  area: {id: string; name: string} | null;   // tỉnh/thành + quận/huyện
  ward: {id: string; name: string} | null;   // phường/xã
  birthday?: string;
  crops: string[];                           // ✅ multi
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('fullName'), watch('addressLine'), watch('area'), watch('crops')]);

  const onPickAvatar = useCallback(async () => {
    try {
      setUploadingAvatar(true);
      // TODO: chọn ảnh thật + upload
      await new Promise(r => setTimeout(r, 500));
      setValue('avatarUri', 'mock://avatar', {shouldDirty: true});
    } finally {
      setUploadingAvatar(false);
    }
  }, [setValue]);

  const onPickArea = useCallback(() => {
    // TODO: open modal area picker
    setValue('area', {id: '79-q1', name: 'TP.HCM - Quận 1'}, {shouldDirty: true});
    setValue('ward', null, {shouldDirty: true});
  }, [setValue]);

  const onPickWard = useCallback(() => {
    if (!area) {return;}
    // TODO: open ward picker filtered by area
    setValue('ward', {id: 'bn', name: 'Phường Bến Nghé'}, {shouldDirty: true});
  }, [area, setValue]);

  const onPickBirthday = useCallback(() => {
    // TODO datepicker
    setValue('birthday', '1990-01-01', {shouldDirty: true});
  }, [setValue]);

  const submitDisabled = !isDirty || !isValid || submitting || uploadingAvatar;

  const onSubmit = useCallback(async (values: FormValues) => {
    Keyboard.dismiss();
    setSubmitting(true);
    try {
      // TODO call API
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
            {/* Header gọn */}
            <View style={styles.brandRow}>
              <View style={styles.logoDot} />
              <CText style={styles.brandName}>Quang Nông 719</CText>
            </View>

            <View style={styles.heroCard}>
              <CText style={styles.h1}>Hoàn tất hồ sơ của bạn</CText>
              <CText style={styles.sub}>Hãy cho chúng tôi biết về vườn cây của bạn</CText>

              {/* progress */}
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, {width: `${Math.round(progress * 100)}%`}]} />
              </View>
              <CText style={styles.progressText}>
                {Math.round(progress * 100)}% • Còn {4 - Math.round(progress * 4)} mục bắt buộc
              </CText>

              {/* mini banner */}
              <View style={styles.tipBanner}>
                <CText style={styles.tipText}>🎉 Gần xong rồi! Hoàn thiện hồ sơ để bắt đầu sử dụng</CText>
              </View>
            </View>

            {/* Card form */}
            <View style={styles.formCard}>
              {/* Avatar inline */}
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

              {/* Full name */}
              <LabelRow label="Họ và tên" required icon={<User2 size={16} color={Colors.greenPrimary} />} />
              <CInput
                name="fullName"
                placeholder="Nguyễn Văn A"
                fontSize={fontScale(16)}
                returnKeyType="next"
              />

              {/* Address */}
              <View style={{marginTop: scale(12)}} />
              <LabelRow label="Địa chỉ" required icon={<MapPin size={16} color={Colors.greenPrimary} />} />
              <CInput
                name="addressLine"
                placeholder="147 Thôn 8A"
                fontSize={fontScale(16)}
                returnKeyType="next"
              />

              {/* Area */}
              <View style={{marginTop: scale(12)}} />
              <LabelRow label="Khu vực" required />
              <SelectBox
                value={watch('area')?.name || 'Nhập tìm Tỉnh/Thành phố - Quận/Huyện'}
                onPress={onPickArea}
                error={!!errors.area}
              />
              {errors.area ? <ErrorText text={errors.area.message as string} /> : null}

              {/* Ward */}
              <View style={{marginTop: scale(12)}} />
              <LabelRow label="Phường/Xã" />
              <SelectBox
                value={watch('ward')?.name || 'Nhập tìm Phường/Xã'}
                onPress={onPickWard}
                disabled={!area}
                hint={!area ? 'Vui lòng chọn Khu vực trước' : undefined}
              />

              {/* Birthday */}
              <View style={{marginTop: scale(12)}} />
              <LabelRow label="Sinh nhật (Không bắt buộc)" icon={<Calendar size={16} color={Colors.greenPrimary} />} />
              <SelectBox
                value={watch('birthday') || 'Bấm để chọn ngày'}
                onPress={onPickBirthday}
              />

              {/* Crops multi */}
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

          {/* Sticky CTA */}
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

/** ---------- small ui parts ---------- */

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

/** ---------- styles ---------- */

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: '#F7F4EF'},
  scroll: {padding: scale(16), paddingBottom: scale(24)},

  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
    marginBottom: scale(10),
  },
  logoDot: {
    width: scale(34),
    height: scale(34),
    borderRadius: 999,
    backgroundColor: 'rgba(11,43,30,0.14)',
  },
  brandName: {fontSize: fontScale(20), fontWeight: '900', color: Colors.greenPrimary},

  heroCard: {
    backgroundColor: Colors.white,
    borderRadius: scale(18),
    padding: scale(14),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,0.10)',
  },
  h1: {fontSize: fontScale(22), fontWeight: '900', color: Colors.h1},
  sub: {marginTop: scale(4), fontSize: fontScale(13), color: 'rgba(0,0,0,0.55)', fontWeight: '600'},

  progressTrack: {
    marginTop: scale(12),
    height: scale(10),
    borderRadius: 999,
    backgroundColor: 'rgba(11,43,30,0.08)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.greenPrimary,
    borderRadius: 999,
  },
  progressText: {
    marginTop: scale(8),
    fontSize: fontScale(12),
    color: 'rgba(0,0,0,0.50)',
    fontWeight: '700',
  },

  tipBanner: {
    marginTop: scale(12),
    backgroundColor: 'rgba(11,43,30,0.06)',
    borderRadius: scale(14),
    padding: scale(10),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(11,43,30,0.14)',
  },
  tipText: {fontSize: fontScale(13), fontWeight: '800', color: Colors.h2},

  formCard: {
    marginTop: scale(12),
    backgroundColor: Colors.white,
    borderRadius: scale(18),
    padding: scale(14),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,0.10)',
  },

  avatarRow: {flexDirection: 'row', gap: scale(12), alignItems: 'center', marginBottom: scale(12)},
  avatarCircle: {
    width: scale(56),
    height: scale(56),
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionLabel: {fontSize: fontScale(13), fontWeight: '900', color: Colors.h1},
  uploadBtn: {
    marginTop: scale(8),
    height: scale(44),
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.10)',
    backgroundColor: '#F6F6F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadText: {fontSize: fontScale(14), fontWeight: '900', color: Colors.h1},

  labelRow: {flexDirection: 'row', alignItems: 'center', gap: scale(8), marginTop: scale(6), marginBottom: scale(6)},
  labelIcon: {
    width: scale(26),
    height: scale(26),
    borderRadius: scale(10),
    backgroundColor: 'rgba(11,43,30,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {fontSize: fontScale(13), fontWeight: '900', color: 'rgba(0,0,0,0.72)'},

  select: {
    height: scale(52),
    borderRadius: scale(12),
    backgroundColor: '#F6F6F1',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.10)',
    paddingHorizontal: scale(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectDisabled: {opacity: 0.6},
  selectError: {borderColor: Colors.red},
  selectText: {fontSize: fontScale(15), fontWeight: '800', color: Colors.h1, flex: 1, marginRight: scale(10)},
  placeholder: {color: 'rgba(0,0,0,0.40)', fontWeight: '700'},

  hint: {marginTop: scale(6), fontSize: fontScale(12), color: 'rgba(0,0,0,0.45)', fontWeight: '600'},
  err: {marginTop: scale(6), fontSize: fontScale(12), color: Colors.red, fontWeight: '700'},

  bottomBar: {
    position: 'absolute',
    left: 0, right: 0, bottom: 0,
    backgroundColor: Colors.white,
    padding: scale(14),
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0,0,0,0.10)',
  },
  bottomHint: {marginBottom: scale(8), fontSize: fontScale(12), color: 'rgba(0,0,0,0.50)', fontWeight: '700'},
  cta: {height: scale(52)},
});
