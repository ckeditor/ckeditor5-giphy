import { Plugin } from 'ckeditor5/src/core';
import { ButtonView } from 'ckeditor5/src/ui';

import giphyIcon from '../theme/icons/giphy.svg';

export default class GiphyUI extends Plugin {
	static get pluginName() {
		return 'GiphyUI';
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
			this.listenTo( view, 'execute', () => {
				model.change( writer => {
					const textNode = writer.createText( 'Hello CKEditor 5!' );

					model.insertContent( textNode );
				} );

				editor.editing.view.focus();
			} );

			return view;
		} );
	}
}
