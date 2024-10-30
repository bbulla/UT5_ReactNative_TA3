import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  StyleSheet, 
  ActivityIndicator, 
  Alert 
} from 'react-native';

const API_KEY = 'bd92e03a';

export default function MovieSearch() {
  const [movieTitle, setMovieTitle] = useState('');
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchMovie = async () => {
    if (movieTitle.trim() === '') {
      Alert.alert('Error', 'Ingresa el nombre de una película.');
      return;
    }

    setLoading(true);
    setMovieData(null); 

    try {
      const response = await fetch(
        `http://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=${API_KEY}`
      );
      const data = await response.json();

      if (data.Response === 'True') {
        setMovieData(data);
      } else {
        Alert.alert('No encontrado', 'No se encontró la película.');
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al buscar la película.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscador de Películas</Text>

      {/* Input para la búsqueda */}
      <TextInput
        style={styles.input}
        placeholder="Ingresa el nombre de una película"
        value={movieTitle}
        onChangeText={setMovieTitle}
      />

      {/* Botón de búsqueda */}
      <TouchableOpacity style={styles.button} onPress={searchMovie}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>

      {/* Indicador de carga */}
      {loading && <ActivityIndicator size="large" color="#007bff" />}

      {/* Mostrar información de la película */}
      {movieData && (
        <View style={styles.movieContainer}>
          <Image 
            source={{ uri: movieData.Poster }} 
            style={styles.poster} 
          />
          <Text style={styles.movieTitle}>{movieData.Title}</Text>
          <Text style={styles.moviePlot}>{movieData.Plot}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#8c0af9',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  movieContainer: {
    alignItems: 'center',
  },
  poster: {
    width: 300,
    height: 450,
    marginBottom: 10,
    borderRadius: 8,
  },
  movieTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  moviePlot: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
});