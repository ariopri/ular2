//
const canvas = document.createElement('canvas')
const canvasSize = { width: 600, height:600 } 
const ctx = canvas.getContext('2d')
const grid = { row: 30, col: 30 }
const snake = {
    direction: 'right',
    body: [],
    apel1:[],
}
const fps = 5
const snakeWallCollistion = false
var animationLoop = null
var score = 0
//

document.addEventListener('DOMContentLoaded', main)
document.addEventListener('keydown', handleKey) 
function main() {
    createCanvas()
    reset()
    animationLoop = setInterval(gameLoop, 1000 / fps )
}

function createCanvas() {
    canvas.width = canvasSize.width
    canvas.height = canvasSize.height
    canvas.style.border = "1px solid black"
    document.body.appendChild(canvas)
}

function gameLoop() {
    update()
    draw()

}
function reset() {
    snake.body = [
        { x: 5, y : 2 },
        { x: 4, y : 2 },
        { x: 3, y : 2 },
    ]
    snake.direction = 'right'
    score = 0
}

//
function handleKey(e) {
    if (e.key == "ArrowUp" && snake.direction != "down") snake.direction = "up"
    if (e.key == "ArrowDown" && snake.direction != "up") snake.direction = "down"
    if (e.key == "ArrowLeft" && snake.direction != "right") snake.direction = "left"
    if (e.key == "ArrowRight" && snake.direction != "left") snake.direction = "right"
}

//
function update() {
    // deteksi apel1
    if (snake.apel1.length == 0) {
        const randPos = {
            x: Math.floor(Math.random() * grid.col),
            y: Math.floor(Math.random() * grid.row),
        }
        snake.apel1.push(randPos)
        console.log(randPos)
    }
    // snake move
    const head = snake.body[0]
    const oldhead = Object.assign({}, snake.body[0])
    var newHead = Object.assign({}, head)
    if (snake.direction == 'right') {
        newHead.x = newHead.x + 1
    } 
    else if (snake.direction == "left"){
        newHead.x = newHead.x - 1
    }
    else if (snake.direction == "up"){
        newHead.y = newHead.y - 1
    }
    else if (snake.direction == "down"){
        newHead.y = newHead.y + 1
    }
    //
    

 
    if (snakeWallCollistion) {
        if (
            (newHead.x < 0) || (newHead.y < 0)
            || (newHead.x > grid.col) || (newHead.y > grid.row)
        ) {
            reset()
        }
    } else {
        if (newHead.x < 0) {
            newHead.x = grid.col-1
        }
        else if (newHead.y < 0) {
            newHead.y = grid.row -1
        }
        else if (newHead.x > (grid.col-1)) {
            newHead.x = 0
        }
        else if (newHead.y > (grid.row-1)) {
            newHead.y = 0
        }
    } 
    
    // snake collision with body
    for (var i = 0; i < snake.body.length; i++) {
        const body = snake.body[i]
        if (body.x == newHead.x && body.y == newHead.y) {
            reset()
            alert ("bundir")
        }
    }
    // check collision with food
    var ularmakan = true   
    for (var i = 0; i < snake.apel1.length; i++) {
        const apel1 = snake.apel1[i]
        if (apel1.x == newHead.x && apel1.y == newHead.y) {
            snake.apel1.splice(i,1)
            score++;
            ularmakan = false
            console.log('Score : ${score}' )
        }
    }

    //
    snake.body.unshift(newHead)
    if (ularmakan) {
        snake.body.pop()
    }
}

function draw() {
    drawBoard()
    drawSnake()
    drawapel1()

}
//
function drawBoard() {
    for (var i = 0; i < grid.col; i++) {
        for (var j = 0; j < grid.row; j++) {
            var w = canvasSize.width / grid.col
            var h = canvasSize.height / grid.row
            var x = i * w
            var y = j * h
            drawRect(x, y, w, h, "white", "black")
        }  
    }
}

function drawSnake() {
    for (var i = 0; i < snake.body.length; i++){
        const body = snake.body[i]
        var w = canvasSize.width / grid.col
        var h = canvasSize.height / grid.row
        var x = body.x * w
        var y = body.y * h
        var color = (i == 0) ? "blue" : "red"
        drawRect(x, y, w, h, color, "black")
          
    }
}

function drawapel1() {
    for (var i = 0; i < snake.apel1.length; i++){
        const apel1 = snake.apel1[i]
        var w = canvasSize.width / grid.col
        var h = canvasSize.height / grid.row
        var x = apel1.x * w
        var y = apel1.y * h
      
        drawRect(x, y, w, h, "red", "black")
          
    }
}

function drawRect(x, y, w, h, fillStyle = "white", strokeStyle = "black") {
    ctx.beginPath()
    ctx.fillStyle = fillStyle
    ctx.strokeStyle = strokeStyle
    ctx.rect(x, y, w, h)
    if (fillStyle != null) ctx.fill()
    if (strokeStyle != null) ctx.stroke()
}