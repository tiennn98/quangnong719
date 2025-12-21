import React, {memo} from 'react';
import {View} from 'react-native';
import CText from '@/components/text';
import {Colors} from '@/themes';
import {styles} from '../style.module';

type Props = {
  label: string;
  required?: boolean;
  icon?: React.ReactNode;
  missing?: boolean;
};

const LabelRow = memo(({label, required, icon, missing}: Props) => {
  return (
    <View style={styles.labelRow}>
      {icon ? <View style={styles.labelIcon}>{icon}</View> : null}

      <CText style={styles.label}>
        {label} {required ? <CText style={{color: Colors.red}}>*</CText> : null}
      </CText>

      {missing ? (
        <View style={styles.missingChip}>
          <CText style={styles.missingText}>Chưa có</CText>
        </View>
      ) : null}
    </View>
  );
});

export default LabelRow;
