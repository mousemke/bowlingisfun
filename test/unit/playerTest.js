/* globals describe, it */
import assert               from 'assert';
import React                from 'react';
import Player                 from '/components/player/Player.jsx';

import { shallow }   from 'enzyme';

const score     = [];
const addScore  = () =>
{

};

const player          = shallow( <Player score={ score }
                                            done={ false }
                                            addScore={ addScore }/> );

describe( 'The Player component', () =>
{
    it( 'should render the Player', () =>
    {
        assert.equal( player.is( '.Player' ), true );
        assert.equal( player.find( 'header' ).length, 1 );
    } );
} );
