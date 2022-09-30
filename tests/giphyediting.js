import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import GiphyEditing from '../src/giphyediting';

/* global document */

describe( 'GiphyEditing', () => {
	it( 'should be named', () => {
		expect( GiphyEditing.pluginName ).to.equal( 'GiphyEditing' );
	} );

	describe( 'conversion', () => {
		let domElement, editor;

		beforeEach( async () => {
			domElement = document.createElement( 'div' );
			document.body.appendChild( domElement );

			editor = await ClassicEditor.create( domElement, {
				plugins: [
					Paragraph,
					Heading,
					Essentials,
					GiphyEditing
				],
				giphy: {
					api_key: 'api_key_placeholder'
				}
			} );
		} );

		afterEach( () => {
			domElement.remove();
			return editor.destroy();
		} );
	} );
} );
