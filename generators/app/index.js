'use strict';

var yeoman = require( 'yeoman-generator' ),
	slugify = require( 'underscore.string/slugify' ),
	packagist = require( './packagist' ),
	licenses = require( './licenses.js' );


module.exports = yeoman.generators.Base.extend( {
	prompting: function () {
		var done = this.async(), prompts = [ {
			name    : 'author_name',
			message : 'What is your name?'
		}, {
			name    : 'author_email',
			message : 'What is your e-mail address?'
		}, {
			name    : 'name',
			message : 'What is the name of your library, in CamelCase?'
		}, {
			name    : 'description',
			message : 'Provide a one-sentence summary of your library.'
		}, {
			type    : 'list',
			name    : 'style',
			message : 'Choose a PHP coding style standard.',
			choices : [ 'MediaWiki', 'PSR-2' ]
		}, {
			type    : 'list',
			name    : 'license',
			message : 'Choose a license.',
			choices : Object.keys( licenses )
		} ];

		this.log( '' );
		this.log( require( 'wikimedia-logo' ) );
		this.log( '' );
		this.log( "Welcome! I'll help you create a new PHP library." );
		this.log( '' );

		this.prompt( prompts, function ( props ) {
			this.log( '' );
			this.log( 'Resolving Composer dependencies...' );
			this.log( '' );
			packagist.resolveDependencies( [
				'jakub-onderka/php-parallel-lint',
				'phpunit/phpunit',
				props.style === 'MediaWiki'
					? 'mediawiki/mediawiki-codesniffer'
					: 'squizlabs/php_codesniffer'
			], '^' ).then( function ( deps ) {
				props.deps = deps;
				done();
			} );
			this.props = props;
		}.bind ( this ) );
	},

	writing: function () {
		this.props.slug = slugify( this.props.name );
		licenses[ this.props.license ]( this );

		[
			'gitignore',
			'gitattributes',
			'travis.yml'
		].forEach( function ( fileName ) {
			this.fs.copy(
				this.templatePath( fileName ),
				this.destinationPath( '.' + fileName )
			);
		}.bind( this ) );

		[
			'_.gitreview',
			'_.editorconfig',
			'_Doxyfile',
			'_composer.json',
			'_phpcs.xml',
			'_phpunit.xml.dist'
		].forEach( function ( templateName ) {
			this.fs.copyTpl(
				this.templatePath( templateName ),
				this.destinationPath( templateName.slice( 1 ) ),
				this.props,
				this.tplSettings
			);
		}.bind( this ) );

		this.fs.copyTpl(
			this.templatePath( '_Library.php' ),
			this.destinationPath( 'src/' + this.props.name + '.php' ),
			this.props,
			this.tplSettings
		);

		this.fs.copyTpl(
			this.templatePath( '_LibraryTest.php' ),
			this.destinationPath( 'tests/' + this.props.name + 'Test.php' ),
			this.props,
			this.tplSettings
		);
	},

	tplSettings: { rmWhitespace: true },

	install: function () {
		if ( this.options[ 'skip-install' ] ) {
			return;
		}
		this.spawnCommand( 'composer', [ 'install' ] );
	}
} );
