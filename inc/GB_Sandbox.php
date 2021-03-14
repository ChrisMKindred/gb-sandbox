<?php
namespace Sandbox;

final class GB_Sandbox {

	const VERSION     = '0.0.0';
	const PLUGIN_NAME = 'gb-sandbox';

	public function __construct() {
		$this->constants();
		add_action( 'plugins_loaded', [ $this, 'init_plugin' ] );
	}

	public function init_plugin() {
		$this->enqueue_scripts();
	}

	public function enqueue_scripts() {
		add_action( 'enqueue_block_editor_assets', [ $this, 'register_block_editor_assets' ] );
		add_action( 'admin_enqueue_scripts', [ $this, 'register_admin_scripts' ] );
		add_action( 'wp_enqueue_scripts', [ $this, 'register_public_scripts' ] );
		add_action( 'init', [ $this, 'register_blocks' ] );
	}

	/**
	 * Registers the block editor assets
	 *
	 * @return void
	 */
	public function register_block_editor_assets() {
		$deps = [
			'wp-blocks',
			'wp-editor',
			'wp-i18n',
			'wp-elements',
			'wp-components',
			'wp-data',
		];
		wp_enqueue_script( self::PLUGIN_NAME . '-scripts', GB_SANDBOX_URL . 'build/index.js', $deps, true );
	}

	/**
	 * Registers the admin scripts
	 *
	 * @return void
	 */
	public function register_admin_scripts() {
		wp_enqueue_script( self::PLUGIN_NAME . '-admin', GB_SANDBOX_URL . 'assets/css/editor.css', GB_SANDBOX_VERSION, true );
		wp_enqueue_style( self::PLUGIN_NAME . '-admin', GB_SANDBOX_URL . 'assets/js/editor.js', [], GB_SANDBOX_VERSION, true );
	}

	/**
	 * Registers the public scripts
	 *
	 * @return void
	 */
	public function register_public_scripts() {
		wp_enqueue_script( self::PLUGIN_NAME . '-public', GB_SANDBOX_URL . 'assets/css/style.css', GB_SANDBOX_VERSION, true );
		wp_enqueue_style( self::PLUGIN_NAME . '-public', GB_SANDBOX_URL . 'assets/js/scripts.js', [], GB_SANDBOX_VERSION, true );
	}

	private function constants() {
		define( 'GB_SANDBOX_PATH', trailingslashit( plugin_dir_path( dirname( __FILE__ ) ) ) );
		define( 'GB_SANDBOX_URL', plugin_dir_url(  GB_SANDBOX_PATH . self::PLUGIN_NAME ) );
		define( 'GB_SANDBOX_VERSION', self::VERSION ); 
	}

	/**
	 * Register the 
	 *
	 * @return void
	 */
	public function register_blocks() {
		register_block_type(
			self::PLUGIN_NAME . '/block', 
			[
				'style'          => self::PLUGIN_NAME . '-public',
				'editor_style'   => self::PLUGIN_NAME . '-editor',
				'editor_scripts' => self::PLUGIN_NAME . '-scripts',
			]
		);
	}

	public static function init() {
		static $instance = false;
		if ( ! $instance ) {
			$instance = new self();
		} 
		return $instance;
	}
}
