import { StyleSheet } from "react-native";

// default header style
export const defaultStyles = StyleSheet.create({
    headerViewStyle: {
      flexDirection: 'row',
      borderBottomColor: '#00000011',
      backgroundColor: '#fff',
      borderBottomWidth: 1,
      paddingHorizontal: 15,
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 60,
    },
    backArrowSize: {width: 25, height: 25},
    headingStyle: {
      fontSize: 16,
      color: '#222020',
      fontWeight: '400',
      marginLeft: 8,
      flex: 1,
    },
    subHeadingStyle: {fontSize: 12, color: '#666666'},
  });