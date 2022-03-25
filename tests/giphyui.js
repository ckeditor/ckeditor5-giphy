import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Giphy from '../src/giphy';
import GiphyUI from '../src/giphyui';

import GiphyFormView from '../src/giphyformview';

/* global document, Event */

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

		it( 'has the base properties', () => {
			const button = editor.ui.componentFactory.create( 'giphy' );

			expect( button ).to.have.property( 'label', 'Insert Giphy' );
			expect( button ).to.have.property( 'icon' );
			expect( button ).to.have.property( 'tooltip', true );
		} );
	} );

	describe( 'input text', () => {
		let view;

		const clock = sinon.useFakeTimers();

		beforeEach( () => {
			view = new GiphyFormView( { t: val => val } );
			view.render();
			document.body.appendChild( view.element );
		} );

		afterEach( () => {
			view.element.remove();
			view.destroy();
		} );

		after( () => {
			clock.restore();
		} );

		it( 'changes #searchText property', () => {
			const domInput = view.element.querySelector( 'input[type=text]' );

			domInput.value = 'new value';
			domInput.dispatchEvent( new Event( 'input' ) );

			clock.tick( 1000 );

			expect( view.searchText ).to.equal( 'new value' );
		} );

		it( 'debounces the initial change', () => {
			const domInput = view.element.querySelector( 'input[type=text]' );

			domInput.value = 'foobar';
			domInput.dispatchEvent( new Event( 'input' ) );

			expect( view.searchText ).to.equal( '' );
		} );

		it( 'changes are debounced', () => {
			const domInput = view.element.querySelector( 'input[type=text]' );

			domInput.value = '1';
			domInput.dispatchEvent( new Event( 'input' ) );

			expect( view.searchText, 'first check' ).to.equal( '' );
			domInput.value = '2';
			domInput.dispatchEvent( new Event( 'input' ) );

			clock.tick( 200 );

			expect( view.searchText, 'second check' ).to.equal( '2' );
		} );
	} );
} );
