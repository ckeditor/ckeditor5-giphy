/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module giphy/ui/giphyformview
 */

import {
	View,
	LabeledFieldView,

	FocusCycler,
	createLabeledInputText,
	ViewCollection,
	injectCssTransitionDisabler
} from 'ckeditor5/src/ui';

import {
	FocusTracker,
	KeystrokeHandler
} from 'ckeditor5/src/utils';

import GiphyGridView from './giphygrid/giphygridview';

import { debounce } from 'lodash-es';

// See: #8833.
// eslint-disable-next-line ckeditor5-rules/ckeditor-imports
import '@ckeditor/ckeditor5-ui/theme/components/responsive-form/responsiveform.css';
import '../theme/giphyformview.css';

const GRID_COLUMNS_COUNT = 2;

/**
 * The find and replace form view class.
 *
 * See {@link module:giphy/giphyformview~GiphyFormView}.
 *
 * @extends module:ui/view~View
 */
export default class GiphyFormView extends View {
	/**
	 * Creates an instance of the {@link module:giphy/giphyformview~GiphyFormView} class.
	 *
	 * Also see {@link #render}.
	 *
	 * @param {module:utils/locale~Locale} [locale] The localization services instance.
	 */
	constructor( giphyCollection, locale ) {
		super( locale );

		/**
		 * Value of search/filter text input.
		 *
		 * @member {String}
		 */
		this.set( 'searchText', '' );

		/**
		 * Tracks information about DOM focus in the form.
		 *
		 * @readonly
		 * @member {module:utils/focustracker~FocusTracker}
		 */
		this.focusTracker = new FocusTracker();

		/**
		 * An instance of the {@link module:utils/keystrokehandler~KeystrokeHandler}.
		 *
		 * @readonly
		 * @member {module:utils/keystrokehandler~KeystrokeHandler}
		 */
		this.keystrokes = new KeystrokeHandler();

		/**
		 * The URL input view.
		 *
		 * @member {module:ui/labeledfield/labeledfieldview~LabeledFieldView}
		 */
		this.filterInputView = this._createFilterInput();

		this.grid = this._createGrid();

		/**
		 * A collection of child views in the form.
		 *
		 * @readonly
		 * @type {module:ui/viewcollection~ViewCollection}
		 */
		this.children = this._createChildrenList();

		/**
		 * A collection of views that can be focused in the form.
		 *
		 * @readonly
		 * @protected
		 * @member {module:ui/viewcollection~ViewCollection}
		 */
		this._focusables = new ViewCollection();

		/**
		 * Helps cycling over {@link #_focusables} in the form.
		 *
		 * @readonly
		 * @protected
		 * @member {module:ui/focuscycler~FocusCycler}
		 */
		this._focusCycler = new FocusCycler( {
			focusables: this._focusables,
			focusTracker: this.focusTracker,
			keystrokeHandler: this.keystrokes,
			actions: {
				// Navigate form fields backwards using the Shift + Tab keystroke.
				focusPrevious: 'shift + tab',

				// Navigate form fields forwards using the Tab key.
				focusNext: 'tab'
			}
		} );

		this.grid.observeGiphyCollection( giphyCollection );

		this.setTemplate( {
			tag: 'div',

			attributes: {
				class: [ 'ck', 'ck-giphy-form', 'ck-responsive-form' ],

				// https://github.com/ckeditor/ckeditor5-link/issues/90
				tabindex: '-1'
			},

			children: this.children
		} );

		injectCssTransitionDisabler( this ); // @todo: check if this is needed.
	}

	/**
	 * @inheritDoc
	 */
	render() {
		super.render();

		const childViews = [
			this.filterInputView
			// @todo: grid view
		];

		childViews.forEach( v => {
			// Register the view as focusable.
			this._focusables.add( v );

			// Register the view in the focus tracker.
			this.focusTracker.add( v.element );
		} );

		// Start listening for the keystrokes coming from #element.
		this.keystrokes.listenTo( this.element );
	}

	/**
	 * @inheritDoc
	 */
	destroy() {
		super.destroy();

		this.focusTracker.destroy();
		this.keystrokes.destroy();
	}

	/**
	 * Focuses the fist {@link #_focusables} in the form.
	 */
	focus() {
		this._focusCycler.focusFirst();
	}

	/**
	 * Creates a labeled input view.
	 *
	 * @private
	 * @returns {module:ui/labeledfield/labeledfieldview~LabeledFieldView} Labeled field view instance.
	 */
	_createFilterInput() {
		const t = this.locale.t;
		const labeledInput = new LabeledFieldView( this.locale, createLabeledInputText );

		labeledInput.label = t( 'What you\'re looking for?' );

		// Property change should be debounced to prevent overly frequent content fetches.
		const debounced = debounce( event => {
			this.set( 'searchText', event.source.element.value );
		}, 200 );

		labeledInput.fieldView.on( 'input', debounced );

		// This definitely should be more smartly bound with input#value.
		this.on( 'change:searchText', ( event, propertyName, newValue ) => {
			if ( labeledInput.fieldView.element && labeledInput.fieldView.element.value != newValue ) {
				labeledInput.fieldView.element.value = newValue;
			}
		} );

		return labeledInput;
	}

	_createGrid() {
		const grid = new GiphyGridView( this.locale, {
			colorDefinitions: [],
			columns: GRID_COLUMNS_COUNT
		} );

		return grid;
	}

	/**
	 * Populates the {@link #children} collection of the form.
	 *
	 * @private
	 * @returns {module:ui/viewcollection~ViewCollection} The children of link form view.
	 */
	_createChildrenList() {
		const children = this.createCollection();

		children.add( this.filterInputView );

		// @todo: children.add( this.gridView );

		const loaderView = new View();
		loaderView.setTemplate( {
			tag: 'div',
			attributes: {
				class: [ 'ck-loader-overlay', 'ck-reset_all-excluded' ]
			},
			children: [
				{
					tag: 'div',
					attributes: {
						class: [ 'ck-giphy-spinner' ]
					}
				},
				{
					text: 'Fetching your Giphies 🛠…'
				}
			]
		} );

		children.add( loaderView );

		children.add( this.grid );

		return children;
	}
}
