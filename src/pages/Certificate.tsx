import { RouteProps } from 'react-router';
import React, {useState} from 'react';
import Countdown from 'react-countdown';
import { Link, useParams } from 'react-router-dom';
import { type } from 'node:os';
import {Style, Wrapper} from "./Failure.styles"
import ReactToPdf from "react-to-pdf";
import { truncate } from 'node:fs';

type ParamProps = {
    score: string;
    match: any;
}

type PdfProps = {
    toPdf: string;
    targetRef: any;

}

export default class Certificate extends React.Component<PdfProps & ParamProps & RouteProps> {
   
       state = { 

         };
   
    render() {
        const userScore = this.props.match.params.score
      
        return (
            <>
            <Style/>
            <Wrapper>
            <div className="App">
            <ReactToPdf>
                {({toPdf, targetRef}: any | void) =>  (
                    <div style={{width: 500, height: 500, background: 'red'}} onClick={toPdf} ref={targetRef}/>
                )}
            </ReactToPdf>
            <div>
                <h1>Hello CodeSandbox</h1>
                <h2>Start editing to see some magic happen!</h2>
            </div>
            </div>
           
            <Link to="/"><button className="next">Print Certificate</button></Link>
            </Wrapper>
            </> 
        );
    }
}

