const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const lineWidthInput = document.querySelector('#lineWidth');

document.addEventListener('DOMContentLoaded', renderCircles)

lineWidthInput.addEventListener('change', () => {
    renderCircles();
});

function renderCircles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(150, 150, 50, Math.PI, 0);
    ctx.lineWidth = lineWidthInput.value;
    ctx.strokeStyle = "#eecd40";
    ctx.stroke();


    ctx.beginPath();
    ctx.arc(260, 150, 50, Math.PI, 0);
    ctx.lineWidth = lineWidthInput.value;
    ctx.strokeStyle = "#198e4a";
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(100, 100, 50, 0, 2 * Math.PI);
    ctx.lineWidth = lineWidthInput.value;
    ctx.strokeStyle = "#163b62";
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(210, 100, 50, 0, 2 * Math.PI);
    ctx.lineWidth = lineWidthInput.value;
    ctx.strokeStyle = "#000000";
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(320, 100, 50, 0, 2 * Math.PI);
    ctx.lineWidth = lineWidthInput.value;
    ctx.strokeStyle = "#bf0628";
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(150, 150, 50, -0.1 * Math.PI, 2 * Math.PI);
    ctx.lineWidth = lineWidthInput.value;
    ctx.strokeStyle = "#ecc729";
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(260, 150, 50, -0.1 * Math.PI, 2 * Math.PI);
    ctx.lineWidth = lineWidthInput.value;
    ctx.strokeStyle = "#198e4a";
    ctx.stroke();

}
    


