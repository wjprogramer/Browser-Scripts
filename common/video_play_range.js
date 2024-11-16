var segments = [
  // { start: '00:05', end: '00:10' },
  { start: '78.463981', end: '81.61456333333333' }, // 1:18.464 - 1:21.615 (1分18.464秒 - 1分21.615秒)
];
var parseTimeToSeconds = (time) => {
  if (typeof time === 'number') {
    return time / 1000; // 數字：毫秒轉秒
  }

  // 字符串：解析時間格式 "hh:mm:ss.mmm" 或 "hh:mm:ss" 或 "mm:ss.mmm" 或 "mm:ss"
  const timeParts = time.split(':').reverse(); // 反轉數組，便於處理
  const secondsAndMilliseconds = parseFloat(timeParts[0]) || 0; // 秒和毫秒部分
  const minutes = parseInt(timeParts[1] || '0', 10) || 0; // 分鐘部分
  const hours = parseInt(timeParts[2] || '0', 10) || 0; // 小時部分

  // 總秒數 = 小時 * 3600 + 分鐘 * 60 + 秒
  return hours * 3600 + minutes * 60 + secondsAndMilliseconds;
};

var currentSegment = 0;

// 將 segments 內的 start 和 end 轉換為秒數
var parsedSegments = segments.map((segment) => ({
  start: parseTimeToSeconds(segment.start),
  end: parseTimeToSeconds(segment.end),
}));

var video = document.querySelector('video');
video.addEventListener('timeupdate', () => {
  const segment = parsedSegments[currentSegment];
  if (video.currentTime <= parsedSegments[0].start) {
    video.currentTime = parsedSegments[0].start;
    video.play();
    return;
  }

  if (video.currentTime >= segment.end) {
    currentSegment = (currentSegment + 1) % parsedSegments.length; // 切換到下一段
    video.currentTime = parsedSegments[currentSegment].start;
    video.play();
  }
});
