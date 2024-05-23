import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, Dimensions, Alert } from 'react-native';
import styles from './style';
import { fetchShiftsData } from '../../slice/shiftsSlice'
import { useDispatch, useSelector } from 'react-redux';
import Tab1 from './tab1';
import Tab2 from './tab2';
import Tab3 from './tab3';
import CustomText from '../../components/CustomText';
const { width } = Dimensions.get('window');
const headers = ['Helsinki', 'Tempere', 'Turku']

interface Props { }

const AvailableShifts: React.FC<Props> = props => {
  const dispatch = useDispatch();
  const [sections, setSections] = useState([]);
  const [data, setData] = useState();
  const [helSinkiValue, setHelSinkiValue] = useState()
  const [tempValue, setTempValue] = useState()
  const [turValue, setTurValue] = useState()
  const shifts = useSelector((state: any) => state?.shift?.data);
  const [active, setActive] = useState(0)
  const headerScrollView = useRef<FlatList>(null);
  const itemScrollView = useRef<FlatList>(null);

  useEffect(() => {
    dispatch(fetchShiftsData());
  }, []);

  useEffect(() => {
    if (shifts != null) {
      const filteredData1 = shifts.filter((item) => item.area === 'Helsinki' || item.area === 'Helsinki');
      setHelSinkiValue(filteredData1?.length)
      const filteredData2 = shifts.filter((item) => item.area === 'Tempere' || item.area === 'Tempere');
      setTempValue(filteredData2?.length)
      const filteredData3 = shifts.filter((item) => item.area === 'Turku' || item.area === 'Turku');
      setTurValue(filteredData3?.length)

    }
  }, [shifts]);

  useEffect(() => {
    headerScrollView.current.scrollToIndex({ index: active, viewPosition: 0.9 })
  }, [active])
  const onPressHeader = (index) => {
    itemScrollView.current.scrollToIndex({ index })
    setActive(index);
  }
  const onMomentumScrollEnd = (e) => {
    const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
    if (active != newIndex) {
      setActive(newIndex)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: 'row', }} >
        <FlatList
          data={headers}
          ref={headerScrollView}
          keyExtractor={(item) => item}
          horizontal
          style={styles.headerScroll}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View>
              <TouchableOpacity
                onPress={() => onPressHeader(index)}
                key={item}
                style={[styles.headerItem,]}
              >
                {
                  item === 'Helsinki' && <CustomText style={styles.text}>{item} ({helSinkiValue})</CustomText>
                }
                {
                  item === 'Tempere' && <CustomText style={styles.text}>{item} ({tempValue})</CustomText>
                }
                {
                  item === 'Turku' && <CustomText style={styles.text}>{item} ({turValue})</CustomText>
                }
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      <FlatList
        data={headers}
        ref={itemScrollView}
        keyExtractor={(item) => item}
        horizontal
        pagingEnabled
        decelerationRate='fast'
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
        renderItem={({ item, index }) => (
          <View key={item} style={styles.mainItem}>
            {index == 0 && <Tab1 />}
            {index == 1 && <Tab2 />}
            {index == 2 && <Tab3 />}
          </View>
        )}
      />
    </SafeAreaView>
  );
};

AvailableShifts.defaultProps = {};

export default AvailableShifts;
