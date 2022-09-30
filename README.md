CKEditor 5 Giphy feature
=================================

Warning: This is an experimental plugin that comes with no support, use it at your own risk.

This package contains a Giphy feature for CKEditor 5.

## License

See [LICENSE.md](LICENSE.md) file.

### Trademarks

**CKEditor** is a trademark of [CKSource](https://cksource.com) Holding sp. z o.o. All other brand and product names are trademarks, registered trademarks or service marks of their respective holders.

### Installation
Add giphy to your editor's configuration:

```js
ClassicEditor
	.create( document.querySelector( '#editor' ), {
		plugins: [ Giphy, ... ],
		toolbar: [ 'giphy', ... ],,
		giphy: {
			api_key: 'api_key_placeholder'
		}
	} )
	.then( ... )
	.catch( ... );
```