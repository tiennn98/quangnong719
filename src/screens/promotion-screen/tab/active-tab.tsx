import {CText} from '@/components';
import CButton from '@/components/button';
import {Colors, Fonts} from '@/themes';
import {BadgeDollarSign, Gift, QrCode, Tag} from 'lucide-react-native';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {scale} from 'react-native-utils-scale';

const ActiveTabScreen = () => {
  const data = [
    {
      title: 'Giảm 20% khi mua phân bón Premium',
      code: 'PBFBSIUPBL',
      discount: 'Giảm giá: 20%',
      rule: 'Hóa đơn tối thiểu: 5.000 VND',
      expiry: '2026-01-01',
      from: 'Thưởng hạng Gold',
    },
    {
      title: 'Giảm 20% khi mua phân bón Premium',
      code: 'PBFBSIUPBL',
      discount: 'Giảm giá: 20%',
      rule: 'Hóa đơn tối thiểu: 5.000 VND',
      expiry: '2026-01-01',
      from: 'Thưởng hạng Gold',
    },
    {
      title: 'Giảm 20% khi mua phân bón Premium',
      code: 'PBFBSIUPBL',
      discount: '20%',
      rule: '5.000 VND',
      expiry: '2026-01-01',
      from: 'Thưởng hạng Gold',
    },
    {
      title: 'Giảm 20% khi mua phân bón Premium',
      code: 'PBFBSIUPBL',
      discount: 'Giảm giá: 20%',
      rule: 'Hóa đơn tối thiểu: 5.000 VND',
      expiry: '2026-01-01',
      from: 'Thưởng hạng Gold',
    },
    {
      title: 'Giảm 20% khi mua phân bón Premium',
      code: 'PBFBSIUPBL',
      discount: 'Giảm giá: 20%',
      rule: 'Hóa đơn tối thiểu: 5.000 VND',
      expiry: '2026-01-01',
      from: 'Thưởng hạng Gold',
    },
    {
      title: 'Giảm 20% khi mua phân bón Premium',
      code: 'PBFBSIUPBL',
      discount: '20%',
      rule: '5.000 VND',
      expiry: '2026-01-01',
      from: 'Thưởng hạng Gold',
    },
  ];
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.list}>
        {data.map((e, index) => {
          return (
            <View key={index} style={styles.containerItem}>
              <View style={styles.item}>
                <Gift color={Colors.yellow} />
                <View style={styles.gap}>
                  <CText fontFamily={Fonts.BOLD} fontSize={14}>
                    {e.title}
                  </CText>
                  <CText
                    fontFamily={Fonts.REGULAR}
                    fontSize={12}
                    color={Colors.h2}>
                    Code: {e.code}
                  </CText>
                </View>
              </View>
              <View style={styles.item}>
                <Tag color={'#14AE5C'} size={16} />
                <CText fontFamily={Fonts.REGULAR} fontSize={12}>
                  Giảm giá: {e.discount}
                </CText>
              </View>
              <View style={styles.item}>
                <BadgeDollarSign color={'#14AE5C'} size={16} />
                <CText fontFamily={Fonts.REGULAR} fontSize={12}>
                  Hoá đơn tối thiểu: {e.rule}
                </CText>
              </View>
              <View style={styles.item}>
                <BadgeDollarSign color={'#14AE5C'} size={16} />
                <CText fontFamily={Fonts.REGULAR} fontSize={12}>
                  Hạn sử dụng: {e.expiry}
                </CText>
              </View>
              <View style={styles.item}>
                <CText fontFamily={Fonts.REGULAR} fontSize={12}>
                  Nhận từ:
                </CText>
                <View style={styles.viewFrom}>
                  <CText
                    fontFamily={Fonts.BOLD}
                    fontSize={10}
                    color={Colors.h2}>
                    {e.from}
                  </CText>
                </View>
              </View>
              <View style={styles.viewButton}>
                <CButton
                  title="Sử dụng voucher"
                  onPress={() => {}}
                  renderIconLeft={
                    <QrCode
                      color={Colors.white}
                      size={20}
                      style={styles.icon}
                    />
                  }
                />
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default ActiveTabScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginBottom: scale(30),
  },
  list: {
    flex: 1,
    gap: scale(12),
  },
  containerItem: {
    backgroundColor: Colors.white,
    borderRadius: scale(12),
    paddingHorizontal: scale(12),
    paddingVertical: scale(16),
    gap: scale(6),
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
  },
  gap: {
    gap: scale(5),
  },
  viewFrom: {
    backgroundColor: '#E5F1E9',
    paddingHorizontal: scale(8),
    paddingVertical: scale(4),
    borderRadius: scale(4),
  },
  viewButton: {
    paddingHorizontal: scale(20),
    marginTop: scale(12),
  },
  icon: {
    marginRight: scale(8),
  },
});
