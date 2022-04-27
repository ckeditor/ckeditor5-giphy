/* eslint-disable no-alert */
import { Plugin } from 'ckeditor5/src/core';
import { createDropdown } from 'ckeditor5/src/ui';
import { Collection } from 'ckeditor5/src/utils';

import GiphyIntegration from './giphyintegration';
import giphyIcon from '../theme/icons/giphy.svg';
import GiphyFormView from './giphyformview';

/* global console, window */

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

			dropdownView.set( 'loading', false );

			formView.on( 'change:searchText', ( event, propertyName, newValue ) => {
				// @todo: here we could change the tiles.
				console.log( newValue );

				this._requestResults( newValue, dropdownView, gifsCollection );
			} );

			dropdownView.panelView.children.add( formView );

			dropdownView.buttonView.set( {
				label: t( 'Giphy' ),
				icon: giphyIcon,
				tooltip: true
			} );

			dropdownView.on( 'change:isOpen', async ( event, propertyName, isOpenValue ) => {
				this._requestResults( 'ryan gosling', dropdownView, gifsCollection );

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

	async _requestResults( searchText, dropdownView, gifsCollection ) {
		dropdownView.loading = true;

		const giphyIntegration = this.editor.plugins.get( 'GiphyIntegration' );
		const gifs = await giphyIntegration
			.getGifs( searchText )
			.then( response => this._handleResponse( response ) )
			.catch( error => {
				window.alert( 'Something went wrong with your request.' );
				console.error( error );
			} );

		dropdownView.loading = false;

		gifsCollection.clear();
		gifs.forEach( gif => gifsCollection.add( gif ) );

		console.log( Array.from( gifsCollection ) );
	}

	_handleResponse( data ) {
		return data;
	}
}
