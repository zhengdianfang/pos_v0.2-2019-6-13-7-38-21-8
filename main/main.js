'use strict';

function findProduct(code) {
    const allProducts = loadAllItems();
    for (let i = 0; i < allProducts.length; i++) {
      const product = allProducts[i];
      if (product.barcode === code) {
          return product;
      }
    }
    return undefined;
}

function indexOf(receiptItems, product) {
  let index = -1;
  for (let i = 0; i < receiptItems.length; i++) {
    const receiptItem = receiptItems[i];
    if (receiptItem.product.barcode === product.barcode) {
      index = i;
    }
  }
  return index;
}

function makeReceiptItems(codes) {
  const receiptItems = [];
  for (let i = 0; i < codes.length; i++) {
    const product = findProduct(codes[i]);
    if (product) {
      const findIndex = indexOf(receiptItems, product);
      if (findIndex >= 0) {
        receiptItems[findIndex].count += 1;
      } else {
        receiptItems.push({ product, count: 1});
      }
    }
  } 
  return receiptItems;
}

function assembleReceiptString(receiptItems) {
  let outputString = "***<没钱赚商店>收据***\n"; 
  let totalPrice = 0;
  for (let index = 0; index < receiptItems.length; index++) {
    const { product, count } = receiptItems[index];
    totalPrice += (product.price * count); 
    outputString += `名称：${product.name}，数量：${count}${product.unit}，单价：${product.price.toFixed(2)}(元)，小计：${(product.price * count).toFixed(2)}(元)\n`

  }
  outputString += "----------------------\n";
  outputString += `总计：${totalPrice.toFixed(2)}(元)\n` 
  outputString += `**********************` 
  return outputString;
}

function printReceipt(inputs) {
    const receiptItems = makeReceiptItems(inputs);  
    const outputString = assembleReceiptString(receiptItems);
    console.log(outputString);
}