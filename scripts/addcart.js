const saveButton = document.getElementById('saveButton');
const ProductNameInput = document.getElementById('ProductName');
const ProductPriceInput = document.getElementById('ProductPrice');



saveButton.addEventListener('click', () => {
    const productName = ProductNameInput.value;
    const productPrice = ProductPriceInput.value;
    //add product image
    if (productName && productPrice) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentTab = tabs[0];
        const linkUrl = currentTab.url;

        chrome.storage.sync.get(['savedItems'], (result) => {
          let savedItems = result.savedItems || [];
          savedItems.push({ name: productName, price: productPrice, url: linkUrl });
          chrome.storage.sync.set({ savedItems: savedItems }, () => {
            ProductNameInput.value = '';
            ProductPriceInput.value = '';

            //navigatge back to main page
            window.location.href = 'index.html';
          });
        });
      });

      
    } else{
        alert('missing one or more required feilds');
    }
});


document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' || event.key === 'Esc') {
      event.preventDefault();
      window.location.href = 'index.html';
  }
});
  