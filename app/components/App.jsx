import './App.css';

import React, { Component } from 'react';
import Player               from '/components/player/Player.jsx';

/**
 * ## App
 *
 * app wrapper around the site
 */
export default class App extends Component
{
    /**
     * # add Player
     *
     * adds a player to the game
     *
     * @param {Object} e event object
     *
     * @return {Void} void
     */
    addPlayer()
    {
        const players = this.state.players;

        players.push( {
            score   : [],
            total   : 0,
            strike  : [],
            spare   : [],
            done    : false
        } );

        this.setState( {
            players
        } );
    }


    /**
     * ## addScore
     *
     * uses the change object to adjust the score.  should be multiple smaller
     * functions but time
     *
     * @param {Object} change parameters to change from the player
     *
     * @return {Void} void
     */
    addScore( change )
    {
        const players       = this.state.players;
        const player        = players[ change.player ];
        const score         = player.score;

        let frame           = score.length;
        const strike         = player.strike;
        const spare          = player.spare;
        let round           = score[ score.length - 1 ];

        const value         = change.value;

        if ( strike.length !== 0 )
        {
            player.strike = strike.map( s =>
            {
                player.total += value;

                return s.slice( 1 );
            } ).filter( s => s.length !== 0 );
        }

        if ( spare.length )
        {
            player.spare = spare.map( s =>
            {
                player.total += value;

                return s.slice( 1 );
            } );

            player.spare = player.spare.filter( s => s.length !== 0 );
        }

        if ( !round ||
                ( round.length === 2 || round[ 0 ] === 'X' ) && frame !== 10  )
        {
            score.push( [] );
            frame = score.length;
            round = score[ frame - 1 ];
        }

        const firstRound  = frame === 10  && round[ 1 ] ? 0 : round[ 0 ];

        if ( value === 10 && ( !firstRound || frame === 10 ) )
        {
            round.push( 'X' );

            if ( frame !== 10 )
            {
                player.strike.push( [ true, true ] );
            }
        }
        else if ( value + firstRound >= 10 )
        {
            round.push( '/' );
            player.spare.push( [ true ] );
        }
        else
        {
            round.push( value );
        }

        player.done = round.length === 3 ||
                                frame === 10 && typeof round[ 1 ] === 'number';

        player.total += value;
        change.self.refs.scoreInput.value = '';

        this.setState( {
            players
        } );
    }


    /**
     * ## constructor
     *
     * @return {Void} void
     */
    constructor()
    {
        super();

        this.addScore = this.addScore.bind( this );
        this.addPlayer = this.addPlayer.bind( this );

        this.state = {
            players : [
                {
                    score   : [],
                    total   : 0,
                    strike  : [],
                    spare   : []
                }
            ]
        };
    }


    /**
     * ## render
     *
     * renders the App. has a fish.
     *
     * @return {JSX} compiled jsx
     */
    render()
    {
        const state     = this.state;
        const players    = state.players;

        return (
            <div className="AppWrapper">
                <button className="app__add-player" onClick={ this.addPlayer }>
                    Add Player
                </button>
                <div ref="fishWrapper" className="fishWrapper">
                    <div ref="fish" className="fish"></div>
                </div>
                {
                    players.map( ( player, i ) =>
                    {
                        return <Player { ...player }
                                        index={ i }
                                        addScore={ this.addScore }
                                        key={ i } />;
                    } )
                }
            </div>
        );
    }
}
