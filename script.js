// Mode buttons
let blackMode = true;
let grayMode = false;
let rainbowMode = false;
let paletteMode = false;

// Empty color palette
let palette = [];

// Acceptable canvas sizes (n*n):
const canvaSizes = [1, 2, 4, 8, 16, 32, 64];

// Target canvas
const canvas = document.querySelector('.canvas');

// Target buttons
const btnBlack = document.getElementById('btn-black');
const btnGray = document.getElementById('btn-gray');
const btnRainbow = document.getElementById('btn-rainbow');
const btnPalette = document.getElementById('btn-palette');
const btnClear = document.getElementById('btn-clear');

// Add listeners
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

btnClear.addEventListener('click', () => {
    pArray.forEach(element => {
        element.style.backgroundColor = 'rgb(217, 229, 235)';
    });
});

// On document load, fill canvas with standard amount of pixel divs (32x32)
function fillCanvas(n) {
    let pixels = []; 
    let pixCount = 0; // For pixel div IDs

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
            pixels.push(pix);
            canvas.appendChild(pix);
            pixCount++;
        }
    }

    return pixels;
};

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

let pArray = fillCanvas(16);