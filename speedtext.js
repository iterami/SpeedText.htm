function clicked(){
    get('score').innerHTML = parseInt(get('score').innerHTML)+1;
    generate()
}
function clear(){
    /*Remove all target links from text*/
    get('text').innerHTML = get('text').innerHTML.replace('<a onclick="clicked()">','').replace('</a>','')
}
function decisecond(){
    if(parseFloat(get('time-remaining').innerHTML)<=0){
        stop()
    }else{
        get('time-remaining').innerHTML = (parseFloat(get('time-remaining').innerHTML)-.1).toFixed(1)
    }
}
function generate(){
    clear();
    j = parseInt(get('link-length').value);

    /*Generate a range of link-length that doesn't overwrite any HTML*/
    do{
        i = Math.floor(Math.random()*(get('text').innerHTML.length-j))
    }while(get('text').innerHTML.substr(i,j).indexOf("<")!==-1 || get('text').innerHTML.substr(i,j).indexOf(">")!=-1);

    /*Replace the text with the new target link in it*/
    get('text').innerHTML = get('text').innerHTML.substr(0,i)+'<a onclick="clicked()">'+get('text').innerHTML.substr(i,j)+'</a>'+get('text').innerHTML.substr(i+j,get('text').innerHTML.length-i)
}
function get(i){
    return document.getElementById(i)
}
function reset(){
    if(confirm('Reset settings?')){
        get('link-length').value = 5;
        get('audio-volume').value = 1;
        save()
    }
}
function save(){
    i = 1;
    do{
        if(get(['audio-volume','link-length'][i]).value===[1,5][i] || get(['audio-volume','link-length'][i]).value<[0,1][i]){
            ls.removeItem('speedtext'+i);
            get(['audio-volume','link-length'][i]).value = [1,5][i]
        }else{
            ls.setItem('speedtext'+i,parseFloat(get(['audio-volume','link-length'][i]).value))
        }
    }while(i--)
}
function settings(){
	i = get('settings-button').value=='-' ? 1 : 0;
	get('settings').style.display = ['inline-block','none'][i];
	get('settings-button').value = ['-','+'][i]
}
function start(){
    get('link-length').disabled = 1;
    get('reset-button').disabled = 1;
    get('start_button').onclick = function(){stop()};

    save();

    get('score').innerHTML = 0;
    get('time-remaining').innerHTML = 30;
    get('start_button').value = 'End (ESC)';
    generate();

    h=setInterval('decisecond()',100)
}
function stop(){
    clearInterval(h);
    clear();
    get('start_button').value = 'Start (H)';
    get('start_button').onclick = function(){start()};
    get('link-length').disabled = 0;
    get('reset-button').disabled = 0
}

var h = 0;
var i = 1;
var ls = window.localStorage;

do{
    get(['audio-volume','link-length'][i]).value = ls.getItem('speedtext'+i)===null ? [1,5][i] : parseFloat(ls.getItem('speedtext'+i))
}while(i--);

window.onkeydown = function(e){
    i = window.event ? event : e;
    i = i.charCode ? i.charCode : i.keyCode;
    if(i===27){/*ESC*/
        stop()
    }else if(i===72){/*H*/
        stop();
        start()
    }
}
