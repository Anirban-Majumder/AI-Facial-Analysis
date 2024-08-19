const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const startBtn = document.getElementById('start-btn');
const landingPage = document.getElementById('landing-page');
const cameraPage = document.getElementById('camera-page');
const loadingStatus = document.getElementById('loading-status');

document.addEventListener('DOMContentLoaded', initializeApp);

async function initializeApp() {
    try {
        await loadModels();
        loadingStatus.textContent = 'Models loaded successfully!';
        startBtn.disabled = false;
    } catch (error) {
        console.error('Failed to load models:', error);
        loadingStatus.textContent = 'Failed to load models. Please refresh the page.';
    }
}

async function loadModels() {
    await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
    await faceapi.nets.faceExpressionNet.loadFromUri('/models');
    await faceapi.nets.ageGenderNet.loadFromUri('/models');
}

startBtn.addEventListener('click', startApp);

async function startApp() {
    landingPage.style.display = 'none';
    cameraPage.style.display = 'block';
    
    startVideo();
}

function startVideo() {
    navigator.mediaDevices.getUserMedia({ video: {} })
        .then(stream => {
            video.srcObject = stream;
        })
        .catch(err => {
            console.error(err);
            alert('Camera access denied. Please grant permission and refresh the page.');
        });
}

video.addEventListener('play', () => {
    const displaySize = { width: video.videoWidth, height: video.videoHeight };
    canvas.width = displaySize.width;
    canvas.height = displaySize.height;
    faceapi.matchDimensions(canvas, displaySize);
    
    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceExpressions()
            .withAgeAndGender();
        
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
        
        resizedDetections.forEach(detection => {
            const { age, gender, genderProbability } = detection;
            new faceapi.draw.DrawTextField(
                [
                    `Age: ${Math.round(age)} years`,
                    `Gender: ${gender} (${Math.round(genderProbability * 100)}%)`
                ],
                detection.detection.box.bottomRight
            ).draw(canvas);
        });
    }, 100);
});