/* globals clearTimeout, setTimeout */
import React, { Component } from 'react';

import './Player.css';


/**
 * ## Player
 *
 * contains the player info and score
 */
export default class Player extends Component
{
    /**
     * ## constructor
     *
     * sets the inital state
     *
     * @return {Void} void
     */
    constructor()
    {
        super();

        this.prepAddScore   = this.prepAddScore.bind( this );
        this.checkEnter     = this.checkEnter.bind( this );
        this.randomScore    = this.randomScore.bind( this )

        this.state = {};
    }


    /**
     * ## checkEnter
     *
     * runs the add score function if the user has hit enter
     *
     * @param {Object} e event object
     *
     * @return {Void} void
     */
    checkEnter( e )
    {
        clearTimeout( this.errorTimeout );
        this.refs.scoreInput.classList.remove( 'js-visible-error' );

        if ( e.charCode === 13 )
        {
            this.prepAddScore( e );
        }
    }


    /**
     * ## prepAddScore
     *
     * prepares the change object to give back to the app
     *
     * @param {Object} e event object
     *
     * @return {Void} void
     */
    prepAddScore()
    {
        const scoreInput    = this.refs.scoreInput;
        const value         = parseInt( scoreInput.value );

        if ( Number.isNaN( value ) || value > 10 )
        {
            scoreInput.classList.add( 'player__score-error' );
            scoreInput.value = '';

            this.errorTimeout = setTimeout( () =>
            {
                scoreInput.classList.remove( 'player__score-error' );
            }, 3500 );

            scoreInput.focus();
        }
        else
        {
            this.props.addScore( {
                value   : value,
                player  : this.props.index,
                self    : this
            } );
        }
    }


    /**
     * ## randomScore
     *
     * adds a random score
     *
     * @return {Void} void
     */
    randomScore()
    {
        const ball = Math.ceil( Math.random() * 10 );

        this.refs.scoreInput.value = ball;

        this.prepAddScore();
    }


    /**
     * ## render
     *
     * renders the player score
     *
     * @return {JSX} compiled jsx
     */
    render()
    {
        const { index, score, total, done }     = this.props;

        return (
            <div ref="self" className="Player">
                <header>
                    <h2>Player { index + 1 }
                    </h2>
                    <h3>
                    {
                        total
                    }
                    </h3>
                </header>
                <div className="player__score-chart">
                    {
                        score.map( ( frame, i ) =>
                        {
                            return <div key={ i }
                                className={ `player__frame
                                                player__frame-${i + 1}` }>
                                    <span  className="player__frame-index">
                                    {
                                        `Frame ${i + 1}`
                                    }
                                    </span>
                                    <span  className="player__frame-score">
                                    {
                                        frame.map( ( ball, j ) =>
                                        {
                                            return (
                                            <span
                                                key={ j }
                                                className="player__frame-ball">

                                                {
                                                    ball
                                                }
                                            </span>
                                            );
                                        } )
                                    }
                                    </span>
                                </div>;
                        } )
                    }
                    {
                        done ? null : <input className="player__score-input"
                                    ref="scoreInput"
                                    onKeyPress={ this.checkEnter }/>
                    }
                    {
                        done ? null : <button className="player__score-submit"
                                value={ index }
                                onClick={ this.prepAddScore }>
                                Submit Round Score
                            </button>
                    }
                    {
                        done ? null : <button className="player__score-random"
                                value={ index }
                                onClick={ this.randomScore }>
                                Random Score
                            </button>
                    }
                </div>
            </div>
        );
    }
}


Player.propTypes = {
    index       : React.PropTypes.number,
    score       : React.PropTypes.array,
    total       : React.PropTypes.number,
    done        : React.PropTypes.bool,
    addScore    : React.PropTypes.func
};
