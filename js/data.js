'use strict';

function clicked(){
    core_audio_start({
      'id': 'boop',
    });

    var element = document.getElementById('score');
    element.innerHTML = parseInt(
      element.innerHTML,
      10
    ) + 1;
    generate();
}

function clear_links(){
    // Remove all target links from text.
    document.getElementById('text-div').innerHTML = core_storage_data['text'];
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
    // Generate a range of link-length that doesn't overwrite any HTML.
    do{
        range = core_random_integer({
          'max': core_storage_data['text'].length - core_storage_data['link-length'],
        });
    }while(core_storage_data['text'].substr(range, core_storage_data['link-length']).indexOf('<') !== -1
      || core_storage_data['text'].substr(range, core_storage_data['link-length']).indexOf('>') != -1);

    // Replace the text with the new target link in it.
    document.getElementById('text-div').innerHTML = core_storage_data['text'].substr(0, range)
      + '<a onclick="clicked()">' + core_storage_data['text'].substr(range, core_storage_data['link-length']) + '</a>'
      + core_storage_data['text'].substr(range + core_storage_data['link-length'], core_storage_data['text'].length - range);
}

function start(){
    core_storage_save();

    time = core_storage_data['time-max'];

    document.getElementById('score').innerHTML = 0;
    core_html_modify({
      'id': 'start-button',
      'properties': {
        'onclick': stop,
        'value': 'End [ESC]',
      },
    });
    document.getElementById('time').innerHTML = time;
    document.getElementById('time-max-span').innerHTML = time;
    clear_links();
    generate();

    interval = window.setInterval(
      decisecond,
      100
    );
}

function stop(){
    window.clearInterval(interval);
    clear_links();

    core_html_modify({
      'id': 'start-button',
      'properties': {
        'onclick': start,
        'value': 'Start [H]',
      },
    });
}

var interval = 0;
var time = 0;
