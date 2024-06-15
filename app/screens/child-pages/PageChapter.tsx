import React from "react";
import { View, Text, Image, ImageBackground } from "react-native";
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
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text style={styles.title_white}>{chapter.title}</Text>
        <Image
          source={imageMap[chapter.image]}
          style={{ width: "100%", height: 200 }}
        />
        <View
          style={{
            borderColor: "red",
            borderWidth: 1,
            width: "100%",
            height: 200,
          }}
        >
          <YouTubePlayer
            height={200}
            width={"100%"}
            play={true}
            videoId={"aYkiZLdpZmE"}
          />
        </View>
        <Text>{chapter.content}</Text>
      </ImageBackground>
    </View>
  );
};

export default PageChapter;
