/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module ui/colorgrid/colortile
 */

import {
	View,
	ButtonView
} from 'ckeditor5/src/ui';
// import checkIcon from '../../theme/icons/color-tile-check.svg';

/**
 * This class represents a single color tile in the {@link module:ui/colorgrid/colorgrid~ColorGridView}.
 *
 * @extends module:ui/button/buttonview~ButtonView
 */
export default class TileView extends ButtonView {
	constructor( giphyItem, locale ) {
		super( locale );

		this.imageView = this._createImageView( giphyItem.previewUrl );

		this.label = giphyItem.title;

		this.extendTemplate( {
			attributes: {
				class: [
					'ck',
					'ck-grid__tile'
				]
			}
		} );
	}

	_createImageView( imageSrc ) {
		const imageView = new View();
		imageView.setTemplate( {
			tag: 'img',
			attributes: {
				src: imageSrc
			}
		} );

		return imageView;
	}

	/**
	 * @inheritDoc
	 */
	render() {
		super.render();

		this.children.add( this.imageView );
	}
}
