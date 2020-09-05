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
    <Video source={"https://www.youtube.com/embed/SKm_5QNnjoU"} />

export const ShareVideo = () =>
    <Video source={"https://www.youtube.com/embed/yW_nHogMeU8"} />

export const AdminVideo = () =>
    <Video source={"https://www.youtube.com/embed/jKDMy0JXlfg"} />
