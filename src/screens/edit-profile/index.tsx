import {yupResolver} from '@hookform/resolvers/yup';
import {Calendar, MapPin, User2} from 'lucide-react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Controller, FormProvider, useForm, useWatch} from 'react-hook-form';
import {Keyboard, Pressable, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import ReactNativeModal from 'react-native-modal';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {fontScale, scale} from 'react-native-utils-scale';
import * as yup from 'yup';

import CButton from '@/components/button';
import CInput from '@/components/input';
import CText from '@/components/text';
import {useGetProfile, useUpdateCustomerProfile} from '@/hooks/useProfile';
import {useProvinces, useWards} from '@/hooks/useLocation';
import {goBack} from '@/navigators';
import {buildUpdateProfilePayload} from '@/services/profile.api';
import {Colors} from '@/themes';

import CropMultiSelect, {CropOption} from './components/CropMultiSelect';
import FadeUp from './components/FadeUp';
import HeaderBar from './components/HeaderBar';
import HeroCard from './components/HeroCard';
import LabelRow from './components/LabelRow';
import PickerModal, {PickerItem} from './components/PickerModal';
import SelectBox from './components/SelectBox';
import {styles} from './style.module';

type OptionObj = {id: string; name: string; code: number};

type FormValues = {
  avatarUri?: string | null;
  fullName: string;
  area: OptionObj | null;
  ward: OptionObj | null;
  addressLine: string;
  birthday?: string;
  crops: string[];
};

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

const MIN_BIRTHDAY = new Date(1950, 0, 1);
const MAX_BIRTHDAY = new Date();

const formatYmd = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

const parseYmd = (ymd?: string) => {
  if (!ymd) {
    return null;
  }
  const [y, m, d] = ymd.split('-').map(Number);
  if (!y || !m || !d) {
    return null;
  }
  return new Date(y, m - 1, d);
};

const displayBirthday = (ymd?: string) => {
  const dt = parseYmd(ymd);
  if (!dt) {
    return '';
  }
  const dd = String(dt.getDate()).padStart(2, '0');
  const mm = String(dt.getMonth() + 1).padStart(2, '0');
  const yyyy = dt.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
};

const norm = (s?: string | null) => (s || '').trim().toLowerCase();

const stripTrailingParts = (addressRaw: string, parts: string[]) => {
  let out = (addressRaw || '').trim();
  if (!out) {
    return out;
  }

  const safeParts = parts.map(p => p.trim()).filter(Boolean);
  for (let i = 0; i < 6; i++) {
    const lowered = norm(out);
    let changed = false;

    for (const p of safeParts) {
      const pLower = norm(p);
      if (lowered.endsWith(`, ${pLower}`)) {
        out = out.slice(0, out.length - (p.length + 2)).trim();
        changed = true;
      } else if (lowered.endsWith(pLower)) {
        const idx = out.toLowerCase().lastIndexOf(pLower);
        const before = out.slice(0, idx).trimEnd();
        if (!before || before.endsWith(',')) {
          out = before.replace(/,$/, '').trim();
          changed = true;
        }
      }
    }

    if (!changed) {
      break;
    }
  }

  return out
    .replace(/\s*,\s*,/g, ', ')
    .replace(/,\s*$/, '')
    .trim();
};

const schema: yup.ObjectSchema<FormValues> = yup.object({
  avatarUri: yup.string().optional().nullable(),
  fullName: yup.string().trim().required('Vui lòng nhập Họ và tên'),
  area: yup.mixed().required('Vui lòng chọn Tỉnh/Thành').nullable(false),
  ward: yup.mixed().required('Vui lòng chọn Phường/Xã').nullable(false),
  addressLine: yup
    .string()
    .trim()
    .when('ward', {
      is: (v: any) => !!v,
      then: s => s.required('Vui lòng nhập Địa chỉ (thôn/ấp/số nhà)'),
      otherwise: s => s.default(''),
    }),
  birthday: yup.string().optional(),
  crops: yup
    .array()
    .of(yup.string().required())
    .min(1, 'Vui lòng chọn ít nhất 1 loại cây')
    .required(),
});

type PickerKind = 'province' | 'ward';

const ProfileCompletionScreen: React.FC = () => {
  const insets = useSafeAreaInsets();

  const scrollRef = useRef<any>(null);
  const yMapRef = useRef<Record<string, number>>({});

  const {data: profile, refetch: refetchProfile} = useGetProfile();
  const {mutateAsync: updateProfile, isPending: updating} =
    useUpdateCustomerProfile();

  const provincesQ = useProvinces();

  const form = useForm<FormValues>({
    defaultValues: {
      avatarUri: null,
      fullName: '',
      area: null,
      ward: null,
      addressLine: '',
      birthday: '',
      crops: [],
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldFocusError: true,
  });

  const {
    control,
    reset,
    setValue,
    getValues,
    handleSubmit,
    formState: {errors, isValid, touchedFields, submitCount},
  } = form;

  const fullName = useWatch({control, name: 'fullName'});
  const area = useWatch({control, name: 'area'});
  const ward = useWatch({control, name: 'ward'});
  const birthday = useWatch({control, name: 'birthday'});
  const crops = useWatch({control, name: 'crops'});

  const wardsQ = useWards(area?.code);

  useEffect(() => {
    if (!profile) {
      return;
    }

    const provinceNameFromProfile = profile.location_name || '';
    const wardNameFromProfile = profile.ward_name || '';

    const cleanedAddress = stripTrailingParts(profile.address || '', [
      wardNameFromProfile,
      provinceNameFromProfile,
    ]);

    reset(
      {
        avatarUri: profile.avatar || null,
        fullName: (profile.full_name || '').trim(),
        area: null,
        ward: null,
        addressLine: cleanedAddress,
        birthday: profile.birth_date
          ? String(profile.birth_date).slice(0, 10)
          : '',
        crops: Array.isArray(profile.type_of_plants)
          ? profile.type_of_plants
          : [],
      },
      {keepDirtyValues: true} as any,
    );
  }, [profile, reset]);

  useEffect(() => {
    if (!profile) {
      return;
    }
    if (!provincesQ.items?.length) {
      return;
    }

    const currentArea = getValues('area');
    if (currentArea?.code) {
      return;
    }

    const provinceName = norm(profile.location_name);
    if (!provinceName) {
      return;
    }

    const found = provincesQ.items.find(p => norm(p.name) === provinceName);
    if (!found) {
      return;
    }

    setValue(
      'area',
      {id: found.id, name: found.name, code: found.code},
      {shouldDirty: false},
    );
  }, [profile, provincesQ.items, getValues, setValue]);

  useEffect(() => {
    if (!profile) {
      return;
    }
    if (!wardsQ.items?.length) {
      return;
    }

    const currentWard = getValues('ward');
    if (currentWard?.code) {
      return;
    }

    const wardName = norm(profile.ward_name);
    if (!wardName) {
      return;
    }

    const found = wardsQ.items.find(w => norm(w.name) === wardName);
    if (!found) {
      return;
    }

    setValue(
      'ward',
      {id: found.id, name: found.name, code: found.code},
      {shouldDirty: false},
    );
  }, [profile, wardsQ.items, getValues, setValue]);

  const progress = useMemo(() => {
    let done = 0;
    if (fullName?.trim()) {
      done++;
    }
    if (area) {
      done++;
    }
    if (ward) {
      done++;
    }
    if (crops?.length > 0) {
      done++;
    }
    return done / 4;
  }, [fullName, area, ward, crops]);

  const missing = useMemo(
    () => ({
      fullName: !fullName?.trim(),
      area: !area,
      ward: !ward,
      crops: !crops || crops.length === 0,
    }),
    [fullName, area, ward, crops],
  );

  const showError = useCallback(
    (field: keyof FormValues) => {
      const isTouched = !!(touchedFields as any)?.[field];
      return !!(errors as any)?.[field] && (isTouched || submitCount > 0);
    },
    [errors, touchedFields, submitCount],
  );

  const [pickerVisible, setPickerVisible] = useState(false);
  const [pickerKind, setPickerKind] = useState<PickerKind>('province');

  const openPicker = useCallback((kind: PickerKind) => {
    setPickerKind(kind);
    setPickerVisible(true);
  }, []);

  const pickerItems = useMemo<PickerItem[]>(() => {
    return pickerKind === 'province' ? provincesQ.items : wardsQ.items;
  }, [pickerKind, provincesQ.items, wardsQ.items]);

  const onSelectPickerItem = useCallback(
    (it: PickerItem) => {
      if (pickerKind === 'province') {
        setValue(
          'area',
          {id: it.id, name: it.name, code: it.code},
          {shouldDirty: true},
        );
        setValue('ward', null, {shouldDirty: true});
        setValue('addressLine', '', {shouldDirty: true});
      } else {
        setValue(
          'ward',
          {id: it.id, name: it.name, code: it.code},
          {shouldDirty: true},
        );
      }
      setPickerVisible(false);
    },
    [pickerKind, setValue],
  );

  const [birthdayModalOpen, setBirthdayModalOpen] = useState(false);
  const [tempBirthday, setTempBirthday] = useState<Date>(new Date(1990, 0, 1));

  const dateValue = useMemo(() => {
    const parsed = parseYmd(birthday);
    return parsed || new Date(1990, 0, 1);
  }, [birthday]);

  const openBirthday = useCallback(() => {
    Keyboard.dismiss();
    setTempBirthday(dateValue);
    setBirthdayModalOpen(true);
  }, [dateValue]);

  const birthdayText = useMemo(() => {
    const t = displayBirthday(birthday);
    return t ? t : 'Bấm để chọn ngày';
  }, [birthday]);

  const submitting = updating;
  const submitDisabled = submitting || !isValid;

  const onSubmit = useCallback(
    async (values: FormValues) => {
      Keyboard.dismiss();

      const payload = buildUpdateProfilePayload({
        fullName: values.fullName,
        avatarUri: values.avatarUri,
        addressLine: values.addressLine,
        ward: values.ward,
        birthday: values.birthday,
        crops: values.crops,
      });

      await updateProfile(payload);
      await refetchProfile();
      goBack();
    },
    [updateProfile, refetchProfile],
  );

  const onInvalid = useCallback((formErrors: any) => {
    const order: Array<keyof FormValues> = [
      'fullName',
      'area',
      'ward',
      'addressLine',
      'crops',
    ];
    const firstKey = order.find(k => !!formErrors?.[k]);
    if (!firstKey) {
      return;
    }

    Keyboard.dismiss();
    setTimeout(() => {
      const y = yMapRef.current[firstKey as string] ?? 0;
      scrollRef.current?.scrollTo?.({
        y: Math.max(0, y - scale(12)),
        animated: true,
      });
    }, 60);
  }, []);

  const addressEnabled = !!ward;

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <HeaderBar title="Chỉnh sửa hồ sơ" onBack={() => goBack()} />

      <FormProvider {...form}>
        <View style={{flex: 1}}>
          <KeyboardAvoidingScrollView
            ref={scrollRef}
            style={{flex: 1}}
            contentContainerStyle={[
              styles.scrollContent,
              {paddingBottom: scale(70) + insets.bottom},
            ]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <HeroCard progress={progress} />

            <View style={styles.formCard}>
              <View
                onLayout={e =>
                  (yMapRef.current.fullName = e.nativeEvent.layout.y)
                }>
                <LabelRow
                  label="Họ và tên"
                  required
                  missing={missing.fullName}
                  icon={<User2 size={16} color={Colors.greenPrimary} />}
                />
                <CInput
                  name="fullName"
                  placeholder="Nguyễn Văn A"
                  fontSize={fontScale(16)}
                  returnKeyType="next"
                />
                {showError('fullName') ? (
                  <CText style={styles.err}>
                    {errors.fullName?.message as any}
                  </CText>
                ) : null}
              </View>

              <View
                style={{marginTop: scale(12)}}
                onLayout={e => (yMapRef.current.area = e.nativeEvent.layout.y)}>
                <LabelRow
                  label="Tỉnh/Thành phố"
                  required
                  missing={missing.area}
                />
                <SelectBox
                  value={area?.name || 'Bấm để chọn Tỉnh/Thành'}
                  onPress={() => openPicker('province')}
                  error={showError('area')}
                  disabled={provincesQ.isLoading}
                />
                {provincesQ.isError ? (
                  <CText style={styles.err}>
                    {(provincesQ.error as any)?.message ||
                      'Không tải được danh sách Tỉnh/Thành'}
                  </CText>
                ) : null}
                {showError('area') ? (
                  <CText style={styles.err}>
                    {errors.area?.message as any}
                  </CText>
                ) : null}
              </View>

              <View
                style={{marginTop: scale(12)}}
                onLayout={e => (yMapRef.current.ward = e.nativeEvent.layout.y)}>
                <LabelRow label="Phường/Xã" required missing={missing.ward} />
                <SelectBox
                  value={ward?.name || 'Chọn Phường/Xã'}
                  onPress={() => openPicker('ward')}
                  disabled={
                    !area?.code ||
                    wardsQ.isLoading ||
                    wardsQ.isError ||
                    !wardsQ.enabled
                  }
                  hint={
                    !area?.code ? 'Vui lòng chọn Tỉnh/Thành trước' : undefined
                  }
                  error={showError('ward')}
                  placeholderLike={!ward}
                />
                {wardsQ.isError ? (
                  <CText style={styles.err}>
                    {(wardsQ.error as any)?.message ||
                      'Không tải được danh sách Phường/Xã'}
                  </CText>
                ) : null}
                {showError('ward') ? (
                  <CText style={styles.err}>
                    {errors.ward?.message as any}
                  </CText>
                ) : null}
              </View>

              <FadeUp show={addressEnabled} style={{marginTop: scale(12)}}>
                <View
                  onLayout={e =>
                    (yMapRef.current.addressLine = e.nativeEvent.layout.y)
                  }>
                  <LabelRow
                    label="Địa chỉ (thôn/ấp/số nhà)"
                    required
                    icon={<MapPin size={16} color={Colors.greenPrimary} />}
                  />
                  <CInput
                    name="addressLine"
                    placeholder="Ví dụ: Số 143, Thôn 8A"
                    fontSize={fontScale(16)}
                    editable={addressEnabled}
                  />
                  {showError('addressLine') ? (
                    <CText style={styles.err}>
                      {errors.addressLine?.message as any}
                    </CText>
                  ) : null}
                  <CText style={styles.hint}>
                    Gợi ý: nhập càng rõ càng dễ giao hàng & tư vấn đúng vườn
                  </CText>
                </View>
              </FadeUp>

              {!addressEnabled ? (
                <CText style={[styles.hint, {marginTop: scale(12)}]}>
                  Chọn xong Phường/Xã thì hệ thống mới cho nhập địa chỉ chi
                  tiết.
                </CText>
              ) : null}

              <View style={{marginTop: scale(12)}}>
                <LabelRow
                  label="Sinh nhật (Không bắt buộc)"
                  icon={<Calendar size={16} color={Colors.greenPrimary} />}
                />
                <SelectBox
                  value={birthdayText}
                  onPress={openBirthday}
                  placeholderLike={!birthday}
                />

                {birthday ? (
                  <Pressable
                    onPress={() =>
                      setValue('birthday', '', {shouldDirty: true})
                    }
                    hitSlop={10}
                    style={{marginTop: scale(8), alignSelf: 'flex-start'}}>
                    <CText
                      style={{color: Colors.greenPrimary, fontWeight: '900'}}>
                      Xóa ngày
                    </CText>
                  </Pressable>
                ) : null}

                <CText style={styles.hint}>
                  Chọn đúng sinh nhật để nhận quà 🎁 (nếu không nhớ có thể bỏ
                  qua)
                </CText>
              </View>

              <View
                style={{marginTop: scale(14)}}
                onLayout={e =>
                  (yMapRef.current.crops = e.nativeEvent.layout.y)
                }>
                <LabelRow
                  label="Bạn đang trồng những loại cây nào?"
                  required
                  missing={missing.crops}
                />
                <Controller
                  control={control}
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
                {showError('crops') ? (
                  <CText style={styles.err}>
                    {errors.crops?.message as any}
                  </CText>
                ) : null}
              </View>
            </View>

            <View style={{height: scale(24)}} />
            <View
              style={[
                styles.bottomBar,
                {
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  paddingBottom: insets.bottom + scale(12),
                },
              ]}>
              {Object.keys(errors).length ? (
                <CText style={styles.bottomHint}>
                  Vui lòng kiểm tra lại các mục bắt buộc (*)
                </CText>
              ) : null}

              <CButton
                title={submitting ? 'Đang hoàn tất...' : 'Hoàn tất'}
                onPress={handleSubmit(onSubmit, onInvalid)}
                disabled={submitDisabled}
                isLoading={submitting}
                style={styles.cta}
              />
            </View>
          </KeyboardAvoidingScrollView>
        </View>

        <PickerModal
          visible={pickerVisible}
          title={
            pickerKind === 'province' ? 'Chọn Tỉnh/Thành' : 'Chọn Phường/Xã'
          }
          items={pickerItems}
          onClose={() => setPickerVisible(false)}
          onSelect={onSelectPickerItem}
          loading={
            pickerKind === 'province' ? provincesQ.isLoading : wardsQ.isLoading
          }
          errorText={
            pickerKind === 'province'
              ? provincesQ.isError
                ? (provincesQ.error as any)?.message
                : undefined
              : wardsQ.isError
              ? (wardsQ.error as any)?.message
              : undefined
          }
          emptyText={
            pickerKind === 'ward' && area
              ? 'Tỉnh/Thành này chưa có danh sách Phường/Xã'
              : 'Không có dữ liệu'
          }
        />

        <ReactNativeModal
          isVisible={birthdayModalOpen}
          onBackdropPress={() => setBirthdayModalOpen(false)}
          onBackButtonPress={() => setBirthdayModalOpen(false)}
          useNativeDriver
          hideModalContentWhileAnimating
          style={{margin: 0}}>
          <View style={styles.modalBackdrop}>
            <View style={styles.modalCard}>
              <View style={styles.modalHeader}>
                <CText style={styles.modalTitle}>Chọn ngày sinh</CText>
                <Pressable
                  onPress={() => setBirthdayModalOpen(false)}
                  hitSlop={10}>
                  <CText style={styles.modalClose}>Đóng</CText>
                </Pressable>
              </View>

              <DatePicker
                date={tempBirthday}
                onDateChange={setTempBirthday}
                dividerColor={Colors.gray300}
                mode="date"
                locale="vi"
                minimumDate={MIN_BIRTHDAY}
                maximumDate={MAX_BIRTHDAY}
              />

              <View
                style={{
                  flexDirection: 'row',
                  gap: scale(10),
                  marginTop: scale(12),
                }}>
                <Pressable
                  onPress={() => {
                    setValue('birthday', '', {shouldDirty: true});
                    setBirthdayModalOpen(false);
                  }}
                  style={{
                    flex: 1,
                    height: scale(44),
                    borderRadius: 999,
                    backgroundColor: 'rgba(0,0,0,0.06)',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <CText style={{fontWeight: '900'}}>Xóa ngày</CText>
                </Pressable>

                <Pressable
                  onPress={() => {
                    setValue('birthday', formatYmd(tempBirthday), {
                      shouldDirty: true,
                    });
                    setBirthdayModalOpen(false);
                  }}
                  style={{
                    flex: 1,
                    height: scale(44),
                    borderRadius: 999,
                    backgroundColor: Colors.greenPrimary,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <CText style={{fontWeight: '900', color: Colors.white}}>
                    Xong
                  </CText>
                </Pressable>
              </View>
            </View>
          </View>
        </ReactNativeModal>
      </FormProvider>
    </SafeAreaView>
  );
};

export default ProfileCompletionScreen;
