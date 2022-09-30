import { Plugin } from 'ckeditor5/src/core';
import GiphyEditing from './giphyediting';
import GiphyUI from './giphyui';

/* globals console */

export default class Giphy extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [ GiphyUI, GiphyEditing ];
	}

	/**
	 * @inheritDoc
	 */
	init() {
		const editor = this.editor;

		if ( !editor.config.get( 'giphy' ).api_key ) {
			return console.warn( `The Giphy feature requires an api key to be loaded and work correctly.
Please make sure you visit https://developers.giphy.com/ to get the key.` );
		}
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'Giphy';
	}
}
