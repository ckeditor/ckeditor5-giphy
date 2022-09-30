import { Plugin } from 'ckeditor5/src/core';

/* global fetch */
export default class GiphyIntegration extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'GiphyIntegration';
	}

	getGifs( query ) {
		const giphyAPI = `https://api.giphy.com/v1/gifs/search?q=${ encodeURI( query ) }
			&api_key=${ this.editor.config.get( 'giphy' ).api_key }&limit=6`;

		return fetch( giphyAPI )
			.then( response => { return response.json(); } )
			.then( response => this._parseData( response ) );
	}

	async _parseData( data ) {
		const gifs = [];

		data.data.forEach( element => {
			const gif = {
				title: element.title,
				giphyUrl: element.url,
				previewUrl: element.images.preview_gif.url,
				tags: element.tags,
				url: element.images.original.url
			};

			gifs.push( gif );
		} );

		return gifs;
	}
}
