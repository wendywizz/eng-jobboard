<?php
/* ======================================================
 # Login as User for WordPress - v1.4.0 (free version)
 # -------------------------------------------------------
 # For WordPress
 # Author: Web357 (Yiannis Christodoulou)
 # Copyright @ 2009-2021 Web357. All rights reserved.
 # License: GNU/GPLv3, http://www.gnu.org/licenses/gpl-3.0.html
 # Website: https:/www.web357.com
 # Demo: https://demo.web357.com/wordpress/login-as-user/wp-admin/
 # Support: support@web357.com
 # Last modified: Thursday 08 April 2021, 04:42:50 AM
 ========================================================= */
 
/**
 * Fired when the plugin is uninstalled.
 */

// If uninstall not called from WordPress, then exit.
if (
	!defined( 'WP_UNINSTALL_PLUGIN' )
	||
	!WP_UNINSTALL_PLUGIN
	||
	dirname( WP_UNINSTALL_PLUGIN ) != dirname( plugin_basename( __FILE__ ) )
) {
	status_header( 404 );
	exit;
}

// Delete the options from database
// delete_option('login_as_user_options');