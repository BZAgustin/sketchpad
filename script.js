// Mode buttons
let blackMode = true;
let grayMode = false;
let rainbowMode = false;
let paletteMode = false;

// Empty color palette for Palette Mode
let palette = [];

// Target buttons
const btnBlack = document.getElementById('btn-black');
const btnGray = document.getElementById('btn-gray');
const btnRainbow = document.getElementById('btn-rainbow');
const btnPalette = document.getElementById('btn-palette');
const btnClear = document.getElementById('btn-clear');
const slider = document.getElementById('size');
const sizeText = document.getElementById('sizeText');

// Target canvas
const canvas = document.querySelector('.canvas');

// Add button listeners
btnBlack.addEventListener('click', () => {
    blackMode = true;
    grayMode = false;
    rainbowMode = false;
    paletteMode = false;
});

btnGray.addEventListener('click', () => {
    blackMode = false;
    grayMode = true;
    rainbowMode = false;
    paletteMode = false;
}); 

btnRainbow.addEventListener('click', () => {
    blackMode = false;
    grayMode = false;
    rainbowMode = true;
    paletteMode = false;
});

btnPalette.addEventListener('click', () => {
    blackMode = false;
    grayMode = false;
    rainbowMode = false;
    paletteMode = true;
    generatePalette();
});

btnClear.addEventListener('click', updateCanvas);

// Update current size text every time the slider moves
slider.addEventListener('input', (e) => {
    let val = e.target.value;
    
    if(val == 1) {
        sizeText.textContent = `1x1`;
    } else if(val == 2) {
        sizeText.textContent = `2x2`;
    } else if(val == 3) {
        sizeText.textContent = `4x4`;
    } else if(val == 4) {
        sizeText.textContent = `8x8`;
    } else if(val == 5) {
        sizeText.textContent = `16x16`;
    } else if (val == 6) {
        sizeText.textContent = `32x32`;
    } else {
        sizeText.textContent = `64x64`;
    }
});

slider.addEventListener('change', updateCanvas);

// On document load, fill canvas with standard amount of pixel divs (32x32)
function fillCanvas(n) {
    let pixCount = 0; // For pixel div IDs
    clearCanvas(); // Remove all child nodes if there were any

    for(let i=0; i<n; i++) {
        for(let j=0; j<n; j++) {
            // Create div element, give it a unique ID, add the 'pixel' class to it,
            // set its size, an event listener and finally append it to the canvas
            let pix = document.createElement('div');
            pix.id = `pixel-${pixCount}`;
            pix.classList.add('pixel'); 
            pix.style.width = `${(512/n)}px`;
            pix.style.height = `${(512/n)}px`;
            pix.addEventListener('mouseenter', (e) => {
                drawPixel(e);
            });
            canvas.appendChild(pix);
            pixCount++;
        }
    }    
};

function clearCanvas() {
    while(canvas.firstChild) {
        canvas.removeChild(canvas.firstChild);
    }
};

function updateCanvas() {
    let val = slider.value;
    
    if(val == 1) {
        fillCanvas(1);
    } else if(val == 2) {
        fillCanvas(2);
    } else if(val == 3) {
        fillCanvas(4);
    } else if(val == 4) {
        fillCanvas(8);
    } else if(val == 5) {
        fillCanvas(16);
    } else if (val == 6) {
        fillCanvas(32);
    } else {
        fillCanvas(64);
    }
}

// Determines how the pixel will be drawn depending on which mode is active
function drawPixel(e) {
    let thisPixel = document.getElementById(e.target.id);
    
    if(blackMode) {
        thisPixel.style.backgroundColor = 'black';
    } else if(rainbowMode || grayMode) {
        thisPixel.style.backgroundColor = generateRandomColor();
    } else if(paletteMode) {
        thisPixel.style.backgroundColor = generateRandomColor();
    }
}

function generateRandomColor() {
    let r = Math.floor(Math.random()*255);
    let g = Math.floor(Math.random()*255);
    let b = Math.floor(Math.random()*255);
   
    if(grayMode) {
        return `rgb(${r}, ${r}, ${r})`;
    } else if(rainbowMode) {
        return `rgb(${r}, ${g}, ${b})`;
    } else if(paletteMode) {
        return palette[Math.floor(Math.random()*5)];
    }
}

// Generate 5 different RGB colors and save them
function generatePalette() {
    palette = [];
    
    for(let i=0; i<5; i++) {
        let r = Math.floor(Math.random()*255);
        let g = Math.floor(Math.random()*255);
        let b = Math.floor(Math.random()*255);

        palette.push(`rgb(${r}, ${g}, ${b})`);      
    }
}

// Fill canvas
fillCanvas(8);