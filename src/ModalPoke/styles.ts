import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen')

export const styles = StyleSheet.create({
        Modal: {
        width: width,
        height: height,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center', 
        backgroundColor: 'rgba(58,58,58,.2)',
        zIndex: 1
    },

    contentModal: {
        height: '45%',
        // flexDirection: 'row',
        backgroundColor: "#f2f2f2",
        borderRadius: 40,
        overflow: 'hidden'
    },

})