/* globals describe, it */
import assert           from 'assert';
import React            from 'react';
import App              from '/components/App.jsx';

import { shallow }      from 'enzyme';

const app       = shallow( <App /> );

describe( 'The App component', () =>
{
    it( 'should render the app wrapper', () =>
    {
        assert.equal( app.is( '.AppWrapper' ), true );
    } );


    it( 'should show a fish', () =>
    {
        assert.equal( app.find( '.fish' ).length, 1 );
    } );
} );
