import { Plugin } from 'ckeditor5/src/core';
import { ButtonView } from 'ckeditor5/src/ui';

import GiphyIntegration from './giphyintegration';
import giphyIcon from '../theme/icons/giphy.svg';

export default class GiphyUI extends Plugin {
	static get pluginName() {
		return 'GiphyUI';
	}

	static get requires() {
		return [GiphyIntegration];
	}

	init() {
		const editor = this.editor;
		const t = editor.t;
		const model = editor.model;

		// Add the "giphy" button to feature components.
		editor.ui.componentFactory.add( 'giphy', locale => {
			const view = new ButtonView( locale );

			view.set( {
				label: t( 'Giphy' ),
				icon: giphyIcon,
				tooltip: true,
				isToggleable: true
			} );

			// Insert a text into the editor after clicking the button.
			this.listenTo( view, 'execute', async () => {
				const gifs = await editor.plugins.get('GiphyIntegration').getGifs().then(response => this._handleResponse(response));
				console.log('gifs', gifs);
				editor.editing.view.focus();
			} );

			return view;
		} );
	}

	_handleResponse(data) {
		return data;
	}
}
