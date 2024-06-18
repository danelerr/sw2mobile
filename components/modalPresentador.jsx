import React from 'react';
import { View, Modal, FlatList, Button, Image, TouchableOpacity } from 'react-native';

export const ModalPresentador = ({ visible, onClose, onSelect, data, cargarGaleria }) => {

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => { onSelect(item.image_url); onClose(); }}>
                <Image
                    source={{ uri: item.image_url }}
                    style={{ width: 100, height: 100, borderRadius: 10 }}
                />
            </TouchableOpacity>
        );
    };

    return (
        <Modal visible={visible} animationType="slide" transparent onRequestClose={() => onClose()}>
            <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'flex-end' }}>
                <View style={{
                    padding: 20,
                    width: '100%',
                    borderRadius: 20,
                    backgroundColor: 'black',
                }}>
                    <Button  color="#121212" title="Cargar desde galería" onPress={() => {
                        cargarGaleria();
                        onClose();
                    }}/>
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={item => item.image_url}
                        horizontal={true}
                    />
                </View>
            </View>
        </Modal>
    );
};
