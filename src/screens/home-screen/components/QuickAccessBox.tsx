
import { CText } from '@/components';
import { Colors } from '@/themes';
import React from 'react';
import { StyleSheet, TouchableOpacity, View,Image } from 'react-native';
import { fontScale, scale, width } from 'react-native-utils-scale';

interface QuickAccessProps {
    icon: any;
    label: string;
}

export const QuickAccessBox: React.FC<QuickAccessProps> = React.memo(({
    icon,
    label,
}) => (
    <TouchableOpacity style={styles.quickAccessBox} activeOpacity={0.8}>
        <View style={styles.iconCircle}>
            <Image
                source={icon}
                style={styles.iconImage}
            />
        </View>
        <CText style={styles.quickAccessLabel}>{label}</CText>
    </TouchableOpacity>
));

const styles = StyleSheet.create({
    quickAccessBox: {
        width: width / 2 - scale(30),
        backgroundColor: Colors.white,
        borderRadius: scale(15),
        padding: scale(20),
        alignItems: 'center',
        justifyContent: 'center',
        height: scale(120),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    iconImage:{
          width: scale(30),
        height: scale(30),
    },
    iconCircle: {
        width: scale(40),
        height: scale(40),
        borderRadius: scale(8),
        backgroundColor: Colors.backgroundInput,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconText: {
        fontSize: fontScale(20),
    },
    quickAccessLabel: {
        fontSize: fontScale(14),
        fontWeight: '600',
        color: Colors.h2,
        marginTop: scale(10),
    },
});
