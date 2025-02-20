async function startVideo() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
    const video = document.getElementById('inputVideo');
    video.srcObject = stream;
    video.play();
}

startVideo(); 

const video = document.getElementById('inputVideo');
const canvas = document.getElementById('overlay');

video.addEventListener('play', async () => {
    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);

    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.SsdMobilenetv1Options())
            .withFaceLandmarks()
            .withFaceExpressions() // Incluir expresiones
            .withAgeAndGender(); // Incluir edad y género

        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections); // Dibujar expresiones

        // Mostrar género y expresiones en el canvas
        resizedDetections.forEach(detection => {
            const { gender, expressions } = detection;
            const context = canvas.getContext('2d');
            context.fillStyle = 'red';
            context.font = '18px Arial';
            context.fillText(`Género: ${gender}`, detection.detection.box.x, detection.detection.box.y - 10);

            for (const [expression, probability] of Object.entries(expressions)) {
                context.fillText(`${expression}: ${(probability * 100).toFixed(2)}%`, detection.detection.box.x, detection.detection.box.y - 30);
            }
        });
    }, 100);
});


Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models'), // Cargar modelo de expresiones
    faceapi.nets.ageGenderNet.loadFromUri('/models') // Cargar modelo de edad y género
]).then(() => {
    console.log('Modelos cargados');
}).catch(err => console.error('Error al cargar modelos:', err));