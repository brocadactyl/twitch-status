var streamerNameID = "";
var client_Id = "l6fsll8ne7ih98e9tvnu449z44tffo9";
var authHash = document.location.hash;
var authToken = authHash.slice(14,44);
var user_id = "";
var logged_in = false;

function getAPIStatus() {
   getOfflineInfo();
   document.getElementById("outtercontentblock").className = "";
   $.getJSON("https://api.twitch.tv/kraken/streams/" + streamerNameID + "?client_id=" + client_Id).done(function(data) {
    if (data.stream) {
      var datainfo = data.stream;
      var dataBlock = document.getElementById('datablock');
      var datainfostring = JSON.stringify(datainfo, '', 5);
    console.log(datainfostring);
       //dataBlock.innerHTML = datainfostring;
      streamerNameString = data.stream.channel.display_name;
      streamTitleString = data.stream.channel.status;
      imgString = data.stream.preview.medium;
      streamGameString = data.stream.channel.game;
      streamViewersString = data.stream.viewers;
      streamBanner = data.stream.channel.profile_banner;
      if (data.stream.channel.profile_banner_background_color) {
        profileColor = data.stream.channel.profile_banner_background_color;
      } else {
        profileColor = "#9A7FCC";
      }
      online();
    } else {
      offline();
    }
  });
}

window.onload = function() {
  document.getElementById("streamnamesearchtext").focus();
};
//window.onload = getAPIStatus();
//setInterval(getAPIStatus, 30000);

var streamInfo = document.getElementById('info');
var streamerName = document.getElementById('streamername');
var streamPrev = document.getElementById('preview');
var streamTitle = document.getElementById('streamtitle');
var streamGame = document.getElementById('gametitle');
var streamViewers = document.getElementById('viewers');
var liveLightStatus = document.getElementById('livelight');
var streamerBackground = document.getElementById('contentblockbg');
var contentBlock = document.getElementById('contentblock');
var ledColumn1 = document.getElementById('ledcolumn1');
var ledColumn2 = document.getElementById('ledcolumn2');
var ledColumn3 = document.getElementById('ledcolumn3');
var ledColumn4 = document.getElementById('ledcolumn4');
var favicon = document.getElementById('favicon');
var titleTag = document.getElementsByTagName("TITLE")[0];
var wasOffline = false;

function online() {
  if (soundCheck === true && soundStreamName === streamerNameID && wasOffline === true){
      soundAlertFile.play();
  }
  wasOffline = false;

  document.getElementById("streamlink").href = "http://twitch.com/" + streamerNameID;
  favicon.href = "/status/liveicon.ico";
  titleTag.text = "LIVE! " + streamerNameString;
  streamInfo.innerHTML = "LIVE";
  streamerName.innerHTML = streamerNameString;
  streamTitle.innerHTML = streamTitleString;
  streamPrev.src = imgString + new Date().getTime();
  streamGame.innerHTML = streamGameString;
  streamViewers.innerHTML = streamViewersString;
  liveLightStatus.className = "livelighton";
  streamerBackground.style.cssText += 'background-image:url(' + streamBanner + ');';
  streamerBackground.className = "contentblockbgon";
  contentBlock.className = "contentblockon";
  ledColumn1.innerHTML = '      <div id="led10" class="led led10"></div>      <div id="led9" class="led led9"></div>      <div id="led8" class="led led8"></div>      <div id="led7" class="led led7"></div>      <div id="led6" class="led led6"></div>';
  ledColumn2.innerHTML = '       <div id="led6" class="led led1"></div>      <div id="led7" class="led led2"></div>      <div id="led8" class="led led3"></div>      <div id="led9" class="led led4"></div>      <div id="led10" class="led led5"></div>      <div id="2led6" class="led led6"></div>      <div id="2led7" class="led led7"></div>      <div id="2led8" class="led led8"></div>      <div id="2led9" class="led led9"></div>      <div id="2led10" class="led led10"></div>';
  ledColumn3.innerHTML = '       <div class="led led1"></div>      <div class="led led2"></div>  <div class="led led3"></div>      <div class="led led4"></div>  <div class="led led5"></div>     <div class="led led6"></div>  <div class="led led7"></div>   <div class="led led8"></div>      <div class="led led9"></div>      <div class="led led10"></div>';
  ledColumn4.innerHTML = '       <div class="led led10"></div>   <div class="led led9"></div>      <div class="led led8"></div>     <div class="led led7"></div>      <div class="led led6"></div>';
}

