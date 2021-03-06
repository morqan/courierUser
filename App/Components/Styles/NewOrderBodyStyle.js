import { Dimensions, PixelRatio, StyleSheet } from 'react-native'
let {width, height} = Dimensions.get('window')
export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    height: height - 300,
    paddingTop: 20,
    paddingBottom: 50,
    width
  },
  dashBox: {
    alignItems: 'center'

  },
  adressContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderColor: '#D3D3D3',
    paddingTop: 5,
    paddingBottom: 10
    // backgroundColor: 'red'
  },
  imgScroll: {
    height: 130,
    flex: 1,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderColor: '#D3D3D3',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  sectionTitleBox: {
    paddingTop: 15,
    // backgroundColor: 'green',
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 18,
    marginBottom: 5,
    paddingBottom: 5
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold'

  },
  orderDescriptionBox: {
    paddingHorizontal: 18,
    marginBottom: 15
  },
  orderDescription: {

  },
  sectionLine: {
    borderBottomWidth: 1,
    borderColor: '#D3D3D3'
  },
  sectionInlineLine: {
    borderBottomWidth: 1,
    borderColor: '#D3D3D3',
    marginHorizontal: 18
  },
  img: {
    padding: 5,
    borderRadius: 15
  },
  adressBox: {
    width: width * 0.85
  },
  adressTitle: {
    fontWeight: 'bold',
    fontSize: 16

  },
  adressText: {
    fontSize: 12,
    color: '#A9A9A9',
    marginTop: 8,
    marginBottom: 15
  },
  receiverInfoBox: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#D3D3D3',
    marginBottom: 100
  },
  receiverFields: {
    paddingVertical: 10
  },
  swipeBox: {
    position: 'absolute',
    bottom: 85,
    width,
    paddingHorizontal: 18
  },
  cashBox: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#D3D3D3'
  },
  cashValue: {
    fontSize: 25
  },
  cashMetod: {
    marginTop: 10
  },
  profileHeader: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    borderTopWidth: 1
  },
  profileBody: {
    flex: 9,
    backgroundColor: '#fff',
    padding: 30
  },
  profileHeaderBodyText: {
    fontSize: 18,
    color: '#000',
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
  profileHeaderBodyTextY: {
    fontSize: 17,
    color: '#606060',
    fontWeight: 'bold'
  },
  newsImage: {
    width: 50,
    height: 50,
  },
  inputBox: {
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10
  },
  PhoneInputBox: {
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 13,
    borderRadius: 10
  },
  actionBox: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    borderRadius: 10,
    width: 100,
    height: 100
  }
})
