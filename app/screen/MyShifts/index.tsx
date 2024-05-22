import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, SectionList, SafeAreaView, ScrollView } from 'react-native';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import CustomText from '../../components/CustomText'
import COLORS from '../../utils/colors';
import CustomTouchableOpacity from '../../components/CustomTouchableOpacity';
import { fetchShiftsData } from '../../slice/shiftsSlice'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCancelData } from '../../slice/cancelSlice'
import { fetchBookData } from '../../slice/bookSlice'

interface Props { }

const MyShifts: React.FC<Props> = props => {
  const dispatch = useDispatch();
  const [sections, setSections] = useState([]);
  const [data, setData] = useState();
  const shifts = useSelector((state: any) => state?.shift?.data);
  console.log("shifts ::::", shifts)

  useEffect(() => {
    dispatch(fetchShiftsData());
  }, []);

  useEffect(() => {
    if (shifts != null) {
      setData(shifts)
    }
  }, [shifts]);

  useEffect(() => {
    if (data) {
      const today = new Date();
      const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
      const formattedSections = data.reduce((acc, item) => {
        const date = new Date(item.startTime);
        const formattedDate = date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });

        const options = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };
        const startTime = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: 'numeric', hour12: false });
        const endTime = new Date(item.endTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: 'numeric', hour12: false });

        if (date.getDate() === today.getDate()) {
          acc['Today'].push({ ...item, startTime, endTime });
        } else if (date.getDate() === tomorrow.getDate()) {
          acc['Tomorrow'].push({ ...item, startTime, endTime });
        } else {
          acc[formattedDate] = [{ ...item, startTime, endTime }];
        }
        return acc;
      }, { Today: [], Tomorrow: [] });

      setSections(Object.entries(formattedSections).map(([title, data]) => ({ title, data })));
    }
  }, [data]);

  const cancelData = (id) => {
    const payload = {
      id: id
    };
    dispatch(fetchCancelData(payload));
  }

  const bookData = (id) => {
    const payload = {
      id: id
    };
    dispatch(fetchBookData(payload));
  }

  const renderItem = ({ item }) => (
    <View style={styles.renderItemStyle}>
      <View>
        <CustomText style={styles.textTimeStyle} >{item.startTime} - {item.endTime}</CustomText>
        <CustomText style={styles.textAreaStyle}>{item.area}</CustomText>
      </View>
      <CustomTouchableOpacity onPress={() => { item.booked ? bookData(item?.id) : cancelData(item?.id) }} style={[styles.viewCancelStyle, { borderWidth: 1, borderColor: item.booked ? COLORS.textColor5 : COLORS.textColor3 }]}>
        <CustomText style={[styles.textCancelStyle, { color: item.booked ? COLORS.textColor5 : COLORS.textColor6 }]}>{item.booked ? 'Book' : 'Cancel'}</CustomText>
      </CustomTouchableOpacity>
    </View>
  );

  const renderSectionHeader = ({ section }) => (
    <View style={styles.viewHeaderStyle}>
      <CustomText style={[styles.textHeaderStyle, { marginHorizontal: 10, paddingVertical: 5 }]}>{section.title}</CustomText>
      <CustomText style={styles.textShiftStyle}>{section?.data?.length} Shifts, </CustomText>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={sections}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={item => item.id}
        scrollEnabled={true}
      />
    </SafeAreaView>
  );
};

MyShifts.defaultProps = {};

export default MyShifts;
