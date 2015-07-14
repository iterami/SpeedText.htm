'use strict';

function clicked(){
    document.getElementById('score').innerHTML = parseInt(document.getElementById('score').innerHTML) + 1;
    generate();
}

function clear_links(){
    // Remove all target links from text.
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

    // Generate a range of link-length that doesn't overwrite any HTML.
    do{
        i = Math.floor(Math.random() * (document.getElementById('text').innerHTML.length - j));
    }while(document.getElementById('text').innerHTML.substr(i, j).indexOf("<") !== -1
      || document.getElementById('text').innerHTML.substr(i, j).indexOf(">") != -1);

    // Replace the text with the new target link in it.
    document.getElementById('text').innerHTML = document.getElementById('text').innerHTML.substr(0, i)
      + '<a onclick="clicked()">' + document.getElementById('text').innerHTML.substr(i, j) + '</a>'
      + document.getElementById('text').innerHTML.substr(i + j, document.getElementById('text').innerHTML.length - i);
}

function reset(){
    if(!window.confirm('Reset settings?')){
        return;
    }

    document.getElementById('audio-volume').value = 1;
    document.getElementById('link-length').value = 5;
    document.getElementById('start-button').value = 'Start [H]';
    document.getElementById('start-key').value = 'H';

    save();
}

// Save settings into window.localStorage if they differ from default.
function save(){
    if(document.getElementById('audio-volume').value === 1
      || document.getElementById('audio-volume').value < 0){
        window.localStorage.removeItem('SpeedText.htm-audio-volume');
        document.getElementById('audio-volume').value = 1;

    }else{
        window.localStorage.setItem(
          'SpeedText.htm-audio-volume',
          parseFloat(document.getElementById('audio-volume').value)
        );
    }

    if(document.getElementById('link-length').value === 5
      || document.getElementById('link-length').value < 1){
        window.localStorage.removeItem('SpeedText.htm-link-length');
        document.getElementById('link-length').value = 5;

    }else{
        window.localStorage.setItem(
          'SpeedText.htm-link-length',
          parseFloat(document.getElementById('link-length').value)
        );
    }

    if(document.getElementById('start-key').value === 'H'){
        window.localStorage.removeItem('SpeedText.htm-start-key');

    }else{
        window.localStorage.setItem(
          'SpeedText.htm-start-key',
          document.getElementById('start-key').value
        );
    }
}

function settings_toggle(state){
    state = state == void(0)
      ? document.getElementById('settings-button').value === '+'
      : state;

    if(state){
        document.getElementById('settings').style.display = 'inline-block';
        document.getElementById('settings-button').value = '-';

    }else{
        document.getElementById('settings').style.display = 'none';
        document.getElementById('settings-button').value = '+';
    }
}

function start(){
    document.getElementById('link-length').disabled = true;
    document.getElementById('reset-button').disabled = true;
    document.getElementById('start-button').onclick = function(){
        stop();
    };
    document.getElementById('start-key').disabled = true;

    save();

    document.getElementById('score').innerHTML = 0;
    document.getElementById('start-button').value = 'End [ESC]';
    document.getElementById('time-remaining').innerHTML = 30;
    generate();

    interval = window.setInterval(
      'decisecond()',
      100
    );
}

function stop(){
    window.clearInterval(interval);
    clear_links();
    document.getElementById('link-length').disabled = false;
    document.getElementById('reset-button').disabled = false;
    document.getElementById('start-button').onclick = function(){
        start();
    };
    document.getElementById('start-button').value =
      'Start [' + document.getElementById('start-key').value + ']';
    document.getElementById('start-key').disabled = false;
}

var interval = 0;

window.onkeydown = function(e){
    var key = e.keyCode || e.which;

    // ESC: stop current game.
    if(key === 27){
        stop();

    }else if(String.fromCharCode(key) === document.getElementById('start-key').value){
        stop();
        start();

    // +: show settings.
    }else if(key === 187){
        settings_toggle(true);

    // -: hide settings.
    }else if(key === 189){
        settings_toggle(false);
    }
};

window.onload = function(e){
    document.getElementById('audio-volume').value =
      parseFloat(window.localStorage.getItem('SpeedText.htm-audio-volume')) || 1;
    document.getElementById('link-length').value =
      parseFloat(window.localStorage.getItem('SpeedText.htm-link-length')) || 5;
    document.getElementById('start-key').value =
      window.localStorage.getItem('SpeedText.htm-start-key') || 'H';

    stop();
};
