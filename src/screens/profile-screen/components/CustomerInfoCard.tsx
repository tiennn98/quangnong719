// src/components/CustomerInfoCard.tsx

import { Images } from '@/assets';
import CText from '@/components/text';
import { useGetProfile } from '@/hooks/useProfile';
import { Colors } from '@/themes';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { scale } from 'react-native-utils-scale';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface CustomerInfoCardProps {
  name: string;
  phone: string;
  rank: string;
  customerId: string;
  address: string;
  crops: string[];
  avatarUri: string;
}

const CustomerInfoCard: React.FC<CustomerInfoCardProps> = ({
  name,
  phone,
  rank,
  customerId,
  address,
  crops,
  avatarUri,
}) => {
    const {data:profile} = useGetProfile();
  return (
    <View style={styles.card}>
      <View style={[styles.header, { backgroundColor: Colors.greenPrimary }]}>
        <View style={styles.avatarContainer}>
          <Image source={Images.logowhite } style={styles.avatar} />
          <TouchableOpacity style={styles.editButton}>
            <MaterialCommunityIcons name="pencil" size={16} color={Colors.h2} />
          </TouchableOpacity>
        </View>
        <CText style={styles.name}>{profile?.full_name}</CText>
        <CText style={styles.phone}>+{profile?.phone_number}</CText>
        <Image source={Images.logowhite} style={{width: scale(80), height: scale(80),position:'absolute',top:scale(10),right:scale(10)}} resizeMode="contain"/>
      </View>

      <View style={styles.content}>
        <View style={styles.rankTag}>
          <MaterialCommunityIcons name="ribbon" size={16} color={Colors.yellow} />
          <CText style={styles.rankText}>{rank}</CText>
        </View>

        <View style={styles.infoRow}>
          <CText style={styles.label}>Mã khách hàng</CText>
          <CText style={styles.value}>{profile?.kiotviet_customer_code}</CText>
        </View>

        <View style={styles.infoRow}>
          <CText style={styles.label}>Địa chỉ</CText>
          <CText style={styles.value}>{profile?.address || 'Chưa cập nhật địa chỉ'}</CText>
        </View>

        <View style={styles.infoRow}>
          <CText style={styles.label}>Cây trồng</CText>
          <View style={styles.cropsContainer}>
            {crops.map((crop, index) => (
              <View key={index} style={styles.cropTag}>
                <CText style={styles.cropText}>{crop}</CText>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    marginHorizontal: 16,
    // Thêm shadow nếu cần
  },
  header: {
    height: 100, // Chiều cao của phần xanh lá
    paddingTop: 50,
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: Colors.white,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.white,
    padding: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.backgroundInput,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
    position: 'absolute',
    top: 50,
    left: 110,
  },
  phone: {
    fontSize: 14,
    color: Colors.white,
    position: 'absolute',
    top: 75,
    left: 110,
  },
  content: {
    padding: 20,
    paddingTop: 40, // Để chừa chỗ cho avatar
  },
  rankTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.h2,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  rankText: {
    marginLeft: 4,
    fontWeight: '600',
    color: Colors.yellow,
    fontSize: 13,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: Colors.h2,
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.h2,
  },
  cropsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cropTag: {
    backgroundColor: '#F3F3E8', // Màu nền nhạt hơn cho tag cây trồng
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 8,
  },
  cropText: {
    fontSize: 14,
    color: Colors.h2,
  },
});

export default CustomerInfoCard;
