'use strict';

function clicked(){
    if(core_menu_open){
        return;
    }

    audio_start('boop');

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
    }while(core_storage_data['text'].substring(range, range + core_storage_data['link-length']).indexOf('<') !== -1
      || core_storage_data['text'].substring(range, range + core_storage_data['link-length']).indexOf('>') !== -1);

    document.getElementById('text-div').innerHTML = core_storage_data['text'].substring(0, range)
      + '<a onclick="clicked()">' + core_storage_data['text'].substring(range, range + core_storage_data['link-length']) + '</a>'
      + core_storage_data['text'].substring(range + core_storage_data['link-length']);
}

function repo_escape(){
    if(!core_intervals['interval']
      && !core_menu_open){
        core_repo_reset();
    }
}

function repo_init(){
    core_repo_init({
      'events': {
        'start-button': {
          'onclick': core_repo_reset,
        },
      },
      'globals': {
        'time': 0,
      },
      'info': '<button id=start-button type=button>Restart</button>',
      'menu': true,
      'reset': function(){
          stop();
          if(core_menu_open){
              core_escape();
          }
          start();
      },
      'storage': {
        'link-length': 5,
        'text': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nibh ligula, dictum ut pulvinar sed, fringilla non lectus. Nunc fermentum aliquam condimentum. Aenean iaculis varius massa, vel rutrum nunc dictum eget. Sed sed ante at diam gravida luctus. Mauris tellus sapien, fringilla convallis mollis nec, tempor et velit. Morbi est odio, aliquet non interdum rutrum, facilisis egestas felis. Curabitur quis nisl et lacus congue ultricies. Sed enim justo, varius condimentum egestas quis, sodales condimentum orci. Praesent porttitor consectetur leo, ac consequat magna vulputate et. Donec non sem sem.<br><br>Integer quis enim at odio facilisis rhoncus. Nunc id ipsum eu massa eleifend placerat. Duis luctus lacus vel urna consequat scelerisque. Maecenas diam risus, interdum sed gravida in, posuere a ipsum. Nulla in nunc vitae velit tincidunt viverra vitae nec sem. Aliquam quis tellus magna. Donec nisl diam, ornare vehicula mattis nec, hendrerit sed ipsum.<br><br>Etiam iaculis vehicula lectus sed fringilla. In ut mauris augue, at facilisis tellus. Maecenas sed eros vitae turpis adipiscing dapibus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi vitae sodales odio. In sit amet magna sit amet erat sodales congue non sit amet justo. Suspendisse lobortis, neque in cursus tincidunt, neque magna sagittis massa, eu adipiscing magna elit et tellus. Nullam tincidunt leo in sem pretium mollis. Nam ac consequat risus.<br><br>Donec a porttitor orci. Fusce vestibulum massa velit, at ullamcorper tortor. Donec iaculis, quam non sodales pellentesque, enim mi venenatis ipsum, semper auctor nunc massa et ipsum. Praesent eget nisl lectus, non luctus felis. Aenean euismod lacinia mauris, at lacinia ante cursus id. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sodales, lorem ultricies molestie cursus, sapien erat congue quam, et vehicula eros massa ac libero. Nunc sit amet magna non turpis facilisis aliquet id sed risus. Mauris quis tellus nibh.<br><br>Nulla facilisi. Curabitur scelerisque, lectus ac sodales sollicitudin, justo massa convallis quam, eget tristique sapien eros eget urna. Fusce et neque lorem. Sed enim est, dapibus quis fermentum ac, mollis eget ligula. Aliquam erat volutpat. Aliquam odio erat, accumsan in sollicitudin ac, elementum nec augue. Sed vel tortor sit amet sapien elementum varius. Morbi sollicitudin mauris vitae augue suscipit hendrerit. Morbi nec elementum massa. Praesent condimentum dignissim nibh, eu scelerisque leo sollicitudin rutrum. Cras sit amet nibh eu leo scelerisque laoreet. Aliquam eu mauris at sapien placerat imperdiet vel eget turpis. Etiam posuere sem et justo ultrices suscipit. Vestibulum nibh dolor, lobortis sed eleifend sed, suscipit sit amet diam.',
        'time-max': 30,
      },
      'storage-menu': '<textarea id=text></textarea>'
        + '<table><tr><td><input class=mini id=link-length min=1 step=any type=number><td>Link Length'
        + '<tr><td><input class=mini id=time-max step=any type=number><td>Time</table>',
      'title': 'SpeedText.htm',
      'ui': 'Score: <span id=score></span><br>Time: <span id=time></span> / <span id=time-max-span>30</span><hr><div id=text-div></div>',
    });
    core_html_store([
      'time',
    ]);
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
