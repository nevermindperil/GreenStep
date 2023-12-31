import {View, Text, Image, ScrollView, StyleSheet, TouchableOpacity} from 'react-native'
import React, {useState, useEffect} from 'react';
import ImageStyle from '../../../Style/Image';
import MyPloggingDetail from './MyPloggingDetail';
import { ProfileAPI } from '../../../Api/profileApi';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';
import noImage from '../../../Image/PloggingFinish/PloggingFinishNoImage.png'
import { msToHM, roundedTravelRange } from '../../../Function/Plogging/funcPlogging';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseURL } from '../../../Api/tokenHttp';
import TextStyle from '../../../Style/Text';
interface PloggingData {
    createdAt: string | null;
    getExp: number;
    ploggingId: number;
    trashAmount: number;
    travelRange: Double;
    travelTime: number;
    travelPicture : string | null;
  }

const MyPloggingList = () => {
    const isFocused = useIsFocused();
    const [dataList, setDataList] = useState<PloggingData[]>([]);
    const [idx, setIdx] = useState(0)
    const [toggle, setToggle] = useState(false)

    // 내 플로깅 이력 불러오기
    const getMyploggingList = async () => {
      try{
        const token = await AsyncStorage.getItem('accessToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`, // Bearer 스키마를 사용한 토큰 전달
            'Content-Type': 'application/json', // JSON 형식의 컨텐츠 타입 명시
          },
        };
        const res = await axios.get(
          `${baseURL}/plogging`,
          config,
        ); 
        console.log(res);
        setDataList(res.data)
      } catch(err){
        console.log('사용자 플로깅 List 조회 error', err)
      } 
  }
    const handleAvatarId = (index : number) =>{
      setIdx(index)
      handleToggle()
    }
    const handleToggle = () => {
      setToggle(!toggle)
    }

    useEffect(() => {
      if(isFocused){
        getMyploggingList();
      }
    }, [isFocused]);

  return(
        <View style={{alignItems: 'center', justifyContent: 'center', marginBottom: 30,}}>
            <ScrollView horizontal={false}>
                <View style={styles.wrapRow}>
                    {dataList.map((data, index) => (
                        <TouchableOpacity 
                        key={index} onPress={() => handleAvatarId(data.ploggingId)}>
                            <View style={{justifyContent:'center', alignItems:'center', marginLeft: 3, marginBottom: 3}}>
                              {data?.travelPicture?( 
                              <Image source={{uri: data?.travelPicture}} style={ImageStyle.mediumImage} resizeMode="cover"></Image>
                              ):(<Image source={noImage} style={ImageStyle.mediumImage} resizeMode="cover"></Image>)
                              }
                                <View style={[styles.overlayText, styles.noWrapRow]}>
                                    <Text style={[TextStyle.defaultBlack,styles.textStyle]}>{data.trashAmount} 개</Text>
                                    <Text style={[TextStyle.defaultBlack,styles.textStyle]}>{roundedTravelRange(data.travelRange)} KM</Text>
                                    <Text style={[TextStyle.defaultBlack,styles.textStyle]}>{msToHM(data.travelTime)}</Text>
                            </View>
                            </View>
                        </TouchableOpacity>
                        ))}
                </View>
            </ScrollView>
        {toggle && <MyPloggingDetail onClose={handleToggle} index={idx} />}
        </View>
    )
}

const styles = StyleSheet.create({
    wrapRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        margin: 10,
    },
    noWrapRow: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-around',
    },
    overlayText: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 5,
    },
    textStyle: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 10
    },
});
export default MyPloggingList;