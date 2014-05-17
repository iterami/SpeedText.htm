function clicked(){
    document.getElementById('score').innerHTML = parseInt(document.getElementById('score').innerHTML) + 1;
    generate();
}

function clear_links(){
    // Remove all target links from text
    document.getElementById('text').innerHTML =
      document.getElementById('text').innerHTML.replace('<a onclick="clicked()">', '').replace('</a>', '');
}

function decisecond(){
    if(parseFloat(document.getElementById('time-remaining').innerHTML) <= 0){
        stop();

    }else{
        document.getElementById('time-remaining').innerHTML =
          (parseFloat(document.getElementById('time-remaining').innerHTML) - .1).toFixed(1);
    }
}

function generate(){
    clear_links();
    j = parseInt(document.getElementById('link-length').value);

    // Generate a range of link-length that doesn't overwrite any HTML
    do{
        i = Math.floor(Math.random() * (document.getElementById('text').innerHTML.length - j));
    }while(document.getElementById('text').innerHTML.substr(i, j).indexOf("<") !== -1
      || document.getElementById('text').innerHTML.substr(i, j).indexOf(">") != -1);

    // Replace the text with the new target link in it
    document.getElementById('text').innerHTML = document.getElementById('text').innerHTML.substr(0, i)
      + '<a onclick="clicked()">' + document.getElementById('text').innerHTML.substr(i, j) + '</a>'
      + document.getElementById('text').innerHTML.substr(i + j, document.getElementById('text').innerHTML.length - i);
}

function reset(){
    if(confirm('Reset settings?')){
        document.getElementById('audio-volume').value = 1;
        document.getElementById('link-length').value = 5;
        document.getElementById('start_button').value = 'Start [H]';
        document.getElementById('start-key').value = 'H';

        save();
    }
}

function save(){
    if(document.getElementById('audio-volume').value === 1
      || document.getElementById('audio-volume').value < 0){
        window.localStorage.removeItem('speedtext-0');
        document.getElementById('audio-volume').value = 1;

    }else{
        window.localStorage.setItem(
          'speedtext-0',
          parseFloat(document.getElementById('audio-volume').value)
        );
    }

    if(document.getElementById('link-length').value === 5
      || document.getElementById('link-length').value < 1){
        window.localStorage.removeItem('speedtext-1');
        document.getElementById('link-length').value = 5;

    }else{
        window.localStorage.setItem(
          'speedtext-1',
          parseFloat(document.getElementById('link-length').value)
        );
    }

    if(document.getElementById('start-key').value === 'H'){
        window.localStorage.removeItem('speedtext-2');

    }else{
        window.localStorage.setItem(
          'speedtext-2',
          document.getElementById('start-key').value
        );
    }
}

function settings(){
    if(document.getElementById('settings-button').value === '-'){
        document.getElementById('settings').style.display = 'none';
        document.getElementById('settings-button').value = '+';

    }else{
        document.getElementById('settings').style.display = 'inline-block';
        document.getElementById('settings-button').value = '-';
    }
}

function start(){
    document.getElementById('link-length').disabled = 1;
    document.getElementById('reset-button').disabled = 1;
    document.getElementById('start_button').onclick = function(){
        stop();
    };
    document.getElementById('start-key').disabled = 'H';

    save();

    document.getElementById('score').innerHTML = 0;
    document.getElementById('start_button').value = 'End [ESC]';
    document.getElementById('time-remaining').innerHTML = 30;
    generate();

    interval = setInterval(
      'decisecond()',
      100
    );
}

function stop(){
    clearInterval(interval);
    clear_links();
    document.getElementById('link-length').disabled = 0;
    document.getElementById('reset-button').disabled = 0;
    document.getElementById('start_button').onclick = function(){
        start();
    };
    document.getElementById('start_button').value =
      'Start [' + document.getElementById('start-key').value + ']';
    document.getElementById('start-key').disabled = 0;
}

var interval = 0;

document.getElementById('audio-volume').value = window.localStorage.getItem('speedtext-0') === null
  ? 1
  : parseFloat(window.localStorage.getItem('speedtext-0'));
document.getElementById('link-length').value  = window.localStorage.getItem('speedtext-1') === null
  ? 5
  : parseFloat(window.localStorage.getItem('speedtext-1'));
document.getElementById('start-key').value  = window.localStorage.getItem('speedtext-2') === null
  ? 'H'
  : window.localStorage.getItem('speedtext-2');

stop();

window.onkeydown = function(e){
    var key = window.event ? event : e;
    key = key.charCode ? key.charCode : key.keyCode;

    if(key === 27){// ESC
        stop();

    }else if(String.fromCharCode(key) === document.getElementById('start-key').value){// H
        stop();
        start();
    }
}
