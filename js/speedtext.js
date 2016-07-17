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
    var range = 0;
    var text = document.getElementById('text').innerHTML;

    // Generate a range of link-length that doesn't overwrite any HTML.
    do{
        range = random_integer(text.length - settings_settings['link-length']);
    }while(text.substr(range, settings_settings['link-length']).indexOf('<') !== -1
      || text.substr(range, settings_settings['link-length']).indexOf('>') != -1);

    // Replace the text with the new target link in it.
    document.getElementById('text').innerHTML = text.substr(0, range)
      + '<a onclick="clicked()">' + text.substr(range, settings_settings['link-length']) + '</a>'
      + text.substr(range + settings_settings['link-length'], text.length - range);
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

    settings_save();

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
      'Start [' + settings_settings['start-key'] + ']';
}

var interval = 0;
var time = 0;

window.onkeydown = function(e){
    var key = e.keyCode || e.which;

    // ESC: stop current game.
    if(key === 27){
        stop();

    }else if(String.fromCharCode(key) === settings_settings['start-key']){
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
    settings_init(
      'SpeedText.htm-',
      {
        'audio-volume': 1,
        'link-length': 5,
        'start-key': 'H',
      }
    );

    document.getElementById('settings').innerHTML =
      '<input id=audio-volume max=1 min=0 step=0.01 type=range>Audio<br>'
        + '<input id=link-length maxlength=2>Link Length<br>'
        + '<input id=start-key maxlength=1>Start<br>'
        + '<input id=reset-button onclick=settings_reset() type=button value=Reset>';
    settings_update();

    stop();
    settings_toggle(false);
};
