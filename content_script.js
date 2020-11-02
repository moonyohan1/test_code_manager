chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const userInfo = message.userInfo;

    document.querySelector('#com_code').value = userInfo.comCode;
    document.querySelector('#id').value = userInfo.id;
    document.querySelector('#passwd').value = userInfo.password;
    
    sendResponse({result: "success"});
});