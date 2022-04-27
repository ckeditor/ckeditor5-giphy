/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module ui/colorgrid/colorgrid
 */

import TileView from './tileview';
import GridView from './gridview';

/**
 * A grid of {@link module:ui/colorgrid/colortile~TileView color tiles}.
 *
 * @extends module:ui/view~View
 */
export default class GiphyGridView extends GridView {
	/**
	 * Adds a proper listeners to the provided Giphy collection so that it ensures
	 * that grid's views are kept in sync with it.
	 *
	 * @param {module:utils/collection~Collection} giphyCollection A collection of giphies to be tracked.
	 */
	observeGiphyCollection( giphyCollection ) {
		giphyCollection.on( 'change', ( eventInfo, { added, removed, index } ) => {
			for ( let i = 0; i < removed.length; i++ ) {
				this.items.remove( index );
			}

			for ( const addedItem of added ) {
				this._addGiphy( addedItem );
			}
		} );
	}

	_addGiphy( giphyItem ) {
		const newView = new TileView();
		newView.label = giphyItem.title;
		newView.withText = true;

		this.items.add( newView );
	}
}
