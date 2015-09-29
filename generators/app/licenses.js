'use strict';

module.exports = {
	'Apache-2.0': function ( generator ) {
		generator.props.header = generator.engine(
			generator.fs.read( generator.templatePath( 'licenses/Apache/_header' ) ),
			generator.props,
			generator.tplSettings
		).slice( 0, -1 );

		generator.fs.copyTpl(
			generator.templatePath( 'licenses/Apache/_NOTICE' ),
			generator.destinationPath( 'NOTICE' ),
			generator.props,
			generator.tplSettings
		);
		generator.fs.copy(
			generator.templatePath( 'licenses/Apache/LICENSE' ),
			generator.destinationPath( 'LICENSE' )
		);
	},
	'GPL-2.0+': function ( generator ) {
		generator.props.header = generator.engine(
			generator.fs.read( generator.templatePath( 'licenses/GPLv2/_header' ) ),
			generator.props,
			generator.tplSettings
		).slice( 0, -1 );

		generator.fs.copy(
			generator.templatePath( 'licenses/GPLv2/COPYING' ),
			generator.destinationPath( 'COPYING' )
		);
	},
	'MIT': function ( generator ) {
		generator.props.header = generator.engine(
			generator.fs.read( generator.templatePath( 'licenses/MIT/_header' ) ),
			generator.props,
			generator.tplSettings
		).slice( 0, -1 );

		generator.fs.copyTpl(
			generator.templatePath( 'licenses/MIT/_LICENSE' ),
			generator.destinationPath( 'LICENSE' ),
			generator.props,
			generator.tplSettings
		);
	}
};
