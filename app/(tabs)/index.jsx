import {
  Text, TextInput, View, TouchableOpacity,
  FlatList, ScrollView, Image, ToastAndroid,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from '../../styles/Estilos.js'
import { useState } from 'react';
import emociones from '../../Data/emociones.js';
import voces from '../../Data/voces.js';
import presentadores from '../../Data/presentadores.js';

import { Item } from '../../components/Item.jsx';
import { ModalVoces } from '../../components/modalVoces.jsx';
import { ModalPresentador } from '../../components/modalPresentador.jsx';


//COLOCA TU API KEY DE D-ID AQUI
const TOKEN = 'Basic your:token'

export default function App() {
  const [image, setImage] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [expresion, setExpresion] = useState();
  const [modalVocesActivo, setModalVocesActivo] = useState(false);
  const [modalPresentadores, setModalPresentadores] = useState(false);
  const [voz, setVoz] = useState(null);



  const renderItem = ({ item }) => {
    const backgroundColor = item.id === expresion ? '#FF6DC6' : '#121212';
    return (
      <Item
        item={item}
        onPress={() => setExpresion(item.id)}
        backgroundColor={backgroundColor}
      />
    );
  };

  const cargarDesdeGaleria = async () => {
    const imagenSeleccionada = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      // aspect: [3, 4],
      quality: 1,
    });
    if (imagenSeleccionada.canceled) {
      return;
    }
    setImage({
      help: Date.now(),
      source: imagenSeleccionada.assets[0].uri,
    });
  }

  console.log(image);

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: "100%", height: "100%", color: 'rgba(255, 255, 255, 0.87)' }} >
        <View style={styles.container}>
          <Text style={styles.textH2} > SW2 2do parcial APP </Text>


          {/* CARGA DEL TEXTO O PROMPT */}
          <View style={styles.head}>
            <View style={styles.sectionView}>
              <Text style={styles.botonText}> Contenido </Text>
              <TextInput
                style={styles.input}
                editable
                multiline
                numberOfLines={2}
                placeholderTextColor="gray"
                onChangeText={text => {
                  setPrompt(text)
                }}
                placeholder="Escribe tu prompt"
                value={prompt}
              />
            </View>


            {/* CARGA DE LAS EMOCIONES */}
            <View style={styles.sectionView}>
              <Text style={styles.botonText}> Expresión </Text>
              <FlatList
                horizontal
                data={emociones}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                extraData={expresion}
              />
            </View>


            {/* CARGA DE LA IMÁGEN DEL PRESENTADOR */}
            <View style={styles.sectionView}>
              <Text style={styles.botonText}> Presentador </Text>
              <View style={{ alignItems: 'center', width: '100%', gap: 20 }}>
                {
                  image &&

                  <Image
                    key={image.help}
                    source={{ uri: image.source ? image.source : image.url }}
                    style={styles.image}
                  />
                }
                <TouchableOpacity
                  style={[styles.boton, { width: '80%' }]}
                  onPress={async () => {
                    setModalPresentadores(true);
                  }}
                >
                  <Text style={styles.botonText}> Cargar Presentador</Text>
                </TouchableOpacity>
              </View>
            </View>



            {/* CARGA DE LA VOZ */}
            <View style={styles.sectionView}>
              <Text style={styles.botonText}> Voz </Text>
              {voz &&
                <View style={{ alignItems: 'center', width: '100%', gap: 20 }}>
                  <Text style={styles.botonText}> {voz} </Text>
                </View>
              }
              <View style={{ flexDirection: 'row', gap: 20, justifyContent: 'center' }}>
                <TouchableOpacity
                  style={styles.boton}
                  onPress={() => setModalVocesActivo(true)}
                >
                  <Text style={styles.botonText}> Seleccionar Voz </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boton}>
                  <Text style={styles.botonText}> Grabar Voz </Text>
                </TouchableOpacity>
              </View>
            </View>



            {/* GENERAR EL EL VIDEO */}
            <TouchableOpacity
              style={styles.boton}
              onPress={async () => {

                if (image.source) {
                  const formData = new FormData();
                  formData.append('image', {
                    uri: image.source,
                    name: 'filename.jpg',
                    type: 'image/jpeg',
                  });

                  const options = {
                    method: 'POST',
                    headers: {
                      accept: 'application/json',
                      authorization: 'Basic WjJWaWIycHBPVFl5TlVCdGIzSjRhVzR1WTI5dDpPeFdrcTJINUpaeW9XYmluaGgyeTI='
                    },
                    body: formData
                  };

                  try {
                    const req = await fetch('https://api.d-id.com/images', options);
                    if (!req.ok) {
                      throw new Error('Error al subir la imagen');
                    }
                    const data = await req.json();

                    console.log(data);

                    const response = await fetch('https://api.d-id.com/talks/', {
                      method: 'POST',
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': TOKEN,
                      },
                      body: JSON.stringify({
                        "source_url": data.url,
                        "script": {
                          "type": "text",
                          "input": prompt,
                          "provider": {
                            "type": "microsoft",
                            "voice_id": voz,
                            "voice_config": {
                              "style": "Cheerful"
                            }
                          }
                        },
                        "config": {
                          "driver_expressions": {
                            "expressions": [
                              {
                                "start_frame": 0,
                                "expression": expresion,
                                "intensity": 1
                              }
                            ]
                          }
                        }
                      }),
                    });
                    if (!response.ok) {
                      throw new Error('No se pudo obtener la lista de videos');
                    }
                    const data2 = await response.json();
                    console.log(data2);
                    ToastAndroid.show('Generado. Eespera un momento yonsulta la pestaña de videos', ToastAndroid.SHORT);

                  } catch (error) {
                    console.error(error);
                  }

                } else {
                  try {
                    const response = await fetch('https://api.d-id.com/talks/', {
                      method: 'POST',
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic Z2Vib2ppOTYyNUBtb3J4aW4uY29t:OxWkq2H5JZyoWbinhh2y2',
                      },
                      body: JSON.stringify({
                        "source_url": image.url,
                        "script": {
                          "type": "text",
                          "input": prompt,
                          "provider": {
                            "type": "microsoft",
                            "voice_id": voz,
                            "voice_config": {
                              "style": "Cheerful"
                            }
                          }
                        },
                        "config": {
                          "driver_expressions": {
                            "expressions": [
                              {
                                "start_frame": 0,
                                "expression": expresion,
                                "intensity": 1
                              }
                            ]
                          }
                        }
                      }),
                    });
                    if (!response.ok) {
                      throw new Error('No se pudo obtener la lista de videos');
                    }
                    const data2 = await response.json();
                    console.log(data2);                   ToastAndroid.show('Generado. Eespera un momento yonsulta la pestaña de videos', ToastAndroid.SHORT);

                  } catch (error) {
                    console.error(error);
                  }

                }

              }}
            >
              <Text style={styles.botonText}> Generar </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>


      <ModalVoces
        visible={modalVocesActivo}
        onClose={() => setModalVocesActivo(false)}
        onSelect={(selectedOption) => setVoz(selectedOption)}
        data={voces}
      />

      <ModalPresentador
        visible={modalPresentadores}
        onClose={() => setModalPresentadores(false)}
        onSelect={(selectedOption) => setImage({ url: selectedOption })}
        data={presentadores}
        cargarGaleria={cargarDesdeGaleria}
      />

    </View>
  );
}