<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'eng-jobboard' );

/** MySQL database username */
define( 'DB_USER', 'admin' );

/** MySQL database password */
define( 'DB_PASSWORD', '12123' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8_general_ci' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', 'utf8_general_ci' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '1iJSMcM{P},J4%1(>|FGRU=k{eF1==]5z+.Z]F)6U.eYXsSOa^Uq%iXA-uMH3;y?' );
define( 'SECURE_AUTH_KEY',  '6V@Obt%VQlIN]hsgs?D1 c80$&sX37UeR@mgQjtl>)8I!YACBC7D@ ~,Tp8IQx2M' );
define( 'LOGGED_IN_KEY',    '7l+9E9@:S`R_2gKtH7O__9*p;j+1ed#r}E5b%E(Br2N?dlT:KTBDx0.oy#@Q[M)T' );
define( 'NONCE_KEY',        'S|PNy.,Z#ClKq<d;/$#on?T,QkJvAZ`xY4x_&Tk{wzn_CO(QQQRTcFx8->zP&yUq' );
define( 'AUTH_SALT',        '(rgs{bKE<;ZjC[T`CTDHLY>3MO4~_ARX>d>@igWm5&7.MUFO:x_>bX@t>b;vy+ds' );
define( 'SECURE_AUTH_SALT', '74C:<^aaE)n5i57f5y J4J::xy$,x;.vC~9U`R]W!3IC`dc&q~>)TXOA}EwOX4Fy' );
define( 'LOGGED_IN_SALT',   '2#5Py|twx9B.5er@]*BA?K|f!#S:c)DHX;{%.{l4b{v*h0lI8;&lnvn)Bz#bFVgI' );
define( 'NONCE_SALT',       'r2>?MwEkDqR|[51Ojk%=/z}~ZxwUY<z6A[2brANzxYdFQ$iFH:NC;mr9zaE-++{P' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
