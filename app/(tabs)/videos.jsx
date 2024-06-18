import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image  } from 'react-native';

import { Video, ResizeMode } from 'expo-av';

import * as Sharing from 'expo-sharing';

import * as FileSystem from 'expo-file-system';

const VideosList = () => {
  
  const video = React.useRef(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('https://api.d-id.com/talks/', {
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            authorization: 'Basic Z2Vib2ppOTYyNUBtb3J4aW4uY29t:OxWkq2H5JZyoWbinhh2y2',
          },
        });
        if (!response.ok) {
          throw new Error('No se pudo obtener la lista de videos');
        }
        const data = await response.json();
        const filteredVideos = data.talks.filter(video => video.status === 'done');
        const formattedVideos = filteredVideos.map(video => ({
          id: video.id,
          title: video.created_at,
          url: video.result_url,
          thumbnail: video.source_url
        }));
        setVideoData(formattedVideos);
      } catch (error) {
        console.error('Error al obtener la lista de videos:', error);
      }
    };

    fetchVideos();
  }, []);

  const renderVideoItem = ({ item }) => (
    <TouchableOpacity onPress={() => setSelectedVideo(item)} style={{flexDirection: 'row', marginBottom: 30}}>
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <Text style={styles.videoTitle}>{item.title}</Text>
    </TouchableOpacity>
  );


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lista de Videos</Text>
      <FlatList
        data={videoData}
        renderItem={renderVideoItem}
        keyExtractor={(item) => item.id.toString()}
      />
      {selectedVideo && (
        <View style={styles.videoContainer}>
          <Video
            ref={video}
            style={styles.videoPlayer}
            source={{
              uri: selectedVideo.url,
            }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
      />
          <TouchableOpacity onPress={() => setSelectedVideo(null)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Cerrar Video</Text>
          </TouchableOpacity>
          <TouchableOpacity
                style={styles.closeButton}
                onPress={async () => {

                  if (!(await Sharing.isAvailableAsync())) {
                    Alert.alert('No se puede compartir');
                    return;
                  }
                  const fileUri = `${FileSystem.cacheDirectory}video.mp4`;
                  await FileSystem.downloadAsync(selectedVideo.url, fileUri);
                  await Sharing.shareAsync(fileUri)
                }}
              >
                <Text style={styles.closeButtonText} >
                  Compartir
                </Text>
              </TouchableOpacity>
        </View>
      )}
    </View>
  );
};







const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: '10%',
    backgroundColor: '#242424', // Fondo de la app
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFFFF', // Color del texto
  },
  videoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  thumbnail: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  videoTitle: {
    fontSize: 18,
    color: '#FFFFFF', // Color del texto
  },
  videoContainer: {
    marginTop: 20,
  },
  videoPlayer: {
    width: '100%',
    alignSelf: 'center',
    height: 200,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#FF6DC6',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
export default VideosList;
