<?php
/**
<%= header %>
 *
 * @file
 * @author <%= author_name %> <<%= author_email %>>
 */

namespace <%= name %>\Test;

use <%= name %>\<%= name %>;

/**
 * @covers <%= name %>\<%= name %>
 */
class <%= name %>Test extends \PHPUnit_Framework_TestCase {

	public function testCaseProvider() {
		return array(
			array( true ),
			array( 1 ),
			array( 'yes' ),
		);
	}

	/** @dataProvider testCaseProvider */
	public function test<%= name %>Method( $someValue ) {
		$this->assertNotNull( $someValue );
	}
}
