import React, {useState} from 'react';
import { View, Text, Image } from "react-native";
import Box from "../../Style/Box";
import ImageStyle from "../../Style/Image";
import avatar from '../../Image/Avatar/panda.png';
import TextStyle from '../../Style/Text';
interface detailProps{
    title:string,
    member: number,
    date: string,
}

const BoardCard = (detail: detailProps) => {
    return(
        <View style={{alignItems:'center', marginBottom: 20}}>
            <View style={[Box.cardBox,{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}]}>
                <View>
                <Text style={[TextStyle.defaultBlack,{fontWeight:'bold', fontSize: 20, marginBottom: 20}]}>{detail.title}</Text>
                <Text style={[TextStyle.defaultBlack,{marginBottom: 20}]}>인원 {detail.member}</Text>
                <Text style={[TextStyle.defaultBlack,{marginBottom: 20}]}>날짜 {detail.date}</Text> 
                </View>
                <View>
                <Image source={avatar} style={ImageStyle.mediumImage}></Image>
                </View>
            </View>
        </View>

    )
}
export default BoardCard;