function getOfflineInfo() {
  $.getJSON("https://api.twitch.tv/kraken/channels/" + streamerNameID + "?client_id=" + client_Id).done(function(datao) {
    streamerOffNameString = datao.display_name;
    var offlineinfostring = datao;
    var datainfostring = JSON.stringify(offlineinfostring, '', 5);
    var dataBlock = document.getElementById('datablock');
console.log(datainfostring);
    //dataBlock.innerHTML = datainfostring;
  });
}

function waitOfflineInfo(){
    streamerName.innerHTML = streamerOffNameString;
      titleTag.text = "OFFLINE - " + streamerOffNameString;
}

function offline() {
  wasOffline = true;
  favicon.href = "/favicon.ico";
  document.getElementById("streamlink").href = "http://twitch.com/" + streamerNameID;
  streamInfo.innerHTML = "OFFLINE";
  liveLightStatus.className = "livelightoff";
  streamViewers.innerHTML = 0;
  streamTitle.innerHTML = "";
  streamGame.innerHTML = "";
  streamPrev.src = "https://static-cdn.jtvnw.net/ttv-static/404_preview-320x180.jpg";

  streamerBackground.style.cssText += "background:url('http://web-cdn.ttvnw.net/images/xarth/pages/front/splash.png'); background-position: 150px;";
  streamerBackground.className = "contentblockbgoff";
  contentBlock.className = "contentblockoff";
  ledColumn1.innerHTML = '<div id="led10" class="led"></div><div id="led9" class="led"></div><div id="led8" class="led"></div>      <div id="led7" class="led"></div> <div id="led6" class="led"></div>';
  ledColumn2.innerHTML = '      <div id="led1" class="led"></div>      <div id="led2" class="led"></div>      <div id="led3" class="led"></div>      <div id="led4" class="led"></div>      <div id="led5" class="led"></div>      <div id="2led6" class="led"></div>      <div id="2led7" class="led"></div>      <div id="2led8" class="led"></div>      <div id="2led9" class="led"></div>      <div id="2led10" class="led"></div>';
  ledColumn3.innerHTML = '      <div class="led"></div>      <div class="led"></div>      <div class="led "></div>  <div class="led"></div>      <div class="led"></div>      <div class="led"></div>      <div class="led"></div>      <div class="led"></div>      <div class="led"></div>     <div class="led"></div>';
  ledColumn4.innerHTML = '       <div class="led"></div>      <div class="led"></div>      <div class="led"></div> <div class="led"></div>      <div class="led"></div>';
setTimeout(waitOfflineInfo, 50);
}

var searchButton = document.getElementById("streamsearchbutton");
var interAPIStatus;

function getStreamName(){
  var streamName = document.getElementById("streamnamesearchtext").value;
  var streamName_lowercase = streamName.toLowerCase();
  streamerNameID = streamName_lowercase;
  clearInterval(interAPIStatus);
  getAPIStatus();
  interAPIStatus = setInterval(getAPIStatus, 30000);
  document.getElementById("streamnamesearchtext").value = "";
  $('#chatcheckbutton').html("Connect");
  chatCheckBox.prop("checked", false);
}

  searchButton.onclick = function(){getStreamName()};

  document.getElementById("streamnamesearchtext").onkeydown = function(event){
  var x = event.which || event.keyCode;
  if (x == 13) {
    getStreamName();
  }
}

followChannelNames = [];
var activeChat;

function clickFollowStream(followChannelNames){
  var currentDiv = (event.target).closest('.followchannel').id;
  var divNum = currentDiv.slice(13, 14);

  var channelname = followChannelNames[divNum];
  var channelname_lowercase = channelname.toLowerCase();
  console.log(followChannelNames[divNum]);
  console.log(followChannelNames);
  console.log(currentDiv);
  console.log(divNum);
  streamerNameID = channelname_lowercase;
  clearInterval(interAPIStatus);
  getAPIStatus();
  interAPIStatus = setInterval(getAPIStatus, 30000);

  soundCheck = true;
  soundCheckFunctionButton();
if (activeChat !== streamerNameID) {
    $('#chatcheckbutton').html("Connect");
    chatCheck = false;
    //chatCheckBox.prop("checked", false);
  } else {
    $('#chatcheckbutton').html("Disconnect");
    chatCheck = true;
  }
}

