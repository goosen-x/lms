interface VideoPlayerProps {
  videoId: string;
}

export function VideoPlayer({ videoId }: VideoPlayerProps) {
  return (
    <div
      style={{
        position: "relative",
        paddingTop: "56.25%",
        width: "100%",
      }}
    >
      <iframe
        src={`https://kinescope.io/embed/${videoId}`}
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write; screen-wake-lock;"
        frameBorder="0"
        allowFullScreen
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
        }}
      />
    </div>
  );
}
