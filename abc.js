let game = {
    score: 0,
    square: undefined,
    xVals: 'abcdefgh'.split(''),
    yVals: '12345678'.split(''),
    setSquare: function () {
        let res = this.xVals[Math.floor((Math.random() * this.xVals.length))] + this.yVals[Math.floor((Math.random() * this.yVals.length))];
        this.square = res;
        disp()
        return res;
    },
    display: 'w'
}

function loading() {
    game.setSquare();
}

function retSquare(coord) {
    const letters = 'abcdefgh'.split('')
    if (game.display === 'w') { return letters[coord.x - 1] + coord.y }
    else if (game.display === 'b') { return letters[8 - coord.x] + (9 - coord.y) }
}

function retCoord(square) {
    const letters = 'abcdefgh'.split('')
    if (game.display === 'w') { return { x: letters.indexOf(square.split('')[0]) + 1, y: Number(square.split('')[1]) } }
    else if (game.display === 'b') { return { x: 8 - letters.indexOf(square.split('')[0]), y: 9 - Number(square.split('')[1]) } }
}


function getSquare(evt) {
    let x = evt.pageX - $('#board').offset().left;
    let y = evt.pageY - $('#board').offset().top;
    let xDiv = $("#board").width();
    let yDiv = $("#board").height();

    if (x < 0 || y < 0 || x > xDiv || y > yDiv) { return false }
    let coord = { x: Math.trunc(8 * x / xDiv) + 1, y: 8 - Math.trunc(8 * y / yDiv) }
    return retSquare(coord)
}

function clicked(evt) {
    if (game.square === undefined) { return }
    let square = getSquare(evt);
    if (square === false) { return false }

    if (square === game.square) { right() }
    else { wrong(square) }

}

function right() {
    colorSquare(game.square, 'green');
    game.score++;
    game.setSquare();
}

function wrong(square) {
    colorSquare(square, 'red')
    document.getElementById('dispSquare').style.color = '#800';
    setTimeout(function () { document.getElementById('dispSquare').style.color = 'black' }, 600);
}

function disp() {
    let txt = ' point';
    if (game.score > 1) { txt = ' points' }
    document.getElementById('score').innerHTML = game.score + txt;
    document.getElementById('dispSquare').innerHTML = game.square;
}

function colorSquare(square, color) {
    let coord = retCoord(square)
    let parent = document.getElementById('coloredSquares');
    let el = document.createElement('DIV');
    el.className = 'square';
    el.id = 'lol'
    el.style.left = $('#board').offset().left + (coord.x - 1) * 75;
    el.style.top = $('#board').offset().top + (8 - coord.y) * 75;
    el.style.backgroundColor = color
    parent.appendChild(el)
    setTimeout(function () { el.style.opacity = '0.85' }, 1);
    setTimeout(function () { el.style.opacity = 0 }, 400);
    setTimeout(function () { parent.removeChild(el) }, 850);
}