import { Giphy as GiphyDll, icons } from '../src';
import Giphy from '../src/giphy';

import giphy from './../theme/icons/giphy.svg';

describe( 'CKEditor5 Giphy DLL', () => {
	it( 'exports Giphy', () => {
		expect( GiphyDll ).to.equal( Giphy );
	} );

	describe( 'icons', () => {
		it( 'exports the "giphy" icon', () => {
			expect( icons.giphy ).to.equal( giphy );
		} );
	} );
} );
