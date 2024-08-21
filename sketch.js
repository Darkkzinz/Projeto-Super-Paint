// Variáveis de controle

let drawing = false;

let brushSize = 10;

let brushColor = '#000000';

let backgroundColor = '#FFFFFF';

// Elementos de interface

let colorPicker;

let brushSizeSlider;

let clearButton;

let undoButton;

let saveButton;

let eraserButton;

let backgroundColorPicker;

// Armazenamento de desenhos

let drawings = [];

let currentDrawing = [];

function setup() {

  createCanvas(800, 600);

  setupUI();

}

function draw() {

  background(backgroundColor);

  drawDrawings();

}

// Configuração da interface do usuário

function setupUI() {

  // Cria seletor de cores para o pincel

  colorPicker = createColorPicker(brushColor);

  colorPicker.position(10, height + 10);

  colorPicker.input(() => {

    brushColor = colorPicker.value();

  });

  // Cria slider de tamanho do pincel

  brushSizeSlider = createSlider(1, 50, brushSize);

  brushSizeSlider.position(10, height + 40);

  brushSizeSlider.style('width', '80px');

  brushSizeSlider.input(() => {

    brushSize = brushSizeSlider.value();

  });

  // Botão para limpar canvas

  clearButton = createButton('Limpar');

  clearButton.position(100, height + 10);

  clearButton.mousePressed(clearCanvas);

  // Botão para desfazer ação

  undoButton = createButton('Desfazer');

  undoButton.position(180, height + 10);

  undoButton.mousePressed(undoDrawing);

  // Botão para salvar desenho

  saveButton = createButton('Salvar');

  saveButton.position(260, height + 10);

  saveButton.mousePressed(saveDrawing);

  // Botão para ativar borracha

  eraserButton = createButton('Borracha');

  eraserButton.position(340, height + 10);

  eraserButton.mousePressed(useEraser);

  // Cria seletor de cores para o fundo

  backgroundColorPicker = createColorPicker(backgroundColor);

  backgroundColorPicker.position(420, height + 10);

  backgroundColorPicker.input(() => {

    backgroundColor = backgroundColorPicker.value();

  });

  // Label para o slider de tamanho do pincel

  let brushSizeLabel = createP('Tamanho do Pincel');

  brushSizeLabel.position(10, height + 20);

  brushSizeLabel.style('margin', '0');

  brushSizeLabel.style('font-family', 'Arial');

  brushSizeLabel.style('font-size', '14px');

  brushSizeLabel.style('color', '#333');

  // Label para o seletor de cores do fundo

  let backgroundColorLabel = createP('Cor de Fundo');

  backgroundColorLabel.position(420, height + 20);

  backgroundColorLabel.style('margin', '0');

  backgroundColorLabel.style('font-family', 'Arial');

  backgroundColorLabel.style('font-size', '14px');

  backgroundColorLabel.style('color', '#333');

}

// Desenha os desenhos na tela

function drawDrawings() {

  drawings.forEach(drawingData => {

    stroke(drawingData.color);

    strokeWeight(drawingData.weight);

    noFill();

    beginShape();

    drawingData.path.forEach(point => {

      vertex(point.x, point.y);

    });

    endShape();

  });

  // Desenhar a forma atual em tempo real

  if (drawing && currentDrawing.length > 0) {

    stroke(brushColor);

    strokeWeight(brushSize);

    noFill();

    beginShape();

    currentDrawing.forEach(point => {

      vertex(point.x, point.y);

    });

    endShape();

  }

}

// Eventos de mouse

function mousePressed() {

  if (mouseY < height) {

    if (eraserButton.elt.innerText === 'Desativar Borracha') {

      drawing = true;

      currentDrawing = [];

      let newDrawing = {

        color: backgroundColor,

        weight: brushSize,

        path: currentDrawing

      };

      drawings.push(newDrawing);

    } else {

      drawing = true;

      currentDrawing = [];

      let newDrawing = {

        color: brushColor,

        weight: brushSize,

        path: currentDrawing

      };

      drawings.push(newDrawing);

    }

  }

}

function mouseReleased() {

  drawing = false;

}

// Limpar canvas

function clearCanvas() {

  background(backgroundColor);

  drawings = [];

}

// Desfazer desenho

function undoDrawing() {

  if (drawings.length > 0) {

    drawings.pop();

  }

}

// Salvar desenho

function saveDrawing() {

  saveCanvas('myDrawing', 'png');

}

// Ativar/desativar borracha

function useEraser() {

  if (eraserButton.elt.innerText === 'Borracha') {

    eraserButton.elt.innerText = 'Desativar Borracha';

    colorPicker.value(backgroundColor);

  } else {

    eraserButton.elt.innerText = 'Borracha';

    colorPicker.value(brushColor);

  }

}





