// src/components/ProfileUpdateReminderGate.tsx
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {AppState, Image, Pressable, View} from 'react-native';
import Modal from 'react-native-modal';

import {Images} from '@/assets/images';
import {CText} from '@/components';
import {SCREEN_NAME} from '@/constants';
import {useGetProfile} from '@/hooks/useProfile';
import {isProfileCompleted} from '@/screens/home-screen/helper';
import {navigate} from '@/navigators/navigation-service';
import {Colors} from '@/themes';
import {useGetPlant} from '@/hooks/usePlant';

type Props = {children: React.ReactNode};

const ProfileUpdateReminderGate: React.FC<Props> = ({children}) => {
  const {data: profile} = useGetProfile();
  const {data: plants} = useGetPlant();
  const needUpdate = useMemo(() => {
    if (!profile) {
      return false;
    }
    return !isProfileCompleted(profile);
  }, [profile]);

  // ✅ chỉ nhắc 1 lần mỗi lần app ACTIVE
  const shownThisSessionRef = useRef(false);
  const appStateRef = useRef(AppState.currentState);

  const [visible, setVisible] = useState(false);

  const maybeShow = () => {
    if (!needUpdate) {
      return;
    }
    if (shownThisSessionRef.current) {
      return;
    }
    shownThisSessionRef.current = true;
    setVisible(true);
  };

  useEffect(() => {
    // cold start
    maybeShow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [needUpdate]);

  useEffect(() => {
    const sub = AppState.addEventListener('change', next => {
      const prev = appStateRef.current;
      appStateRef.current = next;

      // background -> active: reset flag để lần mở app đó nhắc 1 lần
      if ((prev === 'background' || prev === 'inactive') && next === 'active') {
        shownThisSessionRef.current = false;
        // đợi 1 tick cho navigationRef ready + UI ổn định
        setTimeout(() => {
          maybeShow();
        }, 150);
      }
    });

    return () => sub.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [needUpdate]);

  const onUpdateNow = () => {
    setVisible(false);
    // đợi modal đóng xong tránh Android “đơ touch”
    setTimeout(() => {
      navigate(SCREEN_NAME.PROFILE_COMPLETION_SCREEN, {profile});
    }, 250);
  };

  const onLater = () => {
    setVisible(false);
  };

  return (
    <>
      {children}

      <Modal
        isVisible={visible}
        useNativeDriver
        hideModalContentWhileAnimating
        backdropOpacity={0.65}
        onBackdropPress={onLater}
        onBackButtonPress={onLater}
        style={{margin: 0, justifyContent: 'center', paddingHorizontal: 18}}>
        <View style={{backgroundColor: '#fff', borderRadius: 14, padding: 16}}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
            <Image
              source={Images.logo}
              resizeMode="contain"
              style={{width: 42, height: 42}}
            />
            <View style={{flex: 1}}>
              <CText
                style={{fontSize: 18, fontWeight: '900', color: Colors.h1}}>
                Hoàn thiện hồ sơ
              </CText>
              <CText style={{marginTop: 2, color: Colors.h2}}>
                Bạn có thể cập nhật sau, nhưng cập nhật đầy đủ sẽ giúp nhận ưu
                đãi & tư vấn đúng hơn.
              </CText>
            </View>
          </View>

          <View
            style={{
              marginTop: 12,
              padding: 12,
              borderRadius: 12,
              backgroundColor: 'rgba(0,0,0,0.04)',
            }}>
            <CText style={{color: Colors.h2}}>
              Cần bổ sung: Thay đổi tên của bạn, Tỉnh/Thành, Xã/Phường, Địa chỉ
              và Cây trồng.
            </CText>
          </View>

          <View style={{flexDirection: 'row', gap: 10, marginTop: 14}}>
            <Pressable
              onPress={onLater}
              style={{
                flex: 1,
                height: 48,
                borderRadius: 12,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.06)',
              }}>
              <CText style={{fontWeight: '900', color: Colors.h1}}>
                Để sau
              </CText>
            </Pressable>

            <Pressable
              onPress={onUpdateNow}
              style={{
                flex: 1,
                height: 48,
                borderRadius: 12,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: Colors.greenPrimary,
              }}>
              <CText style={{fontWeight: '900', color: Colors.white}}>
                Cập nhật ngay
              </CText>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ProfileUpdateReminderGate;
