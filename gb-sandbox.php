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

require_once( 'vendor/autoload.php' );

function run_gb_sandbox() {
	return Sandbox\GB_Sandbox::init();
}

run_gb_sandbox();
