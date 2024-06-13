import { View, Text } from "react-native";
import React from "react";
import YouTubePlayer from "react-native-youtube-iframe";

interface YoutubeProps {
  videoId: string;
}
export const Youtube: React.FC<YoutubeProps> = (props) => {
  return (
    <YouTubePlayer
      height={500}
      width={400}
      play={true}
      videoId={props.videoId}
    />
  );
};
