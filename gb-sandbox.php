<?php
/*
Plugin Name: Gutenberg Testing Sandbox
Plugin URI: https://github.com/ChrisMKindred/gb-sandbox
Description: A testing sandbox for Gutenberg blocks.
Version: 0.0.0
Author: Chris Kindred
Author URI: https://github.com/ChrisMKindred
Text Domain: gb-sandbox
Domain Path: /languages
*/

use Sandbox\GB_Sandbox;

require_once( 'vendor/autoload.php' );


register_activation_hook( __FILE__, [ GB_Sandbox::class, 'activate' ] );
register_deactivation_hook( __FILE__, [ GB_Sandbox::class, 'deactivate' ] );


function run_gb_sandbox() {
	return GB_Sandbox::init();
}

run_gb_sandbox();
