var wrapper = document.getElementById("signature-pad"),
    clearButton = wrapper.querySelector("[data-action=clear]"),
    saveButton = wrapper.querySelector("[data-action=save]"),
    typingButton = wrapper.querySelector("[data-action=typing]"),
    writingButton = wrapper.querySelector("[data-action=writing]"),
    canvas = wrapper.querySelector("canvas"),
    signaturePad;

// Adjust canvas coordinate space taking into account pixel ratio,
// to make it look crisp on mobile devices.
// This also causes canvas to be cleared.
function resizeCanvas() {
    // When zoomed out to less than 100%, for some very strange reason,
    // some browsers report devicePixelRatio as less than 1
    // and only part of the canvas is cleared then.
    var ratio =  Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d").scale(ratio, ratio);
}

window.onresize = resizeCanvas;
resizeCanvas();

var options = {
    typeInput: document.getElementById('type-signature'),
    maxFontSize: 30,
    fontface: 'Helvetica'
};

signaturePad = new SignaturePad(canvas, options);

clearButton.addEventListener("click", function (event) {
    signaturePad.clear();
});

typingButton.addEventListener("click", function (event) {
    signaturePad.setMode('typing');
});

writingButton.addEventListener("click", function (event) {
    signaturePad.setMode('drawing');
});

saveButton.addEventListener("click", function (event) {
    if (signaturePad.isEmpty()) {
        alert("Please provide signature first.");
    } else {
        window.open(signaturePad.toDataURL());
    }
});
