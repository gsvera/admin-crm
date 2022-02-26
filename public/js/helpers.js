function convertCurrency(n){
    let currencyLocal = Intl.NumberFormat('en-US',{style:'currency', currency:'USD'})
    
    return (currencyLocal.format(n))
    
  }