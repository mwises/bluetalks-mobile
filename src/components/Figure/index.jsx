import {
  View,
  Image,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";
import { useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import Heading from "../Heading";
import { Audio } from "expo-av";
import React from "react";
import { API_URL } from "@env";
import { theme } from "../../styles/theme";
import api from "../../utils/api";

export default function Figure({
  id,
  imageSrc,
  audioSrc,
  title,
  favorite,
  navigation,
}) {
  imageSrc = API_URL + "file/" + imageSrc;
  const [sound, setSound] = React.useState();
  const [favorited, setFavorited] = React.useState(favorite);

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync({
      uri: API_URL + "file/" + audioSrc,
    });
    setSound(sound);

    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  async function handleFavoritePress(e) {
    e.stopPropagation();
    setFavorited(!favorited);
    await api.put(`/figura/${id}/favorite`);
  }

  function handleEditPress(e) {
    e.stopPropagation();
    navigation.navigate("EditFigure", {
      id,
      title,
      imageSrc,
      audioSrc,
      favorited,
    });
  }
  return (
    <TouchableNativeFeedback onPress={playSound}>
      <View
        style={{
          width: 125,
          height: 164,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <View
          style={{
            position: "relative",
            width: "100%",
            height: 140,
            borderRadius: 12,
            border: "1px solid #212121",
          }}
        >
          <Image
            style={{ borderRadius: 12, width: "100%", height: "100%" }}
            source={{ uri: imageSrc }}
          />
        </View>
        <View style={{ position: "absolute", top: 6, right: 6 }}>
          <TouchableOpacity onPress={handleFavoritePress}>
            {favorited ? (
              <FontAwesome name="star" size={24} color="#FFD700" />
            ) : (
              <FontAwesome name="star-o" size={24} color={theme.colors.white} />
            )}
          </TouchableOpacity>
        </View>
        <View style={{ position: "absolute", bottom: 32, right: 6 }}>
          <TouchableOpacity onPress={handleEditPress}>
            <FontAwesome name="edit" size={21} color={theme.colors.white} />
          </TouchableOpacity>
        </View>
        <View style={{ margin: "4px 0" }}>
          <Heading children={title} colorDark={true} size={16} />
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}
