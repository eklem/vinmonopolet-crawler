# vinmonopolet-crawler
Crawling Vinmonopolet-data and indexing it to a `norch` search index, using [`vinmonopolet`](https://github.com/rexxars/vinmonopolet) and [`search-index-indexer`](https://github.com/eklem/search-index-indexer) library.


Has these features:
* Removing unwanted key/value pars by it's keys
* Changing values to arrays for defined keys. Preparing for being used as filters.
* Copying value of defined key to id-value. Makes it easy to update index.
* Creating image URL based on id/code.
* Pushing filter.category to product.productType when different for better filter functionality.
