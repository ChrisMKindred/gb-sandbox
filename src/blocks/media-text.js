import { registerBlockType } from "@wordpress/blocks";
import { InspectorControls, MediaUpload, MediaUploadCheck } from "@wordpress/blockEditor";
import { PanelBody, Button, ResponsiveWrapper } from "@wordpress/components";
import { Fragment } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { withSelect } from "@wordpress/data";
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";

const BlockEdit = (props) => {
	const { attributes, setAttributes } = props;
 
	const removeMedia = () => {
		props.setAttributes({
			mediaId: 0,
			mediaUrl: ''
		});
	}
 
 	const onSelectMedia = (media) => {
		props.setAttributes({
			mediaId: media.id,
			mediaUrl: media.url
		});
	}
 
	const blockStyle = {
		backgroundImage: attributes.mediaUrl != '' ? 'url("' + attributes.mediaUrl + '")' : 'none'
	};
	
	return (
		<Fragment>
			<InspectorControls>
				<PanelBody
					title={__('Select block background image', 'awp')}
					initialOpen={ true }
				>
					<div className="editor-post-featured-image">
						<MediaUploadCheck>
							<MediaUpload
								onSelect={onSelectMedia}
								value={attributes.mediaId}
								allowedTypes={ ['image'] }
								render={({open}) => (
									<Button 
										className={attributes.mediaId == 0 ? 'editor-post-featured-image__toggle' : 'editor-post-featured-image__preview'}
										onClick={open}
									>
										{attributes.mediaId == 0 && __('Choose an image', 'awp')}
										{props.media != undefined && 
						            			<ResponsiveWrapper
									    		naturalWidth={ props.media.media_details.width }
											naturalHeight={ props.media.media_details.height }
									    	>
									    		<img src={props.media.source_url} />
									    	</ResponsiveWrapper>
						            		}
									</Button>
								)}
							/>
						</MediaUploadCheck>
						{attributes.mediaId != 0 && 
							<MediaUploadCheck>
								<MediaUpload
									title={__('Replace image', 'awp')}
									value={attributes.mediaId}
									onSelect={onSelectMedia}
									allowedTypes={['image']}
									render={({open}) => (
										<Button onClick={open} isSecondary isLarge>{__('Replace image', 'awp')}</Button>
									)}
								/>
							</MediaUploadCheck>
						}
						{attributes.mediaId != 0 && 
							<MediaUploadCheck>
								<Button onClick={removeMedia} isLink isDestructive>{__('Remove image', 'awp')}</Button>
							</MediaUploadCheck>
						}
					</div>
				</PanelBody>
			</InspectorControls>
			<div style={blockStyle}>
				... Your block content here...
			</div>
		</Fragment>
	);
};

registerBlockType( 'sandbox/media', {
	title: __( 'Image & Text' ),
	icon: 'id-alt',
	category: 'common',
	keywords: [ __( 'media' ), __( 'text' ), __( 'sandbox' ) ],
	supports: {
		align: true
	},
	attributes: {
		mediaId: {
			type: 'number',
			default: 0
		},
		mediaUrl: {
			type: 'string',
			default: ''
		}
	}, 
	edit: withSelect((select, props) => {
		return { media: props.attributes.mediaId ? select('core').getMedia(props.attributes.mediaId) : undefined };
	})(BlockEdit),
	save: (props) => {
		const { attributes } = props;
		const blockStyle = {
			backgroundImage: attributes.mediaUrl != '' ? 'url("' + attributes.mediaUrl + '")' : 'none'
		};
		return (
			<div style={blockStyle}>
				... Your block content here...
			</div>
		);
	}
});