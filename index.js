const vinmonopolet = require('vinmonopolet')
const deleteElements = ['url','barcode','images','method','storeable','foodPairing','eco','gluten','kosher','fairTrade','bioDynamic','mainProducer','distributor','distributorId','wholesaler','categories','storeCategory','mainCategory','mainSubCategory','subDistrict','buyable','deliveryTime','nrOfUsage','availableForPickup','averageRating','stock','status','ageLimit','expiredDate','purchasable','newProduct']
const convertToArray = ['productType','mainCountry']
const setToId = 'code'
var fs = require('fs');
var writeStream = fs.createWriteStream('wines.str');

vinmonopolet
  .stream.getProducts()
  .on('data', function(product) {
    // Remove unwanted elements in object
    for (element in deleteElements) {
      var deleteElement = deleteElements[element]
      delete product[deleteElement]
    }
    // Convert string values to array values
    for (stringKey in convertToArray) {
      var stringToArray = convertToArray[stringKey]
      product[stringToArray] = [product[stringToArray]]
    }
    // Define field to be id
    if (setToId) {
      product.id = product[setToId]
      product.image = 'https://bilder.vinmonopolet.no/cache/800x800-0/' + product.id + '-1.jpg'
    }
    console.log(JSON.stringify(product))
    writeStream.write(JSON.stringify(product))
  })
  .on('end', function() {
    console.log('Done!')
  })
