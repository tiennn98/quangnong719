import CText from '@/components/text';
import {Colors, Fonts} from '@/themes';
import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {scale} from 'react-native-utils-scale';

export type TabItemType = {
  key: string;
  title: string;
};

interface TabBarCustomProps {
  data: Array<TabItemType>;
  activeIndex: number;
  onPressTab: (index: any) => void;
  tabBarContainerStyle: any;
}

const TabBarCustom: React.FC<TabBarCustomProps> = ({
  tabBarContainerStyle,
  data,
  activeIndex,
  onPressTab,
}) => {
  return (
    <View style={[styles.container, tabBarContainerStyle]}>
      {data.map(item => {
        const tabIndex = data.indexOf(item);
        const active = activeIndex === tabIndex;
        const click = () => {
          onPressTab(tabIndex);
        };

        return (
          <TouchableOpacity
            key={item.key}
            style={[styles.tab, active ? styles.tabActive : {}]}
            onPress={click}>
            <CText
              fontSize={12}
              color={active ? Colors.gray900 : Colors.gray500}
              fontFamily={Fonts.MEDIUM}>
              {item.title}
            </CText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDF3F0',
    height: scale(40),
    padding: scale(4),
    borderRadius: scale(12),
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  tabActive: {
    backgroundColor: '#F8F7F1',
    borderRadius: scale(8),
    shadowColor: 'rgba(0, 0, 0, 0.12)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    elevation: 2,
  },
});

export default TabBarCustom;
