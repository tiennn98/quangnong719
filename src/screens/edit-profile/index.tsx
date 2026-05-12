import { yupResolver } from '@hookform/resolvers/yup';
import { Calendar, MapPin, User2 } from 'lucide-react-native';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Controller, FormProvider, useForm, useWatch } from 'react-hook-form';
import { Keyboard, Pressable, ScrollView, View } from 'react-native';
import DatePicker from '@react-native-community/datetimepicker';
import ReactNativeModal from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fontScale, scale, width } from 'react-native-utils-scale';
import * as yup from 'yup';

import CButton from '@/components/button';
import CInput from '@/components/input';
import CText from '@/components/text';

import { useProvinces, useWards } from '@/hooks/useLocation';
import { useGetPlant } from '@/hooks/usePlant';
import { useGetProfile, useUpdateCustomerProfile } from '@/hooks/useProfile';
import { goBack, navigate } from '@/navigators';
import { buildUpdateProfilePayload } from '@/services/profile.api';
import { Colors } from '@/themes';

import { SCREEN_NAME } from '@/constants';
import CropMultiSelect, { CropOption } from './components/CropMultiSelect';
import HeaderBar from './components/HeaderBar';
import HeroCard from './components/HeroCard';
import LabelRow from './components/LabelRow';
import PickerModal, { PickerItem } from './components/PickerModal';
import SelectBox from './components/SelectBox';
import { styles } from './style.module';

