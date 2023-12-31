import Heading from "../Heading";
import { Feather } from "@expo/vector-icons";
import { View } from "react-native";

export default function HeaderComponent({
  title,
  content,
  navigation,
  hasGoBack,
}) {
  return (
    <View
      style={{
        position: "fixed",
        width: "100%",
        height: 95,
        backgroundColor: "#0671E0",
      }}
    >
      <View
        style={{
          marginLeft: 25,
          marginRight: 40,
          paddingTop: 20,
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: content ? "space-between" : "flex-start",
        }}
      >
        {hasGoBack && (
          <Feather
            name="chevron-left"
            size={24}
            onPress={() => navigation.goBack()}
            style={{
              display: content ? "flex" : "none",
              color: "#fff",
            }}
          />
        )}
        <Heading children={title} colorDark={false} size={28} />
        <View
          style={{
            display: content ? "block" : "none",
            width: "24px",
          }}
        ></View>
      </View>
    </View>
  );
}
