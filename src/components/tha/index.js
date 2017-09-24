import React from 'react';
import {socketConnect} from './api';
import './assets/css/counter.css'

export default class TwitCounter extends React.Component {
    constructor() {
        super();

        //init
        this.state = {
            tw_count_: 0,
            tw_avg_: 0,
            tw_tag_: ''
        };

        let hashTag = window.location.pathname;

        if (hashTag === '/') {
            alert('Please re-open page with an hashtag in end of URL.')
            return;
        } else{
            hashTag = hashTag.substring(1, 32);
        }

        socketConnect((data) => {
            this.setState({tw_count_: this.state.tw_count_ + 1})
            document.getElementsByClassName('tw_shared_value')[0].innerHTML = this.state.tw_count_;
            document.getElementsByClassName('tw_hashtag_')[0].innerHTML = '#' + hashTag;

            let texOut = document.getElementsByClassName('tw_texts_')[0];
            texOut.innerHTML =  data.message;
        });

        setInterval(() => {
            let avg = this.state.tw_count_ - this.state.tw_avg_;
            this.setState({tw_avg_: avg})
            document.getElementsByClassName('tw_hashtag_')[0].innerHTML = '#' + hashTag;
        },1000)
    }

    render() {
        return (
            <div className="container">
                <div className="tw_hashtag_" />
                <div className="tw_shared_">
                    <div className="tw_shared_value">0</div>
                    <div className="tw_shared_title">Twitts shared</div>
                </div>
                <div className="tw_texts_"> </div>
            </div>
        )
    }
}
