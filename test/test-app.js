/* global it, before, describe */
'use strict';

var path = require( 'path' );
var assert = require( 'yeoman-generator' ).assert;
var helpers = require( 'yeoman-generator' ).test;

describe( 'generator wikimedia php lib:app', function () {
	this.timeout( 10 * 1000 );

	before( function ( done ) {
		helpers.run( path.join( __dirname, '../generators/app' ) )
			.withOptions( { skipInstall: true } )
			.withPrompts( {
				author_name: 'Ada Lovelace',
				author_email: 'alovelace@adacore.com',
				name: 'BernoulliNumbers',
				description: 'A PHP library for computing Bernoulli numbers.',
				style: 'PSR-2',
				license: 'MIT'
			} )
			.on( 'end', done );
	} );

	it( 'creates files', function () {
		assert.file( [
			'.editorconfig',
			'.gitignore',
			'.gitreview',
			'.travis.yml',
			'Doxyfile',
			'composer.json',
			'phpcs.xml',
			'phpunit.xml.dist',
			'src',
			'tests'
		] );
	} );
} );
