import { Plugin } from 'ckeditor5/src/core';

const API_KEY = 'VfLRWdWIEZ6pC1wYPfUYmIpNElayWB9P';

/* global fetch */
export default class GiphyIntegration extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'GiphyIntegration';
	}

	getGifs( query ) {
		const giphyAPI = `https://api.giphy.com/v1/gifs/search?q=${ encodeURI( query ) }&api_key=${ API_KEY }&limit=6`;

		return fetch( giphyAPI )
			.then( response => { return response.json(); } )
			.then( response => this._parseData( response ) );
	}

	async _parseData( data ) {
		const gifs = [];

		data.data.forEach( element => {
			const gif = {
				title: element.title,
				url: element.url,
				previewUrl: element.images.preview_gif.url,
				tags: element.tags
			};

			gifs.push( gif );
		} );

		return gifs;
	}
}
