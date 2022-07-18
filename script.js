var arr = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);

	}
}


var board = [[], [], [], [], [], [], [], [], []]

function FillBoard(board) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] != 0) {
				arr[i][j].innerText = board[i][j]
			}

			else
				arr[i][j].innerText = ''
		}
	}
}

let GetPuzzle = document.getElementById('GetPuzzle')
let SolvePuzzle = document.getElementById('SolvePuzzle')

GetPuzzle.onclick = function () {
	var xhrRequest = new XMLHttpRequest()
	xhrRequest.onload = function () {
		var response = JSON.parse(xhrRequest.response)
		console.log(response)
		board = response.board
		FillBoard(board)
	}
	xhrRequest.open('get', 'https://sugoku.herokuapp.com/board?difficulty=easy')
	//we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
	xhrRequest.send()
}

SolvePuzzle.onclick = () => {
	SudokuSolver(board, 0, 0, 9);
};




function SudokuSolver(grid,row,col,N)
{
    // Check if we have reached the 8th 
    // row and 9th column (0
    // indexed matrix) , we are 
    // returning true to avoid
    // further backtracking
	if (row == N - 1 && col == N) {
		FillBoard(grid);
		return true;
	}
 
    // Check if column value  becomes 9 , 
    // we move to next row and
    //  column start from 0
    if (col == N) {
        row++;
        col = 0;
    }
   
    // Check if the current position of 
    // the grid already contains
    // value >0, we iterate for next column
    if (grid[row][col] > 0)
        return SudokuSolver(grid, row, col + 1,9);

    for (let num = 1; num <= N; num++) 
    {
         
        // Check if it is safe to place 
        // the num (1-9)  in the
        // given row ,col  ->we 
        // move to next column
        if (isSafe(grid,row,col,num)) 
        {
             
           /* Assigning the num in 
              the current (row,col)
              position of the grid
              and assuming our assigned 
              num in the position
              is correct     */
            grid[row][col] = num;
           
            //  Checking for next possibility with next
            //  column
            if (SudokuSolver(grid, row, col + 1,9))
                return true;
        }
       
        // Removing the assigned num , 
        // since our assumption
        // was wrong , and we go for 
        // next assumption with
        // diff num value
        grid[row][col] = 0;
    }
    return false;
}


function isSafe(grid,row,col,num)
{
     
    // Check if we find the same num 
    // in the similar row , we
    // return false
    for (let x = 0; x <= 8; x++)
        if (grid[row][x] == num)
            return false;
 
    // Check if we find the same num in
    // the similar column , we
    // return false
	
	let x;
    for (x = 0; x <= 8; x++)
        if (grid[x][col] == num)
            return false;
 
    // Check if we find the same num in 
    // the particular 3*3 matrix,
    // we return false
    let startRow = row - row % 3, 
            startCol = col - col % 3;
   
    for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
            if (grid[i + startRow][j + 
                            startCol] == num)
                return false;
 
    return true;
}
 