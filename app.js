
/**
 * constraints for the media stream
 */
const constraints = {
  audio: false,
  video: {
    width: 640,
    height: 480
  }
}

/**
 * Elements
 */
const feedViewer = document.getElementById('Feed');
const recordLink = document.getElementById('RecordImage')
const canvas = document.createElement('canvas');

canvas.width = 640;
canvas.height = 480;

const context = canvas.getContext('2d');

let streamObj;


/**
 * Captures and saves an image from the stream
 */
function recordVideo() {

  var recordedChunks = [];

  var options = {
    mimeType: 'video/webm;codecs=vp9'
  };
  navigator.mediaDevices.getUserMedia(constraints)
    .then(function(stream) {


      function handleDataAvailable(event) {
        if (event.data.size > 0) {
          recordedChunks.push(event.data);
          var superBuffer = new Blob(recordedChunks);
          feedViewer.src = window.URL.createObjectURL(superBuffer);
        } else {
          // ...
        }


      }

      streamObj = stream;
      mediaRecorder = new MediaRecorder(streamObj, options);
      mediaRecorder.ondataavailable = handleDataAvailable;
      mediaRecorder.start();
      setTimeout(() => {
        let track = streamObj.getTracks()[0]; // if only one media track
        // ...
        track.stop();
        mediaRecorder.stop();


      }, 2000)

    })
    .catch(function(err) {
      console.log('error:', err);
      let track = streamObj.getTracks()[0]; // if only one media track
      // ...
      track.stop();
    });


}

