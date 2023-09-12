function parseVideoUrl(videoUrl) {
  let parsedVideoUrl = videoUrl;

  if (/youtube.com/.test(parseVideoUrl)) {
    parsedVideoUrl = parsedVideoUrl.replace('watch?v=', 'embed/');
    parsedVideoUrl = parsedVideoUrl.replace(
      'youtube.com',
      'youtube-nocookie.com'
    );
  }
  return parsedVideoUrl;
}

module.exports = { parseVideoUrl };
