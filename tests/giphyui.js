import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Giphy from '../src/giphy';
import GiphyUI from '../src/giphyui';

import GiphyFormView from '../src/giphyformview';

import { Collection } from 'ckeditor5/src/utils';

/* global document, Event, window */

describe( 'GiphyUI', function() {
	this.timeout( 0 );

	it( 'should be named', () => {
		expect( GiphyUI.pluginName ).to.equal( 'GiphyUI' );
	} );

	describe( 'integration', () => {
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

		describe( 'init()', () => {
			it( 'should register the UI item', () => {
				expect( editor.ui.componentFactory.has( 'giphy' ) ).to.equal( true );
			} );

			it( 'has the base properties', () => {
				const button = editor.ui.componentFactory.create( 'giphy' ).buttonView;

				expect( button ).to.have.property( 'label', 'Giphy' );
				expect( button ).to.have.property( 'icon' );
				expect( button ).to.have.property( 'tooltip', true );
			} );
		} );

		describe( '_requestResults()', () => {
			beforeEach( () => {
				sinon.stub( editor.plugins.get( 'GiphyIntegration' ), 'getGifs' ).callsFake(
					async () => {
						throw 'Error';
					}
				);
			} );

			afterEach( () => {
				editor.plugins.get( 'GiphyIntegration' ).getGifs.restore();
			} );

			it( 'doesn\'t crash when promise throws an exception', async () => {
				const giphyUI = editor.plugins.get( 'GiphyUI' );
				const giphyCollection = new Collection();

				await giphyUI._requestResults( 'foo bar', {}, giphyCollection );
			} );
		} );

		describe( 'error handling', () => {
			let dropdown;

			beforeEach( () => {
				sinon.stub( editor.plugins.get( 'GiphyIntegration' ), 'getGifs' ).callsFake(
					async () => {
						throw 'Error';
					}
				);
				sinon.stub( window, 'alert' );
				sinon.stub( window.console, 'error' );

				dropdown = editor.ui.componentFactory.create( 'giphy' );
				dropdown.render();

				window.document.body.appendChild( dropdown.element );
			} );

			afterEach( () => {
				editor.plugins.get( 'GiphyIntegration' ).getGifs.restore();
				window.alert.restore();
				window.console.error.restore();
			} );

			it( 'shows a generic error when something went wrong with the request', async () => {
				dropdown.isOpen = true;

				await wait( 0 );

				expect( window.alert ).to.be.calledOnce;
				expect( window.alert ).to.be.calledWith( 'Something went wrong with your request.' );
				expect( window.console.error ).to.be.calledOnce;
			} );

			function wait( time ) {
				return new Promise( res => {
					window.setTimeout( res, time );
				} );
			}
		} );
	} );

	describe( 'input text', () => {
		let view, clock;

		before( () => {
			clock = sinon.useFakeTimers();
		} );

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
