import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    container: {
      fontWeight: '400',
      color: 'rgba(255, 255, 255, 0.87)',
      backgroundColor: '#242424',
      height: "100%",
      width: "100%",
      marginHorizontal: 'auto',
      textAlign: 'center',
      alignItems: "center",
      paddingTop: '10%'
    },
    head: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 30,
      width: '80%'
    },
    viewAbajo: {
      marginTop: '5%',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    input: {
      borderRadius: 10,
      borderWidth: 1.6,
      borderColor: 'transparent',
      padding: 10,
      fontSize: 20,
      width: '100%',
      color: 'rgba(255, 255, 255, 0.87)',
  
      fontWeight: '400',
      backgroundColor: 'black',
      transition: 'border-color 0.25s',
    },
    textH2: {
      color: "white",
      fontWeight: '500',
      fontSize: 30,
      color: 'rgba(255, 255, 255, 0.87)',
      marginBottom: '10%'
    },
    boton: {
      borderRadius: 8,
      borderWidth: 1,
      borderColor: 'transparent',
      padding: 10,
      fontWeight: '500',
      backgroundColor: '#121212',
      transition: 'border-color 0.25s',
      width: '50%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    boton2: {
      borderRadius: 8,
      borderWidth: 1,
      borderColor: 'transparent',
      padding: 10,
      fontWeight: '500',
      backgroundColor: '#121212',
      alignItems: 'center',
      justifyContent: 'center'
    },
    botonText: {
      fontWeight: '500',
      color: 'white',
      fontSize: 18,
    },
    image: {
      height: 200,
      width: 200
    },
    sectionView: {
      width: "100%",
      gap: 5
    }
  });
  