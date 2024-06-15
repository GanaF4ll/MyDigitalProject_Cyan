import React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  ScrollView,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import YouTubePlayer from "react-native-youtube-iframe";

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
  console.log(chapter);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/images/background.png")}
        style={PGstyles.container}
      >
        <View style={PGstyles.header}>
          <Image
            source={imageMap[chapter.image]}
            style={{ width: "20%", height: "100%", borderRadius: 10 }}
          />
          <Text style={[styles.title_white, { marginLeft: 10 }]}>
            {chapter.title}
          </Text>
        </View>

        <YouTubePlayer
          height={200}
          width={"100%"}
          play={true}
          videoId={chapter.video}
        />
        <Text>{chapter.content}</Text>
      </ImageBackground>
    </View>
  );
};

export default PageChapter;

const PGstyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "5%",
    paddingTop: "15%",
    flexDirection: "column",
  },
  header: {
    height: "10%",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
});
