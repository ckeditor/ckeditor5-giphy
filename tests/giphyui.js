import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Giphy from '../src/giphy';
import GiphyUI from '../src/giphyui';

/* global document */

describe( 'GiphyUI', () => {
	it( 'should be named', () => {
		expect( GiphyUI.pluginName ).to.equal( 'GiphyUI' );
	} );

	describe( 'init()', () => {
		let domElement, editor;

		beforeEach( async () => {
			domElement = document.createElement( 'div' );
			document.body.appendChild( domElement );

			editor = await ClassicEditor.create( domElement, {
				plugins: [
					Paragraph,
					Heading,
					Essentials,
					Giphy
				],
				toolbar: [
					'giphy'
				]
			} );
		} );

		afterEach( () => {
			domElement.remove();
			return editor.destroy();
		} );

		it( 'should register the UI item', () => {
			expect( editor.ui.componentFactory.has( 'giphy' ) ).to.equal( true );
		} );
	} );
} );
