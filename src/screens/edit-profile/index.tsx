import { yupResolver } from '@hookform/resolvers/yup';
import { Calendar, MapPin, User2 } from 'lucide-react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Controller, FormProvider, useForm, useWatch } from 'react-hook-form';
import { Keyboard, Pressable, ScrollView, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import ReactNativeModal from 'react-native-modal';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { fontScale, scale } from 'react-native-utils-scale';
import * as yup from 'yup';

import CButton from '@/components/button';
import CInput from '@/components/input';
import CText from '@/components/text';
import { useGetProfile, useUpdateCustomerProfile } from '@/hooks/useProfile';
import { useProvinces, useWards } from '@/hooks/useLocation';
import { useGetPlant } from '@/hooks/usePlant';
import { goBack } from '@/navigators';
import { buildUpdateProfilePayload } from '@/services/profile.api';
import { Colors } from '@/themes';

import CropMultiSelect, { CropOption } from './components/CropMultiSelect';
import FadeUp from './components/FadeUp';
import HeaderBar from './components/HeaderBar';
import HeroCard from './components/HeroCard';
import LabelRow from './components/LabelRow';
import PickerModal, { PickerItem } from './components/PickerModal';
import SelectBox from './components/SelectBox';
import { styles } from './style.module';

// =====================
// Types (đầy đủ)
// =====================

type OptionObj = { id: string; name: string; code: number };

type FormValues = {
  avatarUri?: string | null;
  fullName: string;
  area: OptionObj | null;
  ward: OptionObj | null;
  addressLine: string;
  birthday?: string; // yyyy-mm-dd
  crops: string[]; // ✅ lưu plantId dạng string: ["1","3",...]
};

// Response /settings
type PlantSetting = { id: number; code: string; name: string };

type SettingsResponse = {
  msg: string;
  statusCode: number;
  data: { plants: PlantSetting[] };
  length: number;
};

// Profile DTO (theo fields bạn đang dùng)
type ProfileDTO = {
  avatar?: string | null;
  full_name?: string | null;
  location_name?: string | null;
  ward_name?: string | null;
  address?: string | null;
  birth_date?: string | null;
  type_of_plants_ids?: Array<number | string> | null; // ✅ server trả id
};

// Shape tối thiểu của hooks bạn đang dùng (để TS không đỏ)
type QueryLike<T> = {
  data?: T;
  isLoading?: boolean;
  isError?: boolean;
  error?: unknown;
  enabled?: boolean;
  items?: any[];
};

// =====================
// Date helpers
// =====================

const MIN_BIRTHDAY = new Date(1950, 0, 1);
const MAX_BIRTHDAY = new Date();

const formatYmd = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

const parseYmd = (ymd?: string) => {
  if (!ymd) {return null;}
  const [y, m, d] = ymd.split('-').map(Number);
  if (!y || !m || !d) {return null;}
  return new Date(y, m - 1, d);
};

const displayBirthday = (ymd?: string) => {
  const dt = parseYmd(ymd);
  if (!dt) {return '';}
  const dd = String(dt.getDate()).padStart(2, '0');
  const mm = String(dt.getMonth() + 1).padStart(2, '0');
  const yyyy = dt.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
};

// =====================
// Address helpers
// =====================

const norm = (s?: string | null) => (s || '').trim().toLowerCase();

const stripTrailingParts = (addressRaw: string, parts: string[]) => {
  let out = (addressRaw || '').trim();
  if (!out) {return out;}

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

    if (!changed) {break;}
  }

  return out.replace(/\s*,\s*,/g, ', ').replace(/,\s*$/, '').trim();
};

// =====================
// Validation
// =====================

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
  crops: yup.array().of(yup.string().required()).min(1, 'Vui lòng chọn ít nhất 1 loại cây').required(),
});

type PickerKind = 'province' | 'ward';

// =====================
// Screen
// =====================

