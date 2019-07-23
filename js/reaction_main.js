const maxHits = 10;
let hits = 0;
let currentNumber = 1;
let timeStart = 0;
let miss = 0;

//=========FUNCTIONS FROM UTILS=========

function getTimestamp() {
  let d = new Date();
  return d.getTime();
};

function randomDivId() {
  let d = Math.floor(Math.random() * 6) + 1;
  let n = Math.floor(Math.random() * 6) + 1;
  return `#slot-${d}${n}`;
};

//=======================================

$('button').click(function(){
    $('.main-grid').removeClass('hide');
    $('.results').addClass('hide');
    
    hits = 0;
    currentNumber = 1;
    timeStart = getTimestamp();
    miss = 0;
    
    game();
    $('.game-field').off('click').click(fieldClick);
    
});

function game() {
    $('.target').text('');
    $('.target').removeClass('target');
    
    let selector = randomDivId();

    console.log('selector = ' + selector);
        
    $(selector).addClass('target');
    $(selector).text(`${currentNumber}`)
}

function fieldClick(event) {
    if ($(event.target).hasClass('target')) {        
        hits++;
        
        if (hits == maxHits){endgame()};
        
        currentNumber++;
        
        console.log('Hits = ' + hits);
        console.log('NUMBER = ' + currentNumber);
        
        game()
    } else {
        $(event.target).addClass('miss');
        setTimeout(function(){
            $(event.target).removeClass('miss')
        }, 1000);
        
        miss++;
        
        console.log('Hits = ' + hits);
        console.log('NUMBER = ' + currentNumber);
        console.log('missies = ' + miss);
        
        game()
    }
};

function endgame() {
    const endTime = getTimestamp() - timeStart;
    $('.main-grid').addClass('hide');
    $('.results').removeClass('hide');
    $('#score').text(`${((1 / endTime * 10000000) - (miss * 100)).toFixed(0)}`);
    $('#time').text(`${(endTime / 1000).toFixed(2)} seconds`);
    $('#mistakes').text(`${miss}`)
}