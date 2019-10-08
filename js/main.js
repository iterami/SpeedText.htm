'use strict';

function repo_escape(){
    if(!core_intervals['player']
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
      'info': '<input id=start-button type=button value=Restart>',
      'menu': true,
      'reset': function(){
          stop();
          start();

          if(core_menu_open){
              core_escape();
          }
      },
      'storage': {
        'link-length': 5,
        'text': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nibh ligula, dictum ut pulvinar sed, fringilla non lectus. Nunc fermentum aliquam condimentum. Aenean iaculis varius massa, vel rutrum nunc dictum eget. Sed sed ante at diam gravida luctus. Mauris tellus sapien, fringilla convallis mollis nec, tempor et velit. Morbi est odio, aliquet non interdum rutrum, facilisis egestas felis. Curabitur quis nisl et lacus congue ultricies. Sed enim justo, varius condimentum egestas quis, sodales condimentum orci. Praesent porttitor consectetur leo, ac consequat magna vulputate et. Donec non sem sem.<br><br>Integer quis enim at odio facilisis rhoncus. Nunc id ipsum eu massa eleifend placerat. Duis luctus lacus vel urna consequat scelerisque. Maecenas diam risus, interdum sed gravida in, posuere a ipsum. Nulla in nunc vitae velit tincidunt viverra vitae nec sem. Aliquam quis tellus magna. Donec nisl diam, ornare vehicula mattis nec, hendrerit sed ipsum.<br><br>Etiam iaculis vehicula lectus sed fringilla. In ut mauris augue, at facilisis tellus. Maecenas sed eros vitae turpis adipiscing dapibus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi vitae sodales odio. In sit amet magna sit amet erat sodales congue non sit amet justo. Suspendisse lobortis, neque in cursus tincidunt, neque magna sagittis massa, eu adipiscing magna elit et tellus. Nullam tincidunt leo in sem pretium mollis. Nam ac consequat risus.<br><br>Donec a porttitor orci. Fusce vestibulum massa velit, at ullamcorper tortor. Donec iaculis, quam non sodales pellentesque, enim mi venenatis ipsum, semper auctor nunc massa et ipsum. Praesent eget nisl lectus, non luctus felis. Aenean euismod lacinia mauris, at lacinia ante cursus id. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sodales, lorem ultricies molestie cursus, sapien erat congue quam, et vehicula eros massa ac libero. Nunc sit amet magna non turpis facilisis aliquet id sed risus. Mauris quis tellus nibh.<br><br>Nulla facilisi. Curabitur scelerisque, lectus ac sodales sollicitudin, justo massa convallis quam, eget tristique sapien eros eget urna. Fusce et neque lorem. Sed enim est, dapibus quis fermentum ac, mollis eget ligula. Aliquam erat volutpat. Aliquam odio erat, accumsan in sollicitudin ac, elementum nec augue. Sed vel tortor sit amet sapien elementum varius. Morbi sollicitudin mauris vitae augue suscipit hendrerit. Morbi nec elementum massa. Praesent condimentum dignissim nibh, eu scelerisque leo sollicitudin rutrum. Cras sit amet nibh eu leo scelerisque laoreet. Aliquam eu mauris at sapien placerat imperdiet vel eget turpis. Etiam posuere sem et justo ultrices suscipit. Vestibulum nibh dolor, lobortis sed eleifend sed, suscipit sit amet diam.',
        'time-max': 30,
      },
      'storage-menu': '<textarea id=text></textarea>'
        + '<table><tr><td><input id=link-length maxlength=2><td>Link Length'
        + '<tr><td><input id=time-max><td>Time</table>',
      'title': 'SpeedText.htm',
    });
    audio_create({
      'audios': {
        'boop': {
          'duration': .1,
        },
      },
    });
}
