import { Command } from 'ckeditor5/src/core';

export default class AddGiphyCommand extends Command {
	execute( giphyItem ) {
		this.editor.execute( 'insertImage', {
			source: [
				{ src: giphyItem.url, alt: giphyItem.title }
			]
		} );
	}
}
