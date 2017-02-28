const vinmonopolet = require('vinmonopolet')
const fs = require('fs');
const filter = {category:'all',regex:'.'}
//const filter = {category:'Øl',regex:'øl|hveteøl|surøl|ale|porter|stout|klosterstil|bitter|spesial|lager|red\/amber|barley|mjød'}
//const filter = {category:'Hvitvin',regex:'hvitvin'}
//const filter = {category:'Rødvin',regex:'rødvin'}
const deleteElements = ['url','barcode','images','method','storeable','foodPairing','eco','gluten','kosher','fairTrade','bioDynamic','mainProducer','distributor','distributorId','wholesaler','categories','storeCategory','mainCategory','mainSubCategory','subDistrict','buyable','deliveryTime','nrOfUsage','availableForPickup','averageRating','stock','status','ageLimit','expiredDate','purchasable','newProduct']
const convertToArray = ['productType','mainCountry']
const setToId = 'code'
const filename = 'products-' + filter.category +'.str'
const writeStream = fs.createWriteStream(filename)
var i = 0

vinmonopolet
  .stream.getProducts()
  .on('data', function(product) {
    // Filter on productType
    var productType = product.productType
    regex = new RegExp(filter.regex, 'gi')
    console.log(regex)
    if (productType.match(regex)) {
      console.log('Saving product: ' + product.code + ' ' + product.productType)
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
      if (filter.category != product.productType[0] && filter.category != 'all') {
        product.productType.push(filter.category)
      }
      // Define field to be id
      product.id = product[setToId]
      // Create product image url
      product.image = 'https://bilder.vinmonopolet.no/cache/800x800-0/' + product.id + '-1.jpg'
      console.log(JSON.stringify(product))
      writeStream.write(JSON.stringify(product))
      i++
    }
    if (!productType.match(regex)) {
//      console.log('Skipping product: ' + product.code + ' ' + product.productType)
    }
  })
  .on('end', function() {
    console.log('Done! Saved products: ' + i)
  })
