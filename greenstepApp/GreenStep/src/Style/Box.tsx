import { StyleSheet } from 'react-native'

const Box = StyleSheet.create({
  /** 플로깅 진행 중 화면 위쪽의 정보 박스 */
  ploggingInfoBox: {
    width: '100%',
    padding: 20,
    backgroundColor: 'lightgreen',
    borderRadius: 20,
  },
  /** 플로깅 데이터 (세개짜리) 하나하나의 박스 */
  ploggingDataInfoBox: {
    flex: 1,
    // width: '32%',
    // display: 'flex',
    // height: '80%',
    aspectRatio: 0.9,
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
  },
  /** 업적 리스트, 게시글 리스트 박스 */
  cardBox: {
    width: '90%',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 5
  },
  /** 내가 작성한 게시글 박스 */
  mediumCardBox: {
    width: '40%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
  },
  /** 경쟁 기여도 부분 초록색 박스 */
  competitionBox: {
    width: '100%',
    padding: 30,
    backgroundColor: 'gray',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  /** 프로필 달력 박스 */
  calendarBox: {
    width: '50%',
    height : 160,
    padding : 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
  },
    /** 프로필 달력내 주 박스 */
    weekBox: {
      width: 20,
      height : 20,
      backgroundColor: 'skyblue',
      borderRadius: 2,
      marginRight: 4,
    },
    /** flexRow 박스 */
    flexRowBox: {
      display:'flex',
      flexDirection:'row',
    },
    /** 밑 공백 채우는 박스 */
    blankBox: {
      width: '90%',
      padding: 20,      
      borderRadius: 10,
    },
})

export default Box;


