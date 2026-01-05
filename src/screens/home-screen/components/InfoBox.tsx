import { Images } from '@/assets';
import { Colors } from '@/themes';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { fontScale, scale } from 'react-native-utils-scale';

interface InfoBoxProps {
  icon: ImageSourcePropType;
  value: string;
  label: string;
  color?: string;
}

const InfoBox: React.FC<InfoBoxProps> = React.memo(
  ({icon, value, label, color = Colors.h2}) => (
    <View style={infoBoxStyles.infoBoxContainer}>
      <TouchableOpacity style={infoBoxStyles.infoBox} activeOpacity={0.8}>
        <Image
          source={Images.logo}
          style={infoBoxStyles.icon}
          resizeMode="contain"
        />

        <Text style={[infoBoxStyles.infoBoxValue, {color}]}>{value}</Text>
        <Text style={infoBoxStyles.infoBoxLabel}>{label}</Text>
      </TouchableOpacity>
    </View>
  ),
);

export default InfoBox;

const infoBoxStyles = StyleSheet.create({
  infoBoxContainer: {
    width: '48%',
    marginBottom: scale(15),
  },
  infoBox: {
    backgroundColor: Colors.white,
    borderRadius: scale(15),
    padding: scale(15),
    height: scale(120),
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  icon: {
    width: scale(24),
    height: scale(24),
    marginBottom: scale(5),
  },
  infoBoxValue: {
    fontSize: fontScale(20),
    fontWeight: 'bold',
    marginBottom: scale(5),
  },
  infoBoxLabel: {
    fontSize: fontScale(14),
    color: Colors.h2,
  },
});
