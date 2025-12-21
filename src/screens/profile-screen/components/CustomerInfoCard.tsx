import { Images } from '@/assets';
import CText from '@/components/text';
import { useGetPlant } from '@/hooks/usePlant';
import { useGetProfile } from '@/hooks/useProfile';
import { Colors } from '@/themes';
import {
  BadgeCheck,
  Leaf,
  MapPin,
  Pencil,
  ShieldCheck,
  User,
} from 'lucide-react-native';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { fontScale, scale } from 'react-native-utils-scale';
import reactotron from 'reactotron-react-native';

interface CustomerInfoCardProps {
  rank: string;
  crops: string[];
  onEditPress?: () => void;
  avatarUri?: string;
  maxCropsToShow?: number;
}
const CustomerInfoCard: React.FC<CustomerInfoCardProps> = ({
  rank,
  crops,
  onEditPress,
  avatarUri,
  maxCropsToShow = 8,
}) => {
  const {data: profile} = useGetProfile();
  const {data:plantsData} = useGetPlant();
  const name = profile?.full_name?.trim() || '—';
  const phone = profile?.phone_number ? `${profile.phone_number}` : '—';
  const code = profile?.kiotviet_customer_code || '—';
  const address = [profile?.address?.trim(),profile?.ward_name?.trim()].filter(Boolean).join(', ') || 'Chưa cập nhật địa chỉ';

  const cropList = useMemo(
    () => (Array.isArray(crops) ? crops.filter(Boolean) : []),
    [crops],
  );

  const shownCrops = useMemo(
    () => cropList.slice(0, maxCropsToShow),
    [cropList, maxCropsToShow],
  );
  const extraCount = useMemo(
    () => Math.max(0, cropList.length - shownCrops.length),
    [cropList.length, shownCrops.length],
  );

  const [avatarFailed, setAvatarFailed] = useState(false);

  const handleAvatarError = useCallback(() => setAvatarFailed(true), []);

  const canShowNetworkAvatar = !!avatarUri && !avatarFailed;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image
          source={Images.logowhite}
          style={styles.watermark}
          resizeMode="contain"
        />

        <View style={styles.overlayDark} />
        <View style={styles.overlayHighlight} />

        <View style={styles.avatarWrap}>
          <View style={styles.avatarRing}>
            {canShowNetworkAvatar ? (
              <Image
                source={{uri: avatarUri}}
                style={styles.avatarImg}
                resizeMode="cover"
                onError={handleAvatarError}
              />
            ) : (
              <Image
                source={Images.logowhite}
                style={styles.avatarLogo}
                resizeMode="contain"
              />
            )}
          </View>

          <Pressable
            onPress={onEditPress}
            hitSlop={10}
            style={({pressed}) => [styles.editPill, pressed && styles.pressed]}>
            <Pencil size={14} color={Colors.h2} />
          </Pressable>
        </View>

        <View style={styles.headerText}>
          <View style={styles.nameRow}>
            <View style={styles.nameIcon}>
              <User size={14} color="rgba(255,255,255,0.95)" />
            </View>

            <CText style={styles.name} numberOfLines={1}>
              {name}
            </CText>
          </View>

          <CText style={styles.phone} numberOfLines={1}>
            {phone}
          </CText>

          <View style={styles.miniChipRow}>
            <View style={styles.miniChip}>
              <ShieldCheck size={14} color={Colors.yellow} />
              <CText style={styles.miniChipText}>Tài khoản</CText>
            </View>
          </View>
        </View>

        <View style={styles.rankChip}>
          <BadgeCheck size={14} color={Colors.yellow} />
          <CText style={styles.rankText} numberOfLines={1}>
            {rank}
          </CText>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.sectionTitleRow}>
          <CText style={styles.sectionTitle}>Thông tin</CText>
        </View>

        <InfoLine
          icon={<BadgeCheck size={16} color={Colors.greenPrimary} />}
          label="Mã khách hàng"
          value={code}
        />

        <InfoLine
          icon={<MapPin size={16} color={Colors.greenPrimary} />}
          label="Địa chỉ"
          value={address}
          multiline
        />

        <View style={[styles.lineRow, styles.lineRowLast]}>
          <View style={styles.lineLeft}>
            <View style={styles.lineIcon}>
              <Leaf size={16} color={Colors.greenPrimary} />
            </View>
            <CText style={styles.lineLabel}>Cây trồng</CText>
          </View>

          <View style={styles.cropsWrap}>
            {profile?.type_of_plants_ids.length ? (
              <>
                {profile?.type_of_plants_ids.map((crop, _) => {
                  reactotron.log('Crop:', crop);
                  plantsData?.data?.plants.filter(item => item.id === crop);
                  const cropLabel =
                    plantsData?.data?.plants.find(item => item.id === crop)?.name || crop;
                  return (
                    <View key={crop} style={styles.cropChip}>
                      <CText style={styles.cropText}>{cropLabel}</CText>
                    </View>
                  );
                })}

                {extraCount > 0 && (
                  <View style={[styles.cropChip, styles.cropMore]}>
                    <CText style={styles.cropText}>+{extraCount}</CText>
                  </View>
                )}
              </>
            ) : (
              <CText style={styles.valueMuted}>—</CText>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default memo(CustomerInfoCard);

const InfoLine = memo(
  ({
    icon,
    label,
    value,
    multiline,
  }: {
    icon: React.ReactNode;
    label: string;
    value: string;
    multiline?: boolean;
  }) => {
    return (
      <View style={styles.lineRow}>
        <View style={styles.lineLeft}>
          <View style={styles.lineIcon}>{icon}</View>
          <CText style={styles.lineLabel}>{label}</CText>
        </View>

        <CText style={styles.lineValue} numberOfLines={multiline ? 2 : 1}>
          {value}
        </CText>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: scale(18),
    overflow: 'hidden',
    marginBottom: scale(16),
    marginHorizontal: scale(16),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,0.08)',
  },

  /** ===== Header ===== */
  header: {
    backgroundColor: Colors.greenPrimary,
    padding: scale(14),
    paddingTop: scale(16),
    paddingBottom: scale(14),
    minHeight: scale(140),
    justifyContent: 'flex-end',
  },

  watermark: {
    position: 'absolute',
    right: scale(10),
    top: scale(10),
    width: scale(110),
    height: scale(110),
    opacity: 0.14,
  },

  overlayDark: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.12)',
  },

  overlayHighlight: {
    position: 'absolute',
    left: -scale(30),
    top: -scale(30),
    width: scale(180),
    height: scale(180),
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.10)',
  },

  avatarWrap: {
    position: 'absolute',
    left: scale(14),
    top: scale(16),
    width: scale(76),
    height: scale(76),
  },

  avatarRing: {
    width: scale(76),
    height: scale(76),
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: scale(2),
    borderColor: 'rgba(255,255,255,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  avatarImg: {
    width: '100%',
    height: '100%',
  },

  avatarLogo: {
    width: scale(56),
    height: scale(56),
    opacity: 0.95,
  },

  editPill: {
    position: 'absolute',
    right: -scale(10),
    bottom: -scale(6),
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
    paddingHorizontal: scale(10),
    height: scale(20),
    borderRadius: 999,
    backgroundColor: Colors.white,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,0.12)',
  },

  editText: {
    fontSize: fontScale(12),
    fontWeight: '800',
    color: Colors.h2,
  },

  pressed: {
    opacity: 0.8,
    transform: [{scale: 0.98}],
  },

  headerText: {
    paddingLeft: scale(92),
    paddingRight: scale(10),
  },

  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
  },

  nameIcon: {
    width: scale(24),
    height: scale(24),
    borderRadius: scale(10),
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  name: {
    flex: 1,
    fontSize: fontScale(16),
    fontWeight: '900',
    color: Colors.white,
  },

  phone: {
    marginTop: scale(6),
    fontSize: fontScale(12),
    color: 'rgba(255,255,255,0.88)',
  },

  miniChipRow: {
    marginTop: scale(10),
    flexDirection: 'row',
    gap: scale(8),
  },

  miniChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
    paddingHorizontal: scale(10),
    paddingVertical: scale(6),
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.20)',
    alignSelf: 'flex-start',
  },

  miniChipText: {
    color: 'rgba(255,255,255,0.92)',
    fontWeight: '800',
    fontSize: fontScale(11),
  },

  rankChip: {
    position: 'absolute',
    right: scale(12),
    bottom: scale(12),
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
    paddingHorizontal: scale(10),
    paddingVertical: scale(7),
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.22)',
    maxWidth: '55%',
  },

  rankText: {
    color: Colors.yellow,
    fontWeight: '900',
    fontSize: fontScale(12),
  },

  /** ===== Content ===== */
  content: {
    padding: scale(14),
    paddingTop: scale(12),
  },

  sectionTitleRow: {
    marginBottom: scale(8),
  },

  sectionTitle: {
    fontSize: fontScale(12),
    fontWeight: '900',
    color: 'rgba(0,0,0,0.45)',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },

  lineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(12),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.07)',
  },

  lineRowLast: {
    borderBottomWidth: 0,
  },

  lineLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
    flex: 1,
  },

  lineIcon: {
    width: scale(34),
    height: scale(34),
    borderRadius: scale(12),
    backgroundColor: 'rgba(11,43,30,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  lineLabel: {
    fontSize: fontScale(13),
    color: 'rgba(0,0,0,0.62)',
    fontWeight: '800',
  },

  lineValue: {
    flex: 1,
    textAlign: 'right',
    fontSize: fontScale(13),
    color: Colors.h1,
    fontWeight: '900',
  },

  valueMuted: {
    fontSize: fontScale(13),
    color: 'rgba(0,0,0,0.45)',
    fontWeight: '700',
  },

  cropsWrap: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    gap: scale(8),
  },

  cropChip: {
    backgroundColor: 'rgba(11,43,30,0.08)',
    borderRadius: 999,
    paddingHorizontal: scale(10),
    paddingVertical: scale(6),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(11,43,30,0.12)',
    maxWidth: '100%',
  },

  cropMore: {
    backgroundColor: 'rgba(11,43,30,0.12)',
    borderColor: 'rgba(11,43,30,0.18)',
  },

  cropText: {
    fontSize: fontScale(12),
    color: Colors.h2,
    fontWeight: '900',
  },
});
