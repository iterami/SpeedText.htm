'use strict';

function clicked(){
    document.getElementById('score').innerHTML = parseInt(
      document.getElementById('score').innerHTML,
      10
    ) + 1;
    generate();
}

function clear_links(){
    // Remove all target links from text.
    document.getElementById('text').innerHTML =
      document.getElementById('text').innerHTML.replace('<a onclick="clicked()">', '').replace('</a>', '');
}

function decisecond(){
    time = (time - .1).toFixed(1);

    document.getElementById('time').innerHTML = time;

    if(time <= 0){
        stop();
    }
}

function generate(){
    clear_links();
    var linklength = parseInt(
      document.getElementById('link-length').value,
      10
    );
    var range = 0;
    var text = document.getElementById('text').innerHTML;

    // Generate a range of link-length that doesn't overwrite any HTML.
    do{
        range = Math.floor(Math.random() * (text.length - linklength));
    }while(text.substr(range, linklength).indexOf('<') !== -1
      || text.substr(range, linklength).indexOf('>') != -1);

    // Replace the text with the new target link in it.
    document.getElementById('text').innerHTML = text.substr(0, range)
      + '<a onclick="clicked()">' + text.substr(range, linklength) + '</a>'
      + text.substr(range + linklength, text.length - range);
}

function reset(){
    if(!window.confirm('Reset settings?')){
        return;
    }

    var ids = {
      'audio-volume': 1,
      'link-length': 5,
      'start-button': 'Start [H]',
      'start-key': 'H',
    };
    for(var id in ids){
        document.getElementById(id).value = ids[id];
    }

    save();
}

// Save settings into window.localStorage if they differ from default.
function save(){
    var audio_volume = document.getElementById('audio-volume').value;
    if(audio_volume == 1
      || audio_volume.value < 0){
        window.localStorage.removeItem('SpeedText.htm-audio-volume');
        document.getElementById('audio-volume').value = 1;

    }else{
        window.localStorage.setItem(
          'SpeedText.htm-audio-volume',
          parseFloat(audio_volume)
        );
    }

    var link_length = document.getElementById('link-length').value;
    if(link_length == 5
      || link_length < 1){
        window.localStorage.removeItem('SpeedText.htm-link-length');
        document.getElementById('link-length').value = 5;

    }else{
        window.localStorage.setItem(
          'SpeedText.htm-link-length',
          parseFloat(link_length)
        );
    }

    var start_key = document.getElementById('start-key').value;
    if(start_key === 'H'){
        window.localStorage.removeItem('SpeedText.htm-start-key');

    }else{
        window.localStorage.setItem(
          'SpeedText.htm-start-key',
          start_key
        );
    }
}

function settings_toggle(state){
    state = state == void 0
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
    document.getElementById('start-button').onclick = stop;

    save();

    time = 30;

    document.getElementById('score').innerHTML = 0;
    document.getElementById('start-button').value = 'End [ESC]';
    document.getElementById('time').innerHTML = time;
    generate();

    interval = window.setInterval(
      decisecond,
      100
    );
}

function stop(){
    window.clearInterval(interval);
    clear_links();
    document.getElementById('start-button').onclick = start;
    document.getElementById('start-button').value =
      'Start [' + document.getElementById('start-key').value + ']';
}

var interval = 0;
var time = 0;

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
