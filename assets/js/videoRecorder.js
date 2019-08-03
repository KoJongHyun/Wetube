const recordContainer = document.getElementById('jsRecordContainer');
const videoPreview = document.getElementById('jsVideoPreview');
const recordBtn = document.getElementById('jsRecordBtn');

let videoRecorder;
let streamObject;

const handleVideoData = (event) => {
  const { data: videoFile } = event;
  const link = document.createElement('a');
  link.href = URL.createObjectURL(videoFile);
  link.download = 'recorded.webm';
  document.body.appendChild(link);
  link.click();
}

const stopRecording = () => {
  videoRecorder.stop();
  recordBtn.removeEventListener('click', stopRecording);
  recordBtn.addEventListener('click', getVideo);
  recordBtn.innerHTML = 'Start Recording';
}

const startRecording = () => {
  videoRecorder = new MediaRecorder(streamObject);
  videoRecorder.start();
  videoRecorder.addEventListener('dataavailable', handleVideoData);
  recordBtn.addEventListener('click', stopRecording);
}

const getVideo = async() => {

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: 1280, height: 720 },
      audio: true
    });
    videoPreview.srcObject = stream;
    videoPreview.play();
    videoPreview.muted = true;
    recordBtn.innerHTML = 'Stop Recording';
    streamObject = stream;
    startRecording();
  } catch (error) {
    recordBtn.innerHTML = '😕 Can\'t Recording';
    console.log(error);
  } finally {
    recordBtn.removeEventListener('click', getVideo);
  }

}

function init() {
  recordBtn.addEventListener('click', getVideo);
}

if (recordContainer) {
  init();
}