const removeDiacritics = (s: string) =>
  (s || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');

const normPlace = (s?: string | null) =>
  removeDiacritics((s || '').trim().toLowerCase())
    .replace(/\s+/g, ' ')
    .replace(/^tp\.?\s+/i, 'thanh pho ')
    .replace(/^(tinh|thanh pho|quan|huyen|thi xa|xa|phuong|thi tran)\s+/i, '')
    .trim();

const stripLeadingAdminPrefix = (s?: string | null) =>
  (s || '')
    .trim()
    .replace(/^tp\.?\s+/i, '')
    .replace(
      /^(tỉnh|thành phố|tp|quận|huyện|thị xã|xã|phường|thị trấn)\s+/i,
      '',
    )
    .trim();

const parseProvinceFromLocationName = (locationName?: string | null) => {
  const raw = (locationName || '').trim();
  if (!raw) {
    return '';
  }

  const parts = raw.includes(',')
    ? raw
        .split(',')
        .map(s => s.trim())
        .filter(Boolean)
    : raw.includes(' - ')
    ? raw
        .split(' - ')
        .map(s => s.trim())
        .filter(Boolean)
    : raw.includes('-')
    ? raw
        .split('-')
        .map(s => s.trim())
        .filter(Boolean)
    : [raw];

  return parts[0] || '';
};

type OptionObj = { id: string; name: string; code: number };

type FormValues = {
  avatarUri?: string | null;
  fullName: string;
  province: OptionObj | null;
  ward: OptionObj | null;
  addressLine: string;
  birthday?: string;
  crops: string[];
};

type PickerKind = 'province' | 'ward';

type SettingsResponse = {
  msg: string;
  statusCode: number;
  data: { plants: Array<{ id: number; code: string; name: string }> };
  length: number;
};

type ProfileDTO = {
  avatar?: string | null;
  full_name?: string | null;
  location_name?: string | null;
  ward_name?: string | null;
  address?: string | null;
  birth_date?: string | null;
  type_of_plants_ids?: Array<number | string> | null;
};

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

const schema: yup.ObjectSchema<FormValues> = yup.object({
  avatarUri: yup.string().optional().nullable(),
  fullName: yup.string().trim().required('Vui lòng nhập Họ và tên'),
  province: yup.mixed().required('Vui lòng chọn Tỉnh/Thành').nullable(false),
  ward: yup.mixed().required('Vui lòng chọn Phường/Xã').nullable(false),
  addressLine: yup
    .string()
    .trim()
    .required('Vui lòng nhập Địa chỉ (thôn/ấp/số nhà)'),
  birthday: yup.string().optional(),
  crops: yup
    .array()
    .of(yup.string().required())
    .min(1, 'Vui lòng chọn ít nhất 1 loại cây')
    .required(),
});

const ProfileCompletionScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);
  const yMapRef = useRef<Record<string, number>>({});

  const plantsQ = useGetPlant() as any;
  const plantsData = plantsQ.data as SettingsResponse | undefined;

  const profileQ = useGetProfile() as any;
  const profile = profileQ.data as ProfileDTO | undefined;
  const refetchProfile = profileQ.refetch;

  const updateQ = useUpdateCustomerProfile() as any;
  const updateProfile = updateQ.mutateAsync;
  const updating = updateQ.isPending;

  const provincesQ = useProvinces() as any;

  const form = useForm<FormValues>({
    defaultValues: {
      avatarUri: null,
      fullName: '',
      province: null,
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
    formState: { errors, isValid, touchedFields, submitCount },
  } = form;

  const fullName = useWatch({ control, name: 'fullName' });
  const province = useWatch({ control, name: 'province' });
  const ward = useWatch({ control, name: 'ward' });
  const birthday = useWatch({ control, name: 'birthday' });
  const crops = useWatch({ control, name: 'crops' });

  const wardsQ = useWards(province?.code) as any;

  const plants = plantsData?.data?.plants ?? [];
  const cropsOptions = useMemo<CropOption[]>(
    () => plants.map(p => ({ id: String(p.id), label: p.name })),
    [plants],
  );
  const plantIdSet = useMemo(
    () => new Set(plants.map(p => String(p.id))),
    [plants],
  );

  const normalizePlantIds = useCallback(
    (arr: Array<number | string> | null | undefined) => {
      const raw = Array.isArray(arr) ? arr : [];
      const out: string[] = [];
      for (const x of raw) {
        const s = String(x);
        if (plantIdSet.size && !plantIdSet.has(s)) {
          continue;
        }
        out.push(s);
      }
      return Array.from(new Set(out));
    },
    [plantIdSet],
  );

  useEffect(() => {
    if (!profile) {
      return;
    }

    const provinceRaw = parseProvinceFromLocationName(profile.location_name);
    const provinceName = stripLeadingAdminPrefix(provinceRaw);
    const wardName = stripLeadingAdminPrefix(profile.ward_name);

    reset(
      {
        avatarUri: profile.avatar || null,
        fullName: (profile.full_name || '').trim(),

        province: provinceName
          ? ({ id: '', name: provinceName, code: 0 } as any)
          : null,
        ward: wardName ? ({ id: '', name: wardName, code: 0 } as any) : null,

        addressLine: (profile.address || '').trim(),
        birthday: profile.birth_date
          ? String(profile.birth_date).slice(0, 10)
          : '',
        crops: normalizePlantIds(profile.type_of_plants_ids as any),
      },
      { keepDirtyValues: true } as any,
    );
  }, [profile, reset, normalizePlantIds]);

  useEffect(() => {
    if (!plantIdSet.size) {
      return;
    }
    const cur = getValues('crops') || [];
    const next = cur.filter(id => plantIdSet.has(String(id)));
    if (next.length !== cur.length) {
      setValue('crops', next, { shouldDirty: true });
    }
  }, [plantIdSet, getValues, setValue]);

  useEffect(() => {
    if (!provincesQ.items?.length) {
      return;
    }

    const cur = getValues('province');
    if (!cur?.name || cur.code) {
      return;
    }

    const target = normPlace(cur.name);

    const found = provincesQ.items.find((p: any) => {
      const pNorm = normPlace(p.name);
      return (
        pNorm === target || target.includes(pNorm) || pNorm.includes(target)
      );
    });

    if (!found) {
      return;
    }

    setValue(
      'province',
      { id: found.id, name: found.name, code: found.code },
      { shouldDirty: false },
    );
  }, [provincesQ.items, getValues, setValue]);

  useEffect(() => {
    if (!wardsQ.items?.length) {
      return;
    }

    const cur = getValues('ward');
    if (!cur?.name || cur.code) {
      return;
    }

    const target = normPlace(cur.name);

    const found = wardsQ.items.find((w: any) => {
      const wNorm = normPlace(w.name);
      return (
        wNorm === target || target.includes(wNorm) || wNorm.includes(target)
      );
    });

    if (!found) {
      return;
    }

    setValue(
      'ward',
      { id: found.id, name: found.name, code: found.code },
      { shouldDirty: false },
    );
  }, [wardsQ.items, getValues, setValue]);

  const progress = useMemo(() => {
    let done = 0;
    if (fullName?.trim()) {
      done++;
    }
    if (province) {
      done++;
    }
    if (ward) {
      done++;
    }
    if (crops?.length > 0) {
      done++;
    }
    return done / 4;
  }, [fullName, province, ward, crops]);

  const missing = useMemo(
    () => ({
      fullName: !fullName?.trim(),
      province: !province,
      ward: !ward,
      crops: !crops || crops.length === 0,
    }),
    [fullName, province, ward, crops],
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
    Keyboard.dismiss();
    setPickerKind(kind);
    setPickerVisible(true);
  }, []);

  const pickerItems = useMemo<PickerItem[]>(() => {
    return pickerKind === 'province'
      ? provincesQ.items || []
      : wardsQ.items || [];
  }, [pickerKind, provincesQ.items, wardsQ.items]);

  const onSelectPickerItem = useCallback(
    (it: PickerItem) => {
      if (pickerKind === 'province') {
        setValue(
          'province',
          { id: it.id, name: it.name, code: it.code },
          { shouldDirty: true },
        );
        setValue('ward', null, { shouldDirty: true });
      } else {
        setValue(
          'ward',
          { id: it.id, name: it.name, code: it.code },
          { shouldDirty: true },
        );
      }
      setPickerVisible(false);
    },
    [pickerKind, setValue],
  );

  const [birthdayModalOpen, setBirthdayModalOpen] = useState(false);
  const [tempBirthday, setTempBirthday] = useState<Date>(new Date(1990, 0, 1));

  const dateValue = useMemo(
    () => parseYmd(birthday) || new Date(1990, 0, 1),
    [birthday],
  );

  const openBirthday = useCallback(() => {
    Keyboard.dismiss();
    setTempBirthday(dateValue);
    setBirthdayModalOpen(true);
  }, [dateValue]);

  const birthdayText = useMemo(
    () => displayBirthday(birthday) || 'Bấm để chọn ngày',
    [birthday],
  );

  const submitting = updating;
  const submitDisabled = submitting || !isValid;

  const onSubmit = useCallback(
    async (values: FormValues) => {
      Keyboard.dismiss();

      const plantIds = (values.crops || [])
        .map(x => Number(x))
        .filter(n => Number.isFinite(n));

      const payload = buildUpdateProfilePayload({
        fullName: values.fullName,
        avatarUri: values.avatarUri,
        addressLine: values.addressLine,
        province: values.province,
        ward: values.ward,
        birthday: values.birthday,
        crops: plantIds,
      } as any);

      await updateProfile(payload);
      await refetchProfile();
      navigate(SCREEN_NAME.HOME);
    },
    [updateProfile, refetchProfile],
  );

  const onInvalid = useCallback((formErrors: any) => {
    const order: Array<keyof FormValues> = [
      'fullName',
      'province',
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

  return (
    <View
      style={[
        styles.safe,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <HeaderBar title="Chỉnh sửa hồ sơ" onBack={() => goBack()} />

      <FormProvider {...form}>
        <View style={{ flex: 1 }}>
          <ScrollView
            ref={scrollRef}
            style={{ flex: 1 }}
            contentContainerStyle={[
              styles.scrollContent,
              { paddingBottom: scale(110) + insets.bottom },
            ]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            automaticallyAdjustKeyboardInsets={false}
          >
            <HeroCard progress={progress} />

            <View style={styles.formCard}>
              <View
                onLayout={e =>
                  (yMapRef.current.fullName = e.nativeEvent.layout.y)
                }
              >
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
                style={{ marginTop: scale(12) }}
                onLayout={e =>
                  (yMapRef.current.province = e.nativeEvent.layout.y)
                }
              >
                <LabelRow
                  label="Tỉnh/Thành phố"
                  required
                  missing={missing.province}
                />
                <SelectBox
                  value={province?.name || 'Bấm để chọn Tỉnh/Thành'}
                  onPress={() => openPicker('province')}
                  error={showError('province')}
                  disabled={!!provincesQ.isLoading}
                />
                {provincesQ.isError ? (
                  <CText style={styles.err}>
                    {(provincesQ.error as any)?.message ||
                      'Không thể tải danh sách Tỉnh/Thành'}
                  </CText>
                ) : null}
                {showError('province') ? (
                  <CText style={styles.err}>
                    {errors.province?.message as any}
                  </CText>
                ) : null}
              </View>

              <View
                style={{ marginTop: scale(12) }}
                onLayout={e => (yMapRef.current.ward = e.nativeEvent.layout.y)}
              >
                <LabelRow label="Phường/Xã" required missing={missing.ward} />
                <SelectBox
                  value={ward?.name || 'Bấm để chọn Phường/Xã'}
                  onPress={() => openPicker('ward')}
                  disabled={
                    !province?.code ||
                    !!wardsQ.isLoading ||
                    wardsQ.enabled === false
                  }
                  hint={
                    !province?.code
                      ? 'Vui lòng chọn Tỉnh/Thành trước'
                      : undefined
                  }
                  error={showError('ward')}
                  placeholderLike={!ward}
                />
                {wardsQ.isError ? (
                  <CText style={styles.err}>
                    {(wardsQ.error as any)?.message ||
                      'Không thể tải danh sách Phường/Xã'}
                  </CText>
                ) : null}
                {showError('ward') ? (
                  <CText style={styles.err}>
                    {errors.ward?.message as any}
                  </CText>
                ) : null}
              </View>

              <View
                style={{ marginTop: scale(12) }}
                onLayout={e =>
                  (yMapRef.current.addressLine = e.nativeEvent.layout.y)
                }
              >
                <LabelRow
                  label="Địa chỉ (thôn/ấp/số nhà)"
                  required
                  icon={<MapPin size={16} color={Colors.greenPrimary} />}
                />
                <CInput
                  name="addressLine"
                  placeholder="Ví dụ: 143, thôn 8A"
                  fontSize={fontScale(16)}
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

              <View style={{ marginTop: scale(12) }}>
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
                      setValue('birthday', '', { shouldDirty: true })
                    }
                    hitSlop={10}
                    style={{ marginTop: scale(8), alignSelf: 'flex-start' }}
                  >
                    <CText
                      style={{ color: Colors.greenPrimary, fontWeight: '900' }}
                    >
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
                style={{ marginTop: scale(14) }}
                onLayout={e => (yMapRef.current.crops = e.nativeEvent.layout.y)}
              >
                <LabelRow
                  label="Bạn đang trồng những loại cây nào?"
                  required
                  missing={missing.crops}
                />

                {plantsQ.isLoading ? (
                  <CText style={styles.hint}>
                    Đang tải danh sách cây trồng...
                  </CText>
                ) : null}
                {plantsQ.isError ? (
                  <CText style={styles.err}>
                    {(plantsQ.error as any)?.message ||
                      'Không tải được danh sách cây trồng'}
                  </CText>
                ) : null}

                <Controller
                  control={control}
                  name="crops"
                  render={({ field: { value, onChange } }) => (
                    <CropMultiSelect
                      options={cropsOptions}
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

            <View style={{ height: scale(24) }} />
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
              ]}
            >
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
          </ScrollView>

          <PickerModal
            visible={pickerVisible}
            title={
              pickerKind === 'province' ? 'Chọn Tỉnh/Thành' : 'Chọn Phường/Xã'
            }
            items={pickerItems}
            onClose={() => setPickerVisible(false)}
            onSelect={onSelectPickerItem}
            loading={
              pickerKind === 'province'
                ? !!provincesQ.isLoading
                : !!wardsQ.isLoading
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
              pickerKind === 'ward' && province
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
            style={{ margin: 0 }}
          >
            <View style={styles.modalBackdrop}>
              <View style={styles.modalCard}>
                <View style={styles.modalHeader}>
                  <CText style={styles.modalTitle}>Chọn ngày sinh</CText>
                  <Pressable
                    onPress={() => setBirthdayModalOpen(false)}
                    hitSlop={10}
                  >
                    <CText style={styles.modalClose}>Đóng</CText>
                  </Pressable>
                </View>

                <DatePicker
                  date={tempBirthday}
                  onDateChange={setTempBirthday}
                  mode="date"
                  locale="vi"
                  theme="light"
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: width - scale(60),
                  }}
                  minimumDate={MIN_BIRTHDAY}
                  maximumDate={MAX_BIRTHDAY}
                />

                <View
                  style={{
                    flexDirection: 'row',
                    gap: scale(10),
                    marginTop: scale(12),
                  }}
                >
                  <Pressable
                    onPress={() => {
                      setValue('birthday', '', { shouldDirty: true });
                      setBirthdayModalOpen(false);
                    }}
                    style={{
                      flex: 1,
                      height: scale(44),
                      borderRadius: 999,
                      backgroundColor: 'rgba(0,0,0,0.06)',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <CText style={{ fontWeight: '900' }}>Xóa ngày</CText>
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
                    }}
                  >
                    <CText style={{ fontWeight: '900', color: Colors.white }}>
                      Xong
                    </CText>
                  </Pressable>
                </View>
              </View>
            </View>
          </ReactNativeModal>
        </View>
      </FormProvider>
    </View>
  );
};

export default ProfileCompletionScreen;
