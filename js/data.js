'use strict';

function clicked(){
    if(core_menu_open){
        return;
    }

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
    time = core_storage_data['time-max'];

    document.getElementById('score').innerHTML = 0;
    document.getElementById('time').innerHTML = time;
    document.getElementById('time-max-span').innerHTML = time;
    clear_links();
    generate();

    core_interval_modify({
      'id': 'interval',
      'interval': 100,
      'todo': decisecond,
    });
}

function stop(){
    core_interval_pause_all();
    clear_links();
}
