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
	constructor( locale ) {
		super( locale );

		const bind = this.bindTemplate;

		/**
		 * String representing a color shown as tile's background.
		 *
		 * @type {String}
		 */
		this.set( 'color' );

		/**
		 * A flag that toggles a special CSS class responsible for displaying
		 * a border around the button.
		 *
		 * @type {Boolean}
		 */
		this.set( 'hasBorder' );

		this.imageView = this._createImageView( 'https://avatars.githubusercontent.com/u/5353898?v=4' );

		this.extendTemplate( {
			attributes: {
				style: {
					backgroundColor: bind.to( 'color' )
				},
				class: [
					'ck',
					'ck-color-grid__tile',
					bind.if( 'hasBorder', 'ck-color-table__color-tile_bordered' )
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
