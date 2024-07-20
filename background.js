console.log(chrome.action);
chrome.action.onClicked.addListener(tab => {
    chrome.scripting.executeScript({
        target: {tabId : tab.id},
        func: () => {
            alert('hello mfs');
        }
    });
});