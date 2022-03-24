import { Giphy as GiphyDll, icons } from '../src';
import Giphy from '../src/giphy';

import ckeditor from './../theme/icons/ckeditor.svg';

describe( 'CKEditor5 Giphy DLL', () => {
	it( 'exports Giphy', () => {
		expect( GiphyDll ).to.equal( Giphy );
	} );

	describe( 'icons', () => {
		it( 'exports the "ckeditor" icon', () => {
			expect( icons.ckeditor ).to.equal( ckeditor );
		} );
	} );
} );
