import {
    View, Modal,
    FlatList,
  } from 'react-native';

import { Item } from './Item.jsx';

export const ModalVoces = ({ visible, onClose, onSelect, data }) => {

    const renderItem = ({ item }) => {
      return (
        <View style={{ marginBottom: 20 }}>
          <Item
            item={item}
            onPress={() => {
              onSelect(item.id);
              onClose();
            }}
            backgroundColor={'#121212'}
          />
        </View>
      );
    };

    return (
      <Modal visible={visible} animationType="slide" transparent  onRequestClose={() => onClose()}>
        <View style={{
          position: 'absolute',
          bottom: 0,
          padding: 20,
          width: '100%',
          borderRadius: 20,
          backgroundColor: 'rgba(0, 0, 0, 7)',
        }}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
      </Modal>
    );
  };