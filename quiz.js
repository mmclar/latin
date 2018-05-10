var quiz = {
    words: [
        {
            'participles': 'mensa',
            'memTable': [
                ['mensa', 'mensae'],
                ['mensa', 'mensae'],
                ['mensam', 'mensas'],  
                ['mensae', 'mensarum'],
                ['mensae', 'mensis'],
                ['mensa', 'mensis']
            ]
        },
        {
            'participles': 'regina',
            'memTable': [
                ['regina', 'reginae'],
                ['regina', 'reginae'],
                ['reginam', 'reginas'],  
                ['reginae', 'reginarum'],
                ['reginae', 'reginis'],
                ['regina', 'reginis']
            ]
        }
    ],

    getNextWord: function() {
        index = Math.floor(Math.random() * quiz.words.length); 
        console.log('index is ' + index);
        return quiz.words[index];
    },

    setup: function(quizDiv) {
        quiz.quizDiv = quizDiv;
        quiz.getNextWord();
        quiz.getNextWord();
        quiz.getNextWord();
        quiz.getNextWord();
        quiz.getNextWord();
    },

    start: function() {
        quiz.quizDiv.empty().append('<table></table>');
        var colTitles = ['Singular', 'Plural'],
            rowTitles = ['Nom', 'Voc', 'Acc', 'Gen', 'Dat', 'Abl'],
            t = quiz.quizDiv.find('table'),
            tr;

        // Which word is this?
        quiz.currentWord = quiz.getNextWord();
        quiz.quizDiv.prepend('Word is ' + quiz.currentWord['participles']);


        // Add the title row
        tr = '<tr><td></td>';
        for (c in colTitles) {
            tr += '<td>' + colTitles[c] + '</td>';
        }
        tr += ('</tr>');
        t.append(tr);

        // Add the input rows
        for (r in rowTitles) {
            tr = '<tr><td>' + rowTitles[r] + '</td>';
            for (c in colTitles) {
                tr += '<td><input type="text" data-loc="' + r + '-' + c + '"/></td>';
            }
            tr += ('</tr>');
            t.append(tr);
        }

        // Set the focus
        $('input[data-loc=0-0]').focus();

        // Set up the enter events to check the answer and move
        $('input').on('keydown', function(e) {
            if (e.which === 13) {
                var guess = e.target.value,
                    parts = $(e.target).attr('data-loc').split('-'),
                    r = +parts[0],
                    c = +parts[1];
                if (quiz.checkAnswer(guess, r, c)) {
                    // If this is the last one, let the user know and 
                    // do a new word.
                    var isLastRow = (r == rowTitles.length - 1);
                    var isLastCol = (c == colTitles.length - 1);
                    if (isLastRow && isLastCol) {
                        alert('Correct!');
                        quiz.start();
                        return;
                    }

                    // If it's the last row move to the next column.
                    if (isLastRow) {
                        r = 0;
                        c++;
                    }
                    else {
                        r++;
                    }
                    $('input[data-loc=' + r + '-' + c + ']').focus();
                }
            }
        });
    },

    checkAnswer: function(guess, r, c) {
        var guess = $('input[data-loc=' + r + '-' + c + ']').val();
        console.log(quiz.currentWord);
        console.log('guess is ' + guess);
        console.log(quiz.currentWord.memTable[r][c]);
        console.log('correct itme is ' + quiz.currentWord.memTable[r][c]);
        var rightAnswer = quiz.currentWord.memTable[r][c];
        if (guess === quiz.currentWord.memTable[r][c]) {
            return true;
        }
        else {
            alert(guess + ' is wrong. Right answer is ' + rightAnswer);
            return false;
        }
    }
};

