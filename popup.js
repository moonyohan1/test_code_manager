// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

const $userList = document.querySelector('#userList');
let userList;
chrome.storage.local.get('ecountUserList', ({ecountUserList}) => {
  userList = ecountUserList;
  if(userList == undefined) {
    let $user = document.createElement('li');
    $user.innerHTML = `Please add user on the configuration`;
  } else {
    userList.forEach((user, i)=>{
      let $user = document.createElement('li');
      $user.dataset.key = user.comCode + user.id;
      $user.innerHTML = `CODE: ${user.comCode}, ID: ${user.id}, MEMO: ${user.memo}`; 
      
      $userList.appendChild($user);
    });
  }
});

$userList.onclick = function(element) {
  let userInfo = userList.find(user=>user.comCode + user.id == element.target.dataset.key);
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {userInfo: userInfo}, function(response) {
      console.log(response);
    });

  });
};