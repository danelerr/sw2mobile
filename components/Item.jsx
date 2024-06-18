import styles from "../styles/Estilos.js";
import {
    Text, TouchableOpacity,
  } from 'react-native';


export const Item = ({ item, onPress, backgroundColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.boton2, { backgroundColor }]}>
      <Text style={[styles.botonText]}>{item.title}</Text>
    </TouchableOpacity>
  );