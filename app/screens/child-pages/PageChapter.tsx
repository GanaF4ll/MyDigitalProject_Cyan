import React from "react";
import { View, Text, Image } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import styles from "../../constants/styles";
import ChapterProps from "../../components/Chapter";
import { imageMap } from "../../constants/imageMap";

type StackParamList = {
  PageChapter: {
    chapter: ChapterProps;
  };
};

type PageChapterRouteProp = RouteProp<StackParamList, "PageChapter">;

const PageChapter: React.FC = () => {
  const route = useRoute<PageChapterRouteProp>();
  const { chapter } = route.params;

  return (
    <View style={styles.container}>
      <Image
        source={imageMap[chapter.image]}
        style={{ width: "100%", height: 200 }}
      />
      <Text>{chapter.title}</Text>
      <Text>{chapter.content}</Text>
    </View>
  );
};

export default PageChapter;
