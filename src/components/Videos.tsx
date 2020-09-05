const Video = ({ source }: { source: string }) =>
    <iframe
        src={source}
        width="640"
        height="360"
        frameBorder="0"
        allow="autoplay; fullscreen"
        allowFullScreen />

//TODO: swap all for individual Wistia videos

export const GetStartedVideo = () =>
    <Video source={"https://player.vimeo.com/video/455046714"} />

export const ShareVideo = () =>
    <Video source={"https://player.vimeo.com/video/455046714"} />

export const AdminVideo = () =>
    <Video source={"https://player.vimeo.com/video/455046714"} />
