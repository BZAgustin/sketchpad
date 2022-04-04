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

// On document load, fill canvas with standard amount of pixel divs
function fillCanvas(n) {
    let pixCount = 0;
    let pixArray = [];

    for(let i=0; i<n; i++) {
        for(let j=0; j<n; j++) {
            let pix = document.createElement('div');
            pix.id = `pixel-${pixCount}`;
            pix.classList.add('pixel'); 
            pix.style.width = `${(512/n)}px`;
            pix.style.height = `${(512/n)}px`;
            pix.addEventListener('mouseenter', (e) => {
                let thisPixel = document.getElementById(e.target.id);
                thisPixel.style.backgroundColor = 'black';
            });
            pixArray.push(pix);
            canvas.appendChild(pix);
            pixCount++;
        }
    }

    return pixArray;
};

btnClear.addEventListener('click', () => {
    pArray.forEach(element => {
        element.style.backgroundColor = 'rgb(217, 229, 235)';
    });
});

function drawPixel(e) {

};

let pArray = fillCanvas(8);