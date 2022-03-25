import { Plugin } from 'ckeditor5/src/core';
import { createDropdown } from 'ckeditor5/src/ui';
import { Collection } from 'ckeditor5/src/utils';

import GiphyIntegration from './giphyintegration';
import giphyIcon from '../theme/icons/giphy.svg';
import GiphyFormView from './giphyformview';

/* global console */

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
		const gifsCollection = new Collection();

		// Add the "giphy" button to feature components.
		editor.ui.componentFactory.add( 'giphy', locale => {
			const dropdownView = createDropdown( locale );
			const formView = this.formView = new GiphyFormView( locale );

			formView.on( 'change:searchText', ( event, propertyName, newValue ) => {
				// @todo: here we could change the tiles.
				console.log( newValue );
			} );

			dropdownView.panelView.children.add( formView );

			dropdownView.buttonView.set( {
				label: t( 'Giphy' ),
				icon: giphyIcon,
				tooltip: true
			} );

			dropdownView.on( 'change:isOpen', async ( event, propertyName, isOpenValue ) => {
				const gifs = await editor.plugins.get( 'GiphyIntegration' ).getGifs( 'ryan gosling' )
					.then( response => this._handleResponse( response ) );

				gifsCollection.clear();
				gifs.forEach( gif => gifsCollection.add( gif ) );

				console.log( gifsCollection );

				if ( isOpenValue ) {
					formView.focus();
				} else {
					// Move focus back to the editable. We might consider to dropping this at some point.
					editor.editing.view.focus();
				}
			} );

			return dropdownView;
		} );
	}

	_handleResponse( data ) {
		return data;
	}
}
