// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';


const init = () => {
  // Activate tooltip
  $('[data-toggle="tooltip"]').tooltip();
}

const render = ()=>{
  renderTable();
}
const renderTable = () => {
  const $tableBody = document.querySelector('table tbody');
  $tableBody.innerHTML = '';
  chrome.storage.local.get('ecountUserList', ({ecountUserList}) => {
    if(ecountUserList == undefined) {
      $tableBody.innerHTML += `
        <tr>
          <td class="text-center" colspan='6'>No User Registered. Please Add User.</td>
        </tr>
      `;
    } else {
      ecountUserList.forEach((user, i) => {
        $tableBody.innerHTML += `
          <tr>
            <td>
              <span class="custom-checkbox">
                <input type="checkbox" id="checkbox${i}" name="options[]" value=${i}>
                <label for="checkbox${i}"></label>
              </span>
            </td>
            <td>${user.comCode}</td>
            <td>${user.id}</td>
            <td>${user.password}</td>
            <td>${user.memo}</td>
            <td>
              <a href="#editUserModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
              <a href="#deleteUserModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
            </td>
          </tr>
      `;
      });
    }

    const checkbox = $('table tbody input[type="checkbox"]');
    // Select/Deselect checkboxes
    $("#selectAll").click(function () {
      if (this.checked) {
        checkbox.each(function () {
          this.checked = true;
        });
      } else {
        checkbox.each(function () {
          this.checked = false;
        });
      }
    });

    checkbox.click(function () {
      if (!this.checked) {
        $("#selectAll").prop("checked", false);
      }
    });
  });
}

const eventBinding = () => {
  $('#addUser').click(e => {
    let userInfo = $('#addUserModal form').serializeArray().reduce((acc, data) => {
      acc[data.name] = data.value;
      return acc;
    }, {});

    chrome.storage.local.get('ecountUserList', ({ecountUserList}) => {
      ecountUserList = ecountUserList ? ecountUserList.concat(userInfo) : [userInfo];
      chrome.storage.local.set({ 'ecountUserList': ecountUserList }, (data) => {
        alert('saved!');
        $('#addUserModal').modal('hide');
        render();
      });
    });
  });



}

$(document).ready(function () {
  init();
  render();
  eventBinding();
});