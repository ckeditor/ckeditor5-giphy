import { Plugin } from 'ckeditor5/src/core';
import GiphyEditing from './giphyediting';
import GiphyUI from './giphyui';

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
	static get pluginName() {
		return 'Giphy';
	}
}
