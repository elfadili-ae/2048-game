
var board;
var score = 0;
var rows = 4;
var columns = 4;

window.onload = () => {
    setGame();
}

function setGame()
{
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ];

    for (let r = 0; r < rows; r++)
    {
        for (let c = 0; c < columns; c++)
        {
            var tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            
            let tileNum = board[r][c];
            updateTile(tile, tileNum);

            document.getElementById("board").append(tile);
        }
    }

    fillTile();
    fillTile();
}

function updateTile(tile, tileNum)
{
    tile.innerText = "";
    tile.classList.value = "";
    tile.classList.add("tile");

    if (tileNum > 0)
    { 
        if (tileNum <= 4096)
        {   
            tile.innerText = tileNum;
            tile.classList.add("x"+tileNum.toString());
        }
        else {
            tile.innerText = tileNum;
            tile.classList.add("x8192");
        }
    }
}

document.addEventListener("keyup", (e) => {
    if (e.code == "ArrowLeft")
    {
        slideLeft();
        fillTile();
    }
    else if (e.code == "ArrowRight")
    {
        slideRight();
        fillTile();
    }
    else if (e.code == "ArrowUp")
    {
        slideUp();
        fillTile();
    }
    else if (e.code == "ArrowDown")
    {
        slideDown();
        fillTile();
    }
    document.getElementById("score").innerText = score.toString();
})

function checkEmpty()
{
    for (let r = 0; r < rows; r++)
    {
        for (let c = 0; c < columns; c++)
        {
            if (board[r][c] == 0)
                return true;
        }
    }
    return false;
}

function fillTile()
{
    if (!checkEmpty())
        return;

    let found = false;
    while (!found)
    {
        let r = Math.floor(Math.random() * 4);
        let c = Math.floor(Math.random() * 4);
        if (board[r][c] == 0)
        {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            updateTile(tile, board[r][c]);
            
            found = true;
        }
    }
}

function filterZero(row)
{
    return row.filter(row => row != 0);
}

function slide(row)
{
    row = filterZero(row);

    for (let i = 0; i < row.length - 1; i++)
    {
        if (row[i] == row[i + 1])
        {
            row[i] *= 2;
            row[i + 1] = 0;
            score += row[i];
        }
    }

    row = filterZero(row);
    while (row.length < columns)
    {
        row.push(0);
    }
    return row;    
}

function slideLeft() 
{
    for (let r = 0; r < rows; r++)
    {
        let row = board[r];
        row = slide(row);
        board[r] = row;

        for (let c = 0; c < columns; c++)
        {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
    
            updateTile(tile, num);
        }
    }
}

function slideRight() 
{
    for (let r = 0; r < rows; r++)
    {
        let row = board[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r] = row;

        for (let c = 0; c < columns; c++)
        {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
    
            updateTile(tile, num);
        }
    }
}

function slideUp() 
{
    for (let c = 0; c < columns; c++)
    {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);

        for (let r = 0; r < rows; r++)
        {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
    
            updateTile(tile, num);
        }
    }
}

function slideDown() 
{
    for (let c = 0; c < columns; c++)
    {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        
        for (let r = 0; r < rows; r++)
        {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
    
            updateTile(tile, num);
        }
    }
}