const ProfileCompletionScreen: React.FC = () => {
  const insets = useSafeAreaInsets();

  const scrollRef = useRef<ScrollView>(null);
  const yMapRef = useRef<Record<string, number>>({});

  // plants settings
  const plantsQ = useGetPlant() as QueryLike<SettingsResponse>;
  const plantsData = plantsQ.data;

  // profile
  const profileQ = useGetProfile() as QueryLike<ProfileDTO> & { refetch: () => Promise<any> };
  const profile = profileQ.data;
  const refetchProfile = profileQ.refetch;

  // update profile
  const updateQ = useUpdateCustomerProfile() as {
    mutateAsync: (payload: any) => Promise<any>;
    isPending: boolean;
  };
  const updateProfile = updateQ.mutateAsync;
  const updating = updateQ.isPending;

  // locations
  const provincesQ = useProvinces() as QueryLike<any> & { items: PickerItem[]; isLoading: boolean; isError: boolean; error?: unknown };
  const wardsQBase = useWards((useWatch as any) ? undefined : undefined) as any; // not used here; kept for typing trick

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
    formState: { errors, isValid, touchedFields, submitCount },
  } = form;

  const fullName = useWatch({ control, name: 'fullName' });
  const area = useWatch({ control, name: 'area' });
  const ward = useWatch({ control, name: 'ward' });
  const birthday = useWatch({ control, name: 'birthday' });
  const crops = useWatch({ control, name: 'crops' });

  const wardsQ = useWards(area?.code) as QueryLike<any> & { items: PickerItem[]; isLoading: boolean; isError: boolean; enabled?: boolean; error?: unknown };

  // ===== options cây trồng: id = String(plant.id) =====
  const plants = plantsData?.data?.plants ?? [];

  const cropsOptions = useMemo<CropOption[]>(() => {
    return plants.map(p => ({ id: String(p.id), label: p.name })); // ✅ id là plant.id
  }, [plants]);

  const plantIdSet = useMemo(() => new Set(plants.map(p => String(p.id))), [plants]);

  // normalize mảng id từ profile (number/string) -> string ids hợp lệ
  const normalizePlantIds = useCallback(
    (arr: Array<number | string> | null | undefined) => {
      const raw = Array.isArray(arr) ? arr : [];
      const out: string[] = [];
      for (const x of raw) {
        const s = String(x);
        if (plantIdSet.size && !plantIdSet.has(s)) {continue;}
        out.push(s);
      }
      return Array.from(new Set(out));
    },
    [plantIdSet],
  );

  // ===== Prefill base fields =====
  useEffect(() => {
    if (!profile) {return;}

    const provinceNameFromProfile = profile.location_name || '';
    const wardNameFromProfile = profile.ward_name || '';

    const cleanedAddress = stripTrailingParts(profile.address || '', [
      wardNameFromProfile,
      provinceNameFromProfile,
    ]);

    // ✅ lấy plant ids từ profile và set vào crops để tự "tích"
    const preSelected = normalizePlantIds(profile.type_of_plants_ids as any);

    reset(
      {
        avatarUri: profile.avatar || null,
        fullName: (profile.full_name || '').trim(),
        area: null, // map ở effect bên dưới
        ward: profile.ward_name || null, // map ở effect bên dưới
        addressLine: cleanedAddress,
        birthday: profile.birth_date ? String(profile.birth_date).slice(0, 10) : '',
        crops: preSelected,
      },
      { keepDirtyValues: true } as any,
    );
  }, [profile, reset, normalizePlantIds]);

  // nếu plants load sau: lọc lại crops đang chọn để không giữ id rác
  useEffect(() => {
    if (!plantIdSet.size) {return;}
    const cur = getValues('crops') || [];
    const next = cur.filter(id => plantIdSet.has(String(id)));
    if (next.length !== cur.length) {
      setValue('crops', next, { shouldDirty: true });
    }
  }, [plantIdSet, getValues, setValue]);

  // ===== Map province by name -> code =====
  useEffect(() => {
    if (!profile) {return;}
    if (!provincesQ.items?.length) {return;}

    const currentArea = getValues('area');
    if (currentArea?.code) {return;}

    const provinceName = norm(profile.location_name);
    if (!provinceName) {return;}

    const found = provincesQ.items.find((p: any) => norm(p.name) === provinceName);
    if (!found) {return;}

    setValue('area', { id: found.id, name: found.name, code: found.code }, { shouldDirty: false });
  }, [profile, provincesQ.items, getValues, setValue]);

  // ===== Map ward by name -> code =====
  useEffect(() => {
    if (!profile) {return;}
    if (!wardsQ.items?.length) {return;}

    const currentWard = getValues('ward');
    if (currentWard?.code) {return;}

    const wardName = norm(profile.ward_name);
    if (!wardName) {return;}

    const found = wardsQ.items.find((w: any) => norm(w.name) === wardName);
    if (!found) {return;}

    setValue('ward', { id: found.id, name: found.name, code: found.code }, { shouldDirty: false });
  }, [profile, wardsQ.items, getValues, setValue]);

  // ===== Progress =====
  const progress = useMemo(() => {
    let done = 0;
    if (fullName?.trim()) {done++;}
    if (area) {done++;}
    if (ward) {done++;}
    if (crops?.length > 0) {done++;}
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

  // ===== Picker modal =====
  const [pickerVisible, setPickerVisible] = useState(false);
  const [pickerKind, setPickerKind] = useState<PickerKind>('province');

  const openPicker = useCallback((kind: PickerKind) => {
    Keyboard.dismiss();
    setPickerKind(kind);
    setPickerVisible(true);
  }, []);

  const pickerItems = useMemo<PickerItem[]>(() => {
    return pickerKind === 'province' ? (provincesQ.items || []) : (wardsQ.items || []);
  }, [pickerKind, provincesQ.items, wardsQ.items]);

  const onSelectPickerItem = useCallback(
    (it: PickerItem) => {
      if (pickerKind === 'province') {
        setValue('area', { id: it.id, name: it.name, code: it.code }, { shouldDirty: true });
        setValue('ward', null, { shouldDirty: true });
        setValue('addressLine', '', { shouldDirty: true });
      } else {
        setValue('ward', { id: it.id, name: it.name, code: it.code }, { shouldDirty: true });
      }
      setPickerVisible(false);
    },
    [pickerKind, setValue],
  );

  // ===== Birthday modal =====
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

  // ===== Submit =====
  const submitting = updating;
  const submitDisabled = submitting || !isValid;

  const onSubmit = useCallback(
    async (values: FormValues) => {
      Keyboard.dismiss();

      // ✅ convert string ids -> number[] (nếu backend cần ids)
      const plantIds = (values.crops || [])
        .map(x => Number(x))
        .filter(n => Number.isFinite(n));

      const payload = buildUpdateProfilePayload({
        fullName: values.fullName,
        avatarUri: values.avatarUri,
        addressLine: values.addressLine,
        ward: values.ward,
        birthday: values.birthday,
        crops: plantIds, // ✅ gửi ids
      });

      await updateProfile(payload);
      await refetchProfile();
      goBack();
    },
    [updateProfile, refetchProfile],
  );

  const onInvalid = useCallback((formErrors: any) => {
    const order: Array<keyof FormValues> = ['fullName', 'area', 'ward', 'addressLine', 'crops'];
    const firstKey = order.find(k => !!formErrors?.[k]);
    if (!firstKey) {return;}

    Keyboard.dismiss();
    setTimeout(() => {
      const y = yMapRef.current[firstKey as string] ?? 0;
      scrollRef.current?.scrollTo?.({ y: Math.max(0, y - scale(12)), animated: true });
    }, 60);
  }, []);

  const addressEnabled = !!ward;

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <HeaderBar title="Chỉnh sửa hồ sơ" onBack={() => goBack()} />

      <FormProvider {...form}>
        <View style={{ flex: 1 }}>
          {/* ✅ ScrollView thường: keyboard hiện lên KHÔNG auto đẩy layout */}
          <ScrollView
            ref={scrollRef}
            style={{ flex: 1 }}
            contentContainerStyle={[
              styles.scrollContent,
              { paddingBottom: scale(90) + insets.bottom }, // chừa chỗ bottom bar
            ]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            automaticallyAdjustKeyboardInsets={false}
          >
            <HeroCard progress={progress} />

            <View style={styles.formCard}>
              {/* Full name */}
              <View onLayout={e => (yMapRef.current.fullName = e.nativeEvent.layout.y)}>
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
                {showError('fullName') ? <CText style={styles.err}>{errors.fullName?.message as any}</CText> : null}
              </View>

              {/* Province */}
              <View style={{ marginTop: scale(12) }} onLayout={e => (yMapRef.current.area = e.nativeEvent.layout.y)}>
                <LabelRow label="Tỉnh/Thành phố" required missing={missing.area} />
                <SelectBox
                  value={area?.name || 'Bấm để chọn Tỉnh/Thành'}
                  onPress={() => openPicker('province')}
                  error={showError('area')}
                  disabled={!!provincesQ.isLoading}
                />
                {provincesQ.isError ? (
                  <CText style={styles.err}>
                    {(provincesQ.error as any)?.message || 'Không tải được danh sách Tỉnh/Thành'}
                  </CText>
                ) : null}
                {showError('area') ? <CText style={styles.err}>{errors.area?.message as any}</CText> : null}
              </View>

              {/* Ward */}
              <View style={{ marginTop: scale(12) }} onLayout={e => (yMapRef.current.ward = e.nativeEvent.layout.y)}>
                <LabelRow label="Phường/Xã" required missing={missing.ward} />
                <SelectBox
                  value={ward?.name || 'Chọn Phường/Xã'}
                  onPress={() => openPicker('ward')}
                  disabled={!area?.code || !!wardsQ.isLoading || !!wardsQ.isError || wardsQ.enabled === false}
                  hint={!area?.code ? 'Vui lòng chọn Tỉnh/Thành trước' : undefined}
                  error={showError('ward')}
                  placeholderLike={!ward}
                />
                {wardsQ.isError ? (
                  <CText style={styles.err}>
                    {(wardsQ.error as any)?.message || 'Không tải được danh sách Phường/Xã'}
                  </CText>
                ) : null}
                {showError('ward') ? <CText style={styles.err}>{errors.ward?.message as any}</CText> : null}
              </View>

              {/* Address */}
              <FadeUp show={addressEnabled} style={{ marginTop: scale(12) }}>
                <View onLayout={e => (yMapRef.current.addressLine = e.nativeEvent.layout.y)}>
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
                    <CText style={styles.err}>{errors.addressLine?.message as any}</CText>
                  ) : null}
                  <CText style={styles.hint}>Gợi ý: nhập càng rõ càng dễ giao hàng & tư vấn đúng vườn</CText>
                </View>
              </FadeUp>

              {!addressEnabled ? (
                <CText style={[styles.hint, { marginTop: scale(12) }]}>
                  Chọn xong Phường/Xã thì hệ thống mới cho nhập địa chỉ chi tiết.
                </CText>
              ) : null}

              {/* Birthday */}
              <View style={{ marginTop: scale(12) }}>
                <LabelRow
                  label="Sinh nhật (Không bắt buộc)"
                  icon={<Calendar size={16} color={Colors.greenPrimary} />}
                />
                <SelectBox value={birthdayText} onPress={openBirthday} placeholderLike={!birthday} />

                {birthday ? (
                  <Pressable
                    onPress={() => setValue('birthday', '', { shouldDirty: true })}
                    hitSlop={10}
                    style={{ marginTop: scale(8), alignSelf: 'flex-start' }}
                  >
                    <CText style={{ color: Colors.greenPrimary, fontWeight: '900' }}>Xóa ngày</CText>
                  </Pressable>
                ) : null}

                <CText style={styles.hint}>Chọn đúng sinh nhật để nhận quà 🎁 (nếu không nhớ có thể bỏ qua)</CText>
              </View>

              {/* Crops */}
              <View style={{ marginTop: scale(14) }} onLayout={e => (yMapRef.current.crops = e.nativeEvent.layout.y)}>
                <LabelRow label="Bạn đang trồng những loại cây nào?" required missing={missing.crops} />

                {plantsQ.isLoading ? (
                  <CText style={styles.hint}>Đang tải danh sách cây trồng...</CText>
                ) : plantsQ.isError ? (
                  <CText style={styles.err}>
                    {(plantsQ.error as any)?.message || 'Không tải được danh sách cây trồng'}
                  </CText>
                ) : null}

                <Controller
                  control={control}
                  name="crops"
                  render={({ field: { value, onChange } }) => (
                    <CropMultiSelect
                      options={cropsOptions}
                      value={value || []} // ✅ chứa plantId => chip sẽ tự tích
                      onChange={onChange}
                      columns={2}
                      maxVisible={8}
                    />
                  )}
                />

                {showError('crops') ? <CText style={styles.err}>{errors.crops?.message as any}</CText> : null}
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
              <CText style={styles.bottomHint}>Vui lòng kiểm tra lại các mục bắt buộc (*)</CText>
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

          {/* ✅ Bottom bar FIXED: không bị đẩy theo keyboard */}

        </View>

        {/* Picker Modal — GIỮ NGUYÊN */}
        <PickerModal
          visible={pickerVisible}
          title={pickerKind === 'province' ? 'Chọn Tỉnh/Thành' : 'Chọn Phường/Xã'}
          items={pickerItems}
          onClose={() => setPickerVisible(false)}
          onSelect={onSelectPickerItem}
          loading={pickerKind === 'province' ? !!provincesQ.isLoading : !!wardsQ.isLoading}
          errorText={
            pickerKind === 'province'
              ? provincesQ.isError
                ? (provincesQ.error as any)?.message
                : undefined
              : wardsQ.isError
              ? (wardsQ.error as any)?.message
              : undefined
          }
          emptyText={pickerKind === 'ward' && area ? 'Tỉnh/Thành này chưa có danh sách Phường/Xã' : 'Không có dữ liệu'}
        />

        {/* Birthday modal */}
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
                <Pressable onPress={() => setBirthdayModalOpen(false)} hitSlop={10}>
                  <CText style={styles.modalClose}>Đóng</CText>
                </Pressable>
              </View>

              <DatePicker
                date={tempBirthday}
                onDateChange={setTempBirthday}
                mode="date"
                locale="vi"
                minimumDate={MIN_BIRTHDAY}
                maximumDate={MAX_BIRTHDAY}
              />

              <View style={{ flexDirection: 'row', gap: scale(10), marginTop: scale(12) }}>
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
                    setValue('birthday', formatYmd(tempBirthday), { shouldDirty: true });
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
                  <CText style={{ fontWeight: '900', color: Colors.white }}>Xong</CText>
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
