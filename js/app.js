var app = {
    invader: document.getElementById("invader"),
    form: document.querySelector('.configuration'),
    boxNumber: 8,
    boxSize: 30,
    styles: [
        'plain',
        'empty',
        'light',
        'highlight',
    ],
    currentStyle: 'empty',

    submitHandler: function (event) {
        event.preventDefault();
        app.updateGrid();
        app.createTable();
    },

    clickHandler: function (event) {
        var box = event.target;
        app.changeColor(box);
    },

    clickColorHandler: function (event) {
        var palettes = document.getElementsByClassName('circle');
        for (var color of palettes) {
            color.classList.remove("active");
        }
        var color = event.target;
        console.log(event);
        color.classList.add("active");
        app.currentStyle = color.id; 
        console.log(app.currentStyle); 

    },

    submitForm: function () {
        app.form.addEventListener('submit', app.submitHandler)
    },

    clickBoxes: function () {
        var boxes = document.getElementsByClassName("box");
        for (var box of boxes) {
            box.addEventListener("click", app.clickHandler)
        };
    },

    clickPalette: function () {
        var palette = document.getElementsByClassName('circle');
        for (var color of palette) {
            color.addEventListener("click", app.clickColorHandler)
        };
    },

    createForm: function () {
        var input1 = document.createElement('input');
        var input2 = document.createElement('input');
        var button = document.createElement('button');
        app.form.appendChild(input1);
        app.form.appendChild(input2);
        app.form.appendChild(button);
        button.textContent = 'Valider';
        input1.placeholder = 'Taille de la grille';
        input1.type = 'number';
        input1.className = 'input border';
        input1.id = 'grille'
        input2.placeholder = 'Taille des pixels';
        input2.type = 'number';
        input2.className = 'input';
        input2.id = 'pixels'
        button.className = 'button';


    },

    createRow: function () {
        var row = document.createElement("div");
        row.classList.add("row");
        app.invader.appendChild(row);
    },

    createBox: function (i) {
        var box = document.createElement("div");
        var row = document.getElementsByClassName("row")[i]
        box.classList.add("box", "empty");
        box.style.width = app.boxSize + 'px';
        box.style.height = box.style.width;
        row.appendChild(box);
    },

    createTable: function () {

        app.invader.innerHTML = ''; //Reset the invader table
        
        //Double boucle pour créer la grille (first x Row then x box per row)
        for (var i = 0; i < app.boxNumber; i++) {
            app.createRow();
            for (var j = 0; j < app.boxNumber; j++) {
                app.createBox(i);
            }
        }
        app.clickBoxes(); //We add the listener to every box
    },

    //This method handle the color of the box regarding the color chosen by user with the palette. By default it's empty
    changeColor: function (box) {
        box.classList.remove("empty","plain","light","highlight"); //remove all possible style
        box.classList.add(app.currentStyle); //add current style
    },

    updateGrid: function(){
        var sizeTable = document.getElementById('grille');
        var sizeBox = document.getElementById('pixels');
        var sizeTableValue = sizeTable.valueAsNumber;
        var sizeBoxValue = sizeBox.valueAsNumber;

        console.log("SizeTable = " + sizeTable + " / SizeBox : " + sizeBox);

        //Update app prop only if exist 
        if(sizeTableValue){
            app.boxNumber = sizeTableValue;
        }
        
        if(sizeBoxValue){
            app.boxSize = sizeBoxValue;
        }
 
    },

    init: function () {
        app.createForm(); //We add with JS the form
        app.createTable(); //We init the first table with box of 30px and 8x8 grid
        app.submitForm(); //We add a listener to the form
        app.clickPalette(); //We add the listener to palette
    },

}

app.init();