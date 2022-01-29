'use strict';

function clicked(){
    if(core_menu_open){
        return;
    }

    audio_start({
      'id': 'boop',
    });

    const element = document.getElementById('score');
    element.textContent = Number.parseInt(
      element.textContent,
      10
    ) + 1;
    generate();
}

function clear_links(){
    document.getElementById('text-div').innerHTML = core_storage_data['text'];
}

function decisecond(){
    time = core_round({
      'decimals': 1,
      'number': time - .1,
    });

    core_elements['time'].textContent = core_number_format({
      'decimals-min': 1,
      'number': time,
    });;

    if(time <= 0){
        stop();
    }
}

function generate(){
    clear_links();
    let range = 0;
    do{
        range = core_random_integer({
          'max': core_storage_data['text'].length - core_storage_data['link-length'],
        });
    }while(core_storage_data['text'].substr(range, core_storage_data['link-length']).indexOf('<') !== -1
      || core_storage_data['text'].substr(range, core_storage_data['link-length']).indexOf('>') !== -1);

    document.getElementById('text-div').innerHTML = core_storage_data['text'].substr(0, range)
      + '<a onclick="clicked()">' + core_storage_data['text'].substr(range, core_storage_data['link-length']) + '</a>'
      + core_storage_data['text'].substr(range + core_storage_data['link-length'], core_storage_data['text'].length - range);
}

function start(){
    time = core_storage_data['time-max'];

    document.getElementById('score').textContent = 0;
    core_elements['time'].textContent = time;
    document.getElementById('time-max-span').textContent = time;
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
