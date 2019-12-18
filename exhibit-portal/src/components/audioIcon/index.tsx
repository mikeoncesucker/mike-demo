import * as React from "react";
export interface AudioIconProps {
  image: any,
  video: any,
}
class AudioIcon extends React.Component<AudioIconProps, any> {
  public render() {
    const {image, video } = this.props;
    return (
      <span>
        {JSON.parse(image || '[]').length > 0 &&  <img src={require('../../assets/images/pic.png')} alt=""/>}
        {JSON.parse(video || '[]').length > 0 && <img src={require('../../assets/images/video.png')} alt="" />}
      </span>
    )
  }
}
export default AudioIcon