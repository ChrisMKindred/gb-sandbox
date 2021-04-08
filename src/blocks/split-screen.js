import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";

registerBlockType( 'sandbox/split', {
	title: __( 'Split Screen', 'sandbox' ),
	icon: 'analytics',
	category: 'common',
	keywords: [ __( 'Split', 'sandbox' ), __( 'gutenberg', 'sandbox' ) ],
	attributes: {},
	edit: ( { attributes, setAttributes } ) => {
		const blockProps = useBlockProps();
		return(
			<div {...blockProps}>
				<div>
					<img src="https://images.unsplash.com/photo-1614204426819-8ca2cadda0a1?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixlib=rb-1.2.1&q=80&w=500" width='100%' />
				</div>
				<div>
					<InnerBlocks />
				</div>
			</div>
		)
	},
	save: ( { attributes } ) => {
		return(
			<div>
				<div stlye='float:left;' width="20%" >
					<img src="https://images.unsplash.com/photo-1614204426819-8ca2cadda0a1?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixlib=rb-1.2.1&q=80&w=500" width='100%' />
				</div>
				<div>
					<InnerBlocks.Content />
				</div>
			</div>
		)
	}
});