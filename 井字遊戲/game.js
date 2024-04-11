$(function() { // $ 錢字號(dollor sign)代表 jQuery
    "use strict";
    var cells = $('.cell');
    var symbols = ['&times;', '&#9675;']; //在HTML裡 &times: X；&#9675: O
    var currentStep = 0,
        currentState = {};
    var gameOver = true;
    var winningCombos = {
        combo0: [0, 1, 2], /* 第一列連線*/
        combo1: [3, 4, 5],
        combo2: [6, 7, 8],
        combo3: [0, 3, 6], // 第一行連線
        combo4: [1, 4, 7],
        combo5: [2, 5, 8],
        combo6: [0, 4, 8], // 斜線連線
        combo7: [2, 4, 6]
    };
    // 檢查有 0 的 winningCombos，例如combo0: [0, 1, 2]
    var potentialCombos = {
        0: ['combo0', 'combo3', 'combo6'], 
        1: ['combo0', 'combo4'],
        2: ['combo0', 'combo5', 'combo7'],
        3: ['combo1', 'combo3'],
        4: ['combo1', 'combo4', 'combo6', 'combo7'],
        5: ['combo1', 'combo5'],
        6: ['combo2', 'combo3', 'combo7'],
        7: ['combo2', 'combo4'],
        8: ['combo2', 'combo5', 'combo6'],
    };

    // 用箭頭，標示現在是 O 還是 X
    var showArrow = function(p) {
        if (p % 2 === 0) {
            $('.player1 > .arrow').removeClass('inv');  // 除 2 餘 !0 是奇數，remove player1 (隱藏)
            $('.player2 > .arrow').addClass('inv');     // 除 2 餘 0 是偶數，add player2 (顯示)
        } else {
            $('.player1 > .arrow').addClass('inv');
            $('.player2 > .arrow').removeClass('inv');            
        }
    };

    // 如果結束，初始化，將0~9的格子清空
    var initGame = function() {
        if (gameOver) {
            cells.empty();
            for (var i = 0; i < 9; i ++) {
                currentState[i] = null;
            }
            currentStep = 0;
            showArrow(currentStep);
            gameOver = false;
            cells.removeClass('win');
            $('.ss').text('');
        }
    };

    initGame();
    var winResizeHandler = function() {
        var c = cells;
        var w = c.width();
        // 設定 OOXX 的大小
        c
        .css({
            'line-height': w * 0.92 + 'px',
            'font-size': w + 'px'
        })
        .height(w);
    };
    $(window)
        .resize(winResizeHandler)
        .keydown(function(e) {
            e.preventDefault();
            initGame();
        });
        
    winResizeHandler();
    // 檢查連線
    var checkCombo = function(a) {
        var a0 = currentState[a[0]],
            a1 = currentState[a[1]],
            a2 = currentState[a[2]];
        var w = (a0 === a1 && a1 === a2);
        if (w) {
            $('.cell[data-i="' + a[0] + '"]').addClass('win');
            $('.cell[data-i="' + a[1] + '"]').addClass('win');
            $('.cell[data-i="' + a[2] + '"]').addClass('win');
        }
        return w;
    };

    cells.click(function(e) {
        if (!gameOver) {
            var $this = $(this);
            var i = $this.data('i');
            if (currentState[i] === null) {
                var s = symbols[currentStep++ % 2];
                currentState[i] = s;
                $this.html(s);
                for (var j = 0, len = potentialCombos[i].length; j < len; j++) {
                    if (checkCombo(winningCombos[potentialCombos[i][j]])) {
                        console.log(s + 'won');
                        gameOver = true;
                        $('.ss').text('按任意鍵盤開始新遊戲。~');
                        return;
                    }
                }
                if (currentStep === 9) {
                    gameOver = true;
                    $('.ss').text('平手! 按任意鍵盤重新開始~');
                    return;
                }
                showArrow(currentStep);
            }
        }
    });
});