// User Log In Functions
userLogin();
function userLogin() {
  $.getJSON("https://api.twitch.tv/kraken?client_id=" + client_Id + "&oauth_token=" + authToken).done(function(data) {
    // if (error) {
    //    // error encountered while loading
    //    console.log(error);
    //  }
       if (data.token.valid === true) {
     // Already logged in, hide button
     $('.twitch-connect').hide();
     $('#displaynameblock').removeClass('displaynone');
     $('#twitchlogoutblock').removeClass('displaynone');

       $.getJSON("https://api.twitch.tv/kraken?api_version=5&client_id=" + client_Id + "&oauth_token=" + authToken).done(function(list) {
       console.debug(list);
       var datainfostring = JSON.stringify(list, '', 5);
     console.log("datainfostring " + datainfostring);
     user_id = list.token.user_id;
  console.log("user id: " + user_id);


     $.getJSON("https://api.twitch.tv/kraken/user?api_version=5&client_id=" + client_Id + "&oauth_token=" + authToken).done(function(userlist) {
     console.log(userlist.logo);
     document.getElementById("displaynameimg").src = userlist.logo;
     var user_name = userlist.display_name;
     document.getElementById("displayname").innerHTML = user_name;
     });


     getFollowList();
     setInterval(getFollowList, 30000);
     var numLiveStreams = 0;
     var live_i = 0;

     function getFollowList(){
     $.getJSON("https://api.twitch.tv/kraken/users/" + user_id + "/follows/channels?api_version=5&sortby=last_broadcast&client_id=" + client_Id).done(function(streamslist) {
    //  Twitch.api({method: '/users/' + user_name + '/follows/channels', params: {sortby:'last_broadcast'}, verb: 'GET' }, function(error, streamslist) {
     console.log(streamslist);
     var total = streamslist.follows.length;
     console.log(total);

     var followDivs = document.getElementsByClassName("followchannel");
     var numFollowDivs = followDivs.length;
     console.log(numFollowDivs);
     if (numFollowDivs !== total || live_i !== numLiveStreams){
       if (live_i !== numLiveStreams){
         numLiveStreams = live_i;
       }
           $(".followchannel").remove();

           for (var j=0;j<total;j++){
             followChannelNames[j] = streamslist.follows[j].channel.display_name;

             var followChannel = document.createElement('div');
             followChannel.className = 'followchannel';
             followChannel.id = 'followchannel' + j;
             $('#followchannelblock').append(followChannel);
            $(followChannel).click(function(event){
              clickFollowStream(followChannelNames)
            });
           }

       var followChannelInner = document.createElement('div');
       followChannelInner.className = 'followchannelinner';
       $('.followchannel').append(followChannelInner);

       var followChannelImg = document.createElement('img');
       followChannelImg.className = 'followchannelimg';

       var followChannelInfo = document.createElement('div');
       followChannelInfo.className = 'followchannelinfo';

       var followChannel_isLive = document.createElement('div');
       followChannel_isLive.className = 'followchannel_islive';

       $('.followchannelinner').append(followChannelImg, followChannelInfo, followChannel_isLive);
     }

     live_i = 0;

     for (var i=0;i<total;i++){
     console.log(streamslist.follows[i].channel.display_name);
     var followChannelImg = document.getElementsByClassName("followchannelimg");
     followChannelImg[i].src = streamslist.follows[i].channel.logo;
     var followChannelInfo = document.getElementsByClassName("followchannelinfo");
     followChannelInfo[i].innerHTML = streamslist.follows[i].channel.display_name;


     //Delete? var followBar = document.getElementsByClassName("followchannel");


     //Set Follow status info on Side to Display Live or Offline
     getAPIStatusFollow(i);

     function onlineFollow(i) {
       var x = document.getElementsByClassName('followchannel_islive');
       x[i].innerHTML = "LIVE!";
       $( x[i] ).removeClass( "statusoffline" ).addClass( "statuslive" );
     }

     function offlineFollow(i) {
       var x = document.getElementsByClassName('followchannel_islive');
       x[i].innerHTML = "OFFLINE";
       $( x[i] ).removeClass( "statuslive" ).addClass( "statusoffline" );
     }

     function getAPIStatusFollow(i) {
        $.getJSON("https://api.twitch.tv/kraken/streams/" + followChannelNames[i] + "?client_id=" + client_Id).done(function(data) {
         if (data.stream) {
           // Implement Later
           // streamGameString = data.stream.channel.game;
           // streamViewersString = data.stream.viewers;
           live_i++;
           onlineFollow(i);
         } else {
           offlineFollow(i);
         }
       });
     }
     }
     });
     }
     if (live_i !== numLiveStreams){
       getFollowList();
     }
     });
     }


   console.log(data);
   console.log(data.token.valid);
   console.log(authHash);
   console.log(authToken);
 });
// Twitch.init({clientId: client_Id}, function(error, status) {
//   if (error) {
//     // error encountered while loading
//     console.log(error);
//   }
//   // the sdk is now loaded
//   if (status.authenticated) {
// // Already logged in, hide button
// $('.twitch-connect').hide();
// $('#displaynameblock').removeClass('displaynone');
// $('#twitchlogoutblock').removeClass('displaynone');
//
// Twitch.api({method: '/', verb: 'GET' }, function(error, list) {
//   console.debug(list);
//   var datainfostring = JSON.stringify(list, '', 5);
// console.log(datainfostring);
// var user_name = list.token.user_name;
// console.log(user_name);
// document.getElementById("displayname").innerHTML = user_name;
// Twitch.api({method: 'users/' + user_name, verb: 'GET'}, function(error, userlist) {
// console.log(userlist.logo);
// document.getElementById("displaynameimg").src = userlist.logo;
// });
//
// getFollowList();
// setInterval(getFollowList, 30000);
// var numLiveStreams = 0;
// var live_i = 0;
//
// function getFollowList(){
// Twitch.api({method: '/users/' + user_name + '/follows/channels', params: {sortby:'last_broadcast'}, verb: 'GET' }, function(error, streamslist) {
// console.log(streamslist);
// var total = streamslist.follows.length;
// console.log(total);
//
// var followDivs = document.getElementsByClassName("followchannel");
// var numFollowDivs = followDivs.length;
// console.log(numFollowDivs);
// if (numFollowDivs !== total || live_i !== numLiveStreams){
//   if (live_i !== numLiveStreams){
//     numLiveStreams = live_i;
//   }
//       $(".followchannel").remove();
//
//       for (var j=0;j<total;j++){
//         followChannelNames[j] = streamslist.follows[j].channel.display_name;
//
//         var followChannel = document.createElement('div');
//         followChannel.className = 'followchannel';
//         followChannel.id = 'followchannel' + j;
//         $('#followchannelblock').append(followChannel);
//        $(followChannel).click(function(event){
//          clickFollowStream(followChannelNames)
//        });
//       }
//
//   var followChannelInner = document.createElement('div');
//   followChannelInner.className = 'followchannelinner';
//   $('.followchannel').append(followChannelInner);
//
//   var followChannelImg = document.createElement('img');
//   followChannelImg.className = 'followchannelimg';
//
//   var followChannelInfo = document.createElement('div');
//   followChannelInfo.className = 'followchannelinfo';
//
//   var followChannel_isLive = document.createElement('div');
//   followChannel_isLive.className = 'followchannel_islive';
//
//   $('.followchannelinner').append(followChannelImg, followChannelInfo, followChannel_isLive);
// }
//
// live_i = 0;
//
// for (var i=0;i<total;i++){
// console.log(streamslist.follows[i].channel.display_name);
// var followChannelImg = document.getElementsByClassName("followchannelimg");
// followChannelImg[i].src = streamslist.follows[i].channel.logo;
// var followChannelInfo = document.getElementsByClassName("followchannelinfo");
// followChannelInfo[i].innerHTML = streamslist.follows[i].channel.display_name;
//
//
// //Delete? var followBar = document.getElementsByClassName("followchannel");
//
//
// //Set Follow status info on Side to Display Live or Offline
// getAPIStatusFollow(i);
//
// function onlineFollow(i) {
//   var x = document.getElementsByClassName('followchannel_islive');
//   x[i].innerHTML = "LIVE!";
//   $( x[i] ).removeClass( "statusoffline" ).addClass( "statuslive" );
// }
//
// function offlineFollow(i) {
//   var x = document.getElementsByClassName('followchannel_islive');
//   x[i].innerHTML = "OFFLINE";
//   $( x[i] ).removeClass( "statuslive" ).addClass( "statusoffline" );
// }
//
// function getAPIStatusFollow(i) {
//    $.getJSON("https://api.twitch.tv/kraken/streams/" + followChannelNames[i] + "?client_id=" + client_Id).done(function(data) {
//     if (data.stream) {
//       // Implement Later
//       // streamGameString = data.stream.channel.game;
//       // streamViewersString = data.stream.viewers;
//       live_i++;
//       onlineFollow(i);
//     } else {
//       offlineFollow(i);
//     }
//   });
// }
// }
// });
// }
// if (live_i !== numLiveStreams){
//   getFollowList();
// }
// });
// }
// });
}

