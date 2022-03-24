import { Plugin } from 'ckeditor5/src/core';
import { createDropdown } from 'ckeditor5/src/ui';

import GiphyIntegration from './giphyintegration';
import giphyIcon from '../theme/icons/giphy.svg';
import GiphyFormView from './giphyformview';

export default class GiphyUI extends Plugin {
	static get pluginName() {
		return 'GiphyUI';
	}

	static get requires() {
		return [ GiphyIntegration ];
	}

	init() {
		const editor = this.editor;
		const t = editor.t;

		// Add the "giphy" button to feature components.
		editor.ui.componentFactory.add( 'giphy', locale => {
			const dropdownView = createDropdown( locale );
			const formView = this.formView = new GiphyFormView( locale );

			dropdownView.panelView.children.add( formView );

			dropdownView.buttonView.set( {
				label: t( 'Giphy' ),
				icon: giphyIcon,
				tooltip: true
			} );

			dropdownView.on( 'change:isOpen', async () => {
				const gifs = await editor.plugins.get( 'GiphyIntegration' ).getGifs()
					.then( response => this._handleResponse( response ) );

				console.log( 'gifs', gifs );
				editor.editing.view.focus();
			} );

			return dropdownView;
		} );
	}

	_handleResponse(data) {
		return data;
	}
}
