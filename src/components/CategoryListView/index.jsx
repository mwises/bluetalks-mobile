import { SafeAreaView, View, FlatList } from "react-native";
import Category from "../Category";

export default function CategoryListView({ categories, navigation }) {
  return (
    <SafeAreaView>
      <FlatList
        scrollEnabled={true}
        data={categories}
        keyExtractor={(category) => category._id}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 400 }}
        renderItem={({ item }) => (
          <View style={{ marginHorizontal: 24, marginVertical: 12 }}>
            <Category
              categoryId={item._id}
              categorySrc={item.imagem}
              title={item.nome}
              navigation={navigation}
            ></Category>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
