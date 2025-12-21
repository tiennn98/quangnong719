import React, {memo} from 'react';
import {View} from 'react-native';
import CText from '@/components/text';
import {styles} from '../style.module';

type Props = {
  progress: number; // 0..1
};

const HeroCard = memo(({progress}: Props) => {
  const pct = Math.round(progress * 100);
  const remain = 4 - Math.round(progress * 4);

  return (
    <View style={styles.heroCard}>
      <CText style={styles.h1}>Hoàn tất hồ sơ của bạn</CText>
      <CText style={styles.sub}>Hãy cho chúng tôi biết về vườn cây của bạn</CText>

      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, {width: `${pct}%`}]} />
      </View>

      <CText style={styles.progressText}>
        {pct}% • Còn {remain} mục bắt buộc
      </CText>

      <View style={styles.tipBanner}>
        <CText style={styles.tipText}>
          🎉 {pct >= 100 ? 'Hoàn tất rồi!' : 'Gần xong rồi!'} Bổ sung hồ sơ để nhận ưu đãi tốt hơn
        </CText>
      </View>
    </View>
  );
});

export default HeroCard;
