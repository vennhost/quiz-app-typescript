import { RouteProps } from 'react-router';
import React, {useState} from 'react';
import Countdown from 'react-countdown';
import { Link, useParams } from 'react-router-dom';
import { type } from 'node:os';
import {Style, Wrapper} from "./Failure.styles"
import { truncate } from 'node:fs';

type ParamProps = {
    score: string;
    match: any;
}

export default class Success extends React.Component<ParamProps & RouteProps> {
   
       state = { 

         };
   
    render() {
        const userScore = this.props.match.params.score
        return (
            <>
            <Style/>
            <Wrapper>
             <h1>CONGRATULATIONS!!! YOU PASS YOUR QUIZ</h1>
           <p className="score">You have been awesome, your score is {userScore * 100 / 10}%</p> 
            <Link to="/"><button className="next">Try Again</button></Link>
            <Link to="/"><button className="next">Print Certificate</button></Link>
            </Wrapper>
            </> 
        );
    }
}