$('.twitch-connect').click(function() {
  var authURL = "https://api.twitch.tv/kraken/oauth2/authorize?response_type=token&client_id=" + client_Id + "&redirect_uri=http://twitch.thesadmoon.com/status/&scope=user_read";

  // $.getJSON(authURL).done(function(data) {
  //   console.log(data);
  //   })
  // $.ajax({
  //  type: "GET",
  // url: authURL
  // });
  console.log("You clicked it.");
  // var rhead = new XMLHttpRequest();
  // rhead.open('get', authURL);
  // rhead.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
  // rhead.send();
  window.open(authURL, "_self");
})

$('.twitch-logout').click(function() {
Twitch.logout(function(error) {
    // the user is now logged out
});
})

$("#chatcheckbutton").click(chatCheckFunctionButton);
$("#hidechatsquare").click(chatSquareCheckFunction);
//$("#chatcheck").click(chatCheckFunction);
//    var chatCheckBox = $("#chatcheck");
var chatCheck = false;

function chatSquareCheckFunction(){
  if (activeChat !== streamerNameID){
    activeChat = "";
    hideChat();
  } else {
    chatCheckFunctionButton();
  }
}

function chatCheckFunctionButton() {
        if (chatCheck === false){
          $('#chatcheckbutton').html("Disconnect");
          connectChat();
        } else {
          $('#chatcheckbutton').html("Connect");
          hideChat();
        }
}

