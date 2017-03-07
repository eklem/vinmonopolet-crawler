const vinmonopolet = require('vinmonopolet')
const fs = require('fs');
const filter = {category:'all',regex:'.'}
//const filter = {category:'Rødvin',regex:'rødvin'}
//const filter = {category:'Hvitvin',regex:'hvitvin'}
//const filter = {category:'Brennevin',regex:'whisky|druebrennevin|likør|akevitt|vodka|fruktbrennevin|rom|gin|bitter|genever'}
//const filter = {category:'Øl',regex:'øl|hveteøl|surøl|ale|porter|stout|klosterstil|spesial|lager|red\/amber|barley|mjød'}
//const filter = {category:'Musserende vin',regex:'musserende|champagne'}
//const filter = {category:'Sterkvin',regex:'portvin|sterkvin|sherry|vermut|madeira'}
//const filter = {category:'Perlende vin',regex:'perlende'}
//const filter = {category:'Sider',regex:'sider'}
//const filter = {category:'Aromatisert vin',regex:'aromatisert'}
//const filter = {category:'Fruktvin',regex:'fruktvin'}
//const filter = {category:'Alkoholfritt',regex:'alkoholfri'}
const deleteElements = ['url','barcode','images','method','storeable','foodPairing','eco','gluten','kosher','fairTrade','bioDynamic','mainProducer','distributor','distributorId','wholesaler','categories','storeCategory','mainCategory','mainSubCategory','subDistrict','buyable','deliveryTime','nrOfUsage','availableForPickup','averageRating','stock','status','ageLimit','expiredDate','purchasable','newProduct']
const convertToArray = ['productType','mainCountry']
const setToId = 'code'
const filename = 'products-' + encodeURIComponent(filter.category) +'.str'
const writeStream = fs.createWriteStream(filename)
var i = 0
regex = new RegExp(filter.regex, 'gi')

vinmonopolet
  .stream.getProducts()
  .on('data', function(product) {
    // Filter on productType
    var productType = product.productType
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
