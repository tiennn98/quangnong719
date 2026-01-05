import React, {useEffect} from 'react';
import {useWindowDimensions} from 'react-native';
import {TabView as TabViewComponent} from 'react-native-tab-view';
import TabBarCustom, {TabItemType} from './tab-bar';

interface TabViewCustomProps {
  data: Array<TabItemType>;
  onIndex?: (index: number) => void;
  tabBarContainerStyle?: any;
  renderScene: any;
  activeIndex?: number;
  lazy?: boolean;
  moveToIndex?: number;
}

const TabView: React.FC<TabViewCustomProps> = ({
  lazy,
  data,
  onIndex,
  renderScene,
  tabBarContainerStyle,
  activeIndex,
  moveToIndex,
  ...rest
}) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState<number>(activeIndex || 0);
  const [routes] = React.useState<any>(data);

  const onIndexChange = (pos: number) => {
    setIndex(pos);
    onIndex && onIndex(pos);
  };

  useEffect(() => {
    if (moveToIndex != null) {
      setIndex(moveToIndex);
    }
  }, [moveToIndex]);

  return (
    <TabViewComponent
      {...rest}
      lazy={lazy}
      renderScene={renderScene}
      navigationState={{index, routes}}
      onIndexChange={onIndexChange}
      initialLayout={{width: layout.width}}
      renderTabBar={() => {
        return (
          <TabBarCustom
            data={data}
            activeIndex={index}
            onPressTab={onIndexChange}
            tabBarContainerStyle={tabBarContainerStyle}
          />
        );
      }}
    />
  );
};

export default TabView;
