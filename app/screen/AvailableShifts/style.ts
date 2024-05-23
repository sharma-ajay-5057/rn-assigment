import { StyleSheet } from 'react-native';
import COLORS from '../../utils/colors';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.textColor1
    },
    item: {
        backgroundColor: COLORS.textColor1,
    },
    header: {
        fontSize: 24,
        backgroundColor: COLORS.textColor5,
        // marginHorizontal:15,
        padding: 20,
        paddingHorizontal: 20
    },
    title: {
        fontSize: 20,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.textColor5,
        paddingVertical: 10
    },
    renderItemStyle: {
        flexDirection: 'row',
        padding: 5,
        borderBottomWidth: 0.7,
        borderColor: 'gray',
        justifyContent: 'space-between'
    },
    viewCancelStyle: {
        padding: 5,
        margin: 5,
        width: 100,
        borderRadius: 50,
    },
    viewHeaderStyle: {
        padding: 10,
        backgroundColor: COLORS.textColor4,
        borderWidth: 0.7,
        borderColor: COLORS.textColor5,
        flexDirection: 'row',
    },
    textCancelStyle: {
        textAlign: 'center',
        fontSize: 17,
        fontWeight: 'bold'
    },
    textHeaderStyle: {
        fontWeight: 'bold',
        fontSize: 16,
        color: COLORS.textColor8,

    },
    textTimeStyle: {
        fontWeight: 'bold',
        fontSize: 14,
        color: COLORS.textColor8,
        marginHorizontal: 10
    },
    textAreaStyle: {
        fontWeight: 'bold',
        fontSize: 14,
        color: COLORS.textColor5,
        marginHorizontal: 10
    },
    textShiftStyle: {
        color: COLORS.textColor5,
        paddingVertical: 8,
        fontWeight: 'bold',
        fontSize: 14,
    },
    headerScroll: {
        flexGrow: 0,
    },
    headerItem: {
        alignItems: 'center',
        paddingVertical: 20,
        width: 400 / 3
    },
    mainItem: {
        width: 415,
    },
    headerBar: {
        height: 2,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#000',
        position: 'absolute',
        bottom: 0
    },
    text: {
        fontSize: 16
    }
});

export default styles;