function connectChat(){
  activeChat = streamerNameID;
  chatCheck = true;
    document.getElementById("chat_embed").src = "https://www.twitch.tv/" + streamerNameID + "/chat";
    $("#chatblock").removeClass("displaynone");
    $("#hidechatsquare").removeClass("displaynone");
}

function hideChat(){
  chatCheck = false;
    document.getElementById("chat_embed").src = "";
    $("#chatblock").addClass("displaynone");
    $("#hidechatsquare").addClass("displaynone");
}

$("#hidechatsquare").hover(function(){
    $(this).css("width", "105px");
        $(this).css("transition", "width 2s");
    $(this).html("&#9658; Disconnect");
    }, function(){
    $(this).css("width", "15px");
    $(this).html("&#9658;");
});

$("#soundcheckbutton").click(soundCheckFunctionButton);
var soundCheck = false;
var soundAlertFile = new Audio('lectricsweep.mp3');
var soundStreamName;

function soundCheckFunctionButton() {

        if (soundCheck === false){
          $('#soundcheckbutton').html("On");
          soundOn();
        } else {
          $('#soundcheckbutton').html("Off");
          soundOff();
        }
}

function soundOn(){
  soundAlertFile.play();
  soundStreamName = streamerNameID;
  soundCheck = true;
}

function soundOff(){
  soundCheck = false;
}

// var wasOffline = false;
//
// if offline
// wasOffline = true;
//
// else
// if (soundCheck === true && soundStreamName === streamerNameID && wasOffline === true){
//     soundAlertFile.play();
//     wasOffline = false;
// }
//
// var rhead = new XMLHttpRequest();
// rhead.open('get', "https://api.twitch.tv/kraken?client_id=" + client_Id);
// rhead.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
// rhead.send();
