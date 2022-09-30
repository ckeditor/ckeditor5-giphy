import { Plugin } from 'ckeditor5/src/core';

import AddGiphyCommand from './addgiphycommand';

export default class GiphyEditing extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'GiphyEditing';
	}

	/**
	 * @inheritDoc
	 */
	init() {
		const editor = this.editor;

		if ( !editor.config.get( 'giphy' ).api_key ) {
			return;
		}

		editor.commands.add( 'addGiphy', new AddGiphyCommand( this.editor ) );
	}
}
