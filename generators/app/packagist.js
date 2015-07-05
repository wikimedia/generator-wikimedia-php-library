var https = require( 'https' ),
	when = require( 'when' ),
	packagist = module.exports = {};

packagist.lookUp = function ( packageName ) {
	return when.promise( function ( resolve, reject ) {
		var req = https.get( {
			host: 'packagist.org',
			path: '/packages/' + packageName + '.json'
		} );
		req.on ( 'response', function ( res ) {
			var body = '';
			res.setEncoding( 'utf8' );
			res.on( 'data', function ( chunk ) {
					body += chunk;
			} );
			res.on( 'end', function () {
				var data = JSON.parse( body );
				resolve( data.package );
			} );
		} );
		req.on( 'error', reject );
	} );
};

packagist.getLatest = function ( packageName ) {
	return packagist.lookUp( packageName ).then( function ( package ) {
		var version = Object.keys( package.versions ).filter( function ( v ) {
			// Ignore version strings which cannot be normalized
			// to numeric form (like 'dev-master').
			return /^[\d.]+$/.test( package.versions[ v ].version_normalized );
		} ).reduce( function ( a, b ) {
			// Compare versions by publication date.
			var aDate = new Date( package.versions[ a ].time ),
				bDate = new Date( package.versions[ b ].time );
			return ( aDate > bDate ) ? a : b;
		} );
		return package.versions[ version ].version_normalized;
	} );
};

packagist.resolveDependencies = function ( packageNames, prefix ) {
	prefix = prefix || '';
	return when.reduce( packageNames.map( packagist.getLatest ), function ( deps, version, i ) {
		deps.push( { name: packageNames[ i ], version: prefix + version } );
		return deps;
	}, [] );
};
