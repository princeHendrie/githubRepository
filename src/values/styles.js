import { StyleSheet, Dimensions } from 'react-native';
import color from './colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.greySoft,
        width: Dimensions.get('window').width, 
    },
    logoContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        flex:1,
        resizeMode: 'contain',
        width: 250,
        height: 250,
        marginTop: 30,
    },
    myForm: {
        flex: 2,
    },
    containerFormLogin: {
        flex: 1,
        marginTop: -30,
        paddingLeft: 30,
        paddingRight: 30,
    },
    input: {
        height: 40,
        borderColor: 'rgba(223,228,234, 0.8)',
        borderWidth: 1,
        paddingLeft: 10,
        marginBottom: 15,
        borderRadius:5,
    },
    label: {
        color: color.black,
        marginBottom: 10,
    },
    buttonContainer: {
        backgroundColor: color.green,
        paddingVertical: 15,
        marginTop: 30,
        borderRadius:5,
    },
    buttonText: {
        textAlign: 'center',
        color: color.white,
        fontWeight: 'bold'
    },
    iconSearch:{
        marginTop:5,
        color: color.grey,
        flex: 0,
    },
    inputSearch:{
        marginBottom:10,
        paddingBottom: 20,
        paddingRight:0,
        height:48,
    },
    card:{
        backgroundColor: color.green,
    },
    header:{
        flex: 0,
        marginBottom:10,
        marginTop:10,
        marginRight:15,
        marginLeft:15,
        padding:5,
        height:40,
        backgroundColor: color.white,
        borderRadius:3,
    },
    errorContainer: {
       padding: 20
    },
    errorText: {
        fontSize: 20,
        alignSelf: 'center',
        color: color.red,
        marginBottom: 15,
    },
    spinnerTextStyle: {
        color: color.white,
    },
    spinnerKotak: {
        alignSelf: 'center',
        marginTop: 150,
    },
    TouchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
    },
    FloatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
    },
    flatview: {
        paddingTop: 10,
        borderRadius: 2,
    },
    cardList:{
        flex: 0,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginRight:15,
        marginLeft:15,
        height:180,
        borderColor:  color.black,
        backgroundColor: color.white,
        borderRadius:5,
    },
    titleList: {
        fontSize: 14,
        fontWeight:'bold'
    },
    infoList: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 20,
    },
    buttonSearchContainer: {
        backgroundColor: color.grey,
        paddingVertical: 15,
        marginTop: 0,
        borderRadius:5,
        width: 150,
        height:40,
    },
    loadMoreBtn: {
        padding: 10,
        backgroundColor: '#800000',
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      loadmoreBtnText: {
        color: color.white,
        fontSize: 15,
        textAlign: 'center',
      },
      footer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      },
      
})
export default styles;