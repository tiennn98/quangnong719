import React, {memo} from 'react';
import {Pressable, View} from 'react-native';
import {ArrowLeft} from 'lucide-react-native';
import CText from '@/components/text';
import {Colors} from '@/themes';
import {scale} from 'react-native-utils-scale';
import {styles} from '../style.module';

type Props = {
  title: string;
  onBack: () => void;
};

const HeaderBar = memo(({title, onBack}: Props) => {
  return (
    <View style={styles.header}>
      <Pressable
        onPress={onBack}
        hitSlop={10}
        style={({pressed}) => [styles.backBtn, pressed && {opacity: 0.85}]}>
        <ArrowLeft size={20} color={Colors.h1} />
      </Pressable>

      <CText style={styles.headerTitle}>{title}</CText>
      <View style={{width: scale(40)}} />
    </View>
  );
});

export default HeaderBar;
