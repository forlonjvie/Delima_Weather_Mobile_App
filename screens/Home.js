import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ActivityIndicator, ImageBackground, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native';
import { parseString } from 'react-native-xml2js';
import axios from 'axios';

const UNSPLASH_ACCESS_KEY = '5eM4NUxArHBGDIK90XYwq7wf0w8joTS7zcKaMlHKs1E';  

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [errorWeather, setErrorWeather] = useState(null);
  const [query, setQuery] = useState('London');
  const [search, setSearch] = useState('London');
  const [imageUrl, setImageUrl] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  
  const fetchWeather = (location) => {
    setLoadingWeather(true);
    fetch(`http://api.weatherapi.com/v1/forecast.xml?key=9015745e3e774dcf96a214401242406&q=${location}&days=3`)
      .then(response => response.text())
      .then(text => {
        parseString(text, { explicitArray: false }, (err, result) => {
          if (err) {
            console.error('XML parse error:', err);
            setErrorWeather(err);
          } else {
            setWeatherData(result.root);
            setErrorWeather(null);
          }
          setLoadingWeather(false);
        });
      })
      .catch((error) => {
        console.error('Fetch weather error:', error);
        setErrorWeather(error);
        setLoadingWeather(false);
      });
  };

  
  const fetchImage = (location) => {
    axios.get(`https://api.unsplash.com/search/photos`, {
      params: { query: location, per_page: 1 },
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`
      }
    })
    .then(response => {
      if (response.data.results.length > 0) {
        setImageUrl(response.data.results[0].urls.regular);
      } else {
        setImageUrl('');
      }
    })
    .catch(error => {
      console.error('Fetch image error:', error);
      setImageUrl('');
    });
  };

  
  useEffect(() => {
    fetchWeather(query);
    fetchImage(query);
  }, [query]);

  // Function to handle search button press
  const handleSearch = () => {
    setQuery(search);
  };


  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);


  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  };

  // Helper function to get day of the week
  const getDayOfWeek = (dateString) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateString);
    return daysOfWeek[date.getDay()];
  };

  return (
    <>
      <StatusBar hidden={true} />
      <ImageBackground source={imageUrl ? { uri: imageUrl } : null} style={styles.backgroundImage}>
        <View style={styles.overlay}>
          <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
              <View style={styles.timeContainer}>
                <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
                <Text style={styles.dateText}>{formatDate(currentTime)}</Text>
              </View>
              <Text style={styles.headerText}>Swipe to Show the 3-day Forecast</Text>
              <View style={styles.searchContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter location"
                  value={search}
                  onChangeText={setSearch}
                  placeholderTextColor="#ffffff"  // White placeholder text
                />
                <Button title="Search" onPress={handleSearch} />
              </View>
            </View>
            {loadingWeather ? (
              <ActivityIndicator size="large" color="#ffffff" />
            ) : errorWeather ? (
              <Text style={styles.errorText}>Error fetching weather data</Text>
            ) : weatherData && weatherData.forecast ? (
              <ScrollView horizontal={true} style={styles.forecastScroll}>
                {weatherData.forecast.forecastday.map((day, index) => (
                  <TouchableOpacity key={index} style={styles.forecastDay}>
                    <Text style={styles.date}>{day.date}</Text>
                    <View style={styles.dayOfWeekContainer}>
                      <Text style={styles.dayOfWeek}>{getDayOfWeek(day.date)}</Text>
                    </View>
                    <Image
                      source={{ uri: `https:${day.day.condition.icon}` }}
                      style={styles.weatherIcon}
                    />
                    <Text style={styles.info}>Max Temp: {day.day.maxtemp_c}°C</Text>
                    <Text style={styles.info}>Min Temp: {day.day.mintemp_c}°C</Text>
                    <Text style={styles.info}>Condition: {day.day.condition.text}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            ) : null}
          </ScrollView>
        </View>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    minHeight: '100%', 
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  timeContainer: {
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 50,
  },
  timeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  dateText: {
    fontSize: 18,
    color: '#ffffff',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 30,
    marginTop: 50,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ffffff',
    borderWidth: 1,
    paddingLeft: 8,
    marginRight: 10,
    color: '#ffffff', 
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  forecastScroll: {
    marginTop: 10,  
    marginBottom: 10, 
    paddingHorizontal: 10,  
  },
  forecastDay: {
    width: 300,  
    height: 250,  
    backgroundColor: 'rgba(0, 0, 0, 0.6)', 
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,  
    marginBottom: 10,  
    justifyContent: 'center',
    alignItems: 'center',
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',  
    textAlign: 'center',
    marginBottom: 5,
  },
  dayOfWeekContainer: {
    backgroundColor: '#ffffff',  
    borderRadius: 5,
    marginBottom: 10,
  },
  dayOfWeek: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',  
    textAlign: 'center',
  },
  weatherIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  info: {
    fontSize: 14,
    color: '#ffffff', 
    textAlign: 'center',
    
  },
  errorText: {
    fontSize: 18,
    color: '#ffffff',  
    textAlign: 'center',
  },
});

export default App;
