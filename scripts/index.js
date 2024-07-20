document.addEventListener('DOMContentLoaded', function () {
    const saveButton = document.getElementById('saveButton');
    const ProductNameInput = document.getElementById('ProductName');
    const ProductPriceInput = document.getElementById('ProductPrice');
    const linksList = document.getElementById('List');
  
    saveButton.addEventListener('click', () => {
      const productName = ProductNameInput.value;
      const productPrice = ProductPriceInput.value;
      if (productName && productPrice) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          const currentTab = tabs[0];
          const linkUrl = currentTab.url;
  
          chrome.storage.sync.get(['savedItems'], (result) => {
            let savedItems = result.savedItems || [];
            savedItems.push({ name: productName, price: productPrice, url: linkUrl });
            chrome.storage.sync.set({ savedItems: savedItems }, () => {
              renderLinks();
              ProductNameInput.value = '';
              ProductPriceInput.value = '';
            });
          });
        });
      }
    });
  
    function renderLinks() {
      chrome.storage.sync.get(['savedItems'], (result) => {
        const savedItems = result.savedItems || [];
        linksList.innerHTML = '';
        savedItems.forEach((link, index) => {
          addListItem(link, index);
        });
      });
    }
  
    renderLinks();

    function addListItem(link, index) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      const price = document.createElement('span');
      const deleteButton = document.createElement('span');


      price.innerText = link.price;
      price.className = "price";
      a.href = link.url;
      a.textContent = link.name;
      a.className = "item_name"
      a.target = '_blank';
      deleteButton.innerText = "x";
      deleteButton.className = "delete_button";

      deleteButton.addEventListener('click', ()=> deleteItem(index));


      li.appendChild(a);
      li.appendChild(price);
      li.appendChild(deleteButton);
      linksList.appendChild(li);
    }


    function deleteItem(index){
      chrome.storage.sync.get(['savedItems'], (result) => {
        let savedItems = result.savedItems;
        savedItems.splice(index,1);
        chrome.storage.sync.set({savedItems: savedItems}, ()=>{
          renderLinks();
        });

      });
    }
});