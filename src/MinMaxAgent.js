
export default class MinMaxAgent{
    constructor() {
    	this.turn = true;
    }

    getMove(player, board, move){
    	var agentBoard = this.parseBoard(board);
    	this.minMax(0,0,100,true,agentBoard);
    }

    minMax(alpha, beta, maxDepth, player, board){
    	try{
	    	var moves 	   = this.generateMove(board)
	    	var value  	   = 0;

	    	if(moves === []){
	    		throw 'generate none legal moves';
	    	}

	    	if(maxDepth === 0 || this.finished(board)){

	    	}

	    	if(this.turn){

	    	}
	    }
	    catch(err){
	    	console.log(err);
	    }
    }

    parseBoard(board){
    	var parseBoard = new Array(3);
    	for(var i =0;i<3;i++){
    		parseBoard[i] = new Array(3);
    		for(var j=0;j<3;j++){
    			parseBoard[i][j] = board.squares[i*3+j];
    		}
    	}
    	return parseBoard;
    }

    generateMove(board, player){
    	var allMoves = [];
    	for(var i =0;i<3;i++){
    		for(var j=0;j<3;j++){
    			if(board[i][j] !== 'X' && board[i][j] !== 'O'){
    				
    				//Very Important!! this is create a copy of 2D Array rather than using it reference
    				var move = board.map(function(arr) {
					    return arr.slice();
					});
					if(player)
						move[i][j] = 'O';
					else 
						move[i][j] = 'X';

					allMoves.push(move);
    				
    			}
    		}
    	}
    	return allMoves;
    }

    finished(board){
    	var total = 0;
    	var n     = 3;

    	//some more condition should be add here(winner)
		//https://stackoverflow.com/questions/1056316/algorithm-for-determining-tic-tac-toe-game-over
		//check col
        // for(var i = 0; i < n; i++){
        //     if(board[x][i] != s)
        //         break;
        //     if(i == n-1){
        //         //report win for s
        //         return true;
        //     }
        // }

        // //check row
        // for(var i = 0; i < n; i++){
        //     if(board[i][y] != s)
        //         break;
        //     if(i == n-1){
        //         //report win for s
        //         return true;
        //     }
        // }

        // //check diag
        // if(x == y){
        //     //we're on a diagonal
        //     for(var i = 0; i < n; i++){
        //         if(board[i][i] != s)
        //             break;
        //         if(i == n-1){
        //             //report win for s
        //             return true;
        //         }
        //     }
        // }

        // //check anti diag (thanks rampion)
        // if(x + y = n - 1){
        //     for(var i = 0;i<n;i++){
        //         if(board[i][(n-1)-i] != s)
        //             break;
        //         if(i == n-1){
        //             //report win for s
        //             return true;
        //         }
        //     }
        // }

        //draw condition
    	for(var i=0;i<3;i++){
    		for(var j=0;j<3;j++){
    			if(board[i][j] != null){
    				total++;   			
    			}		
    		}
    	}
    	if(total === 9){
    		return true;
    	}

    	return false;
    }

    evaluateBoard(board, player){
    	
    }

}

