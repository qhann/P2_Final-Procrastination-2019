import React, { Component } from "react";
import CountUp from 'react-countup';

class Night extends Component {

    state= {}

    setYearCounter(callBack) {
        // let options = {
        //     duration: 3 
        // }
        // let yearsCounter = new CountUp('new-year-count', 0, 25);
        // this.setState({ yearsCounter }, callBack)
    }
    
    componentDidUpdate(prevProps) {
        if (this.props.nightFall && !this.state.firstNightOver) this.setState({firstNightOver: true})
        if (this.props.nightFall != prevProps.nightFall) this.setState({dayCount: ~~((this.props.time-10) / (12*60)) + 2})

        // let days = 2 + ~~(this.props.time / (60 * 12))
    
        // if (days > 3 && !this.state.yearsCounter) {
        //     this.setYearCounter(() => {
        //         if (!this.state.yearsCounter.error) {
        //             this.state.yearsCounter.start();
        //         } else {
        //             console.error(this.state.yearsCounter.error);
        //         }
        //     })
        // }

    }

    render() {
        const { nightFall, time } = this.props
        let firstNightOver = this.state.firstNightOver
        let days

        if (time % (12*60) - 12*60 == -1) {
            // if sleep because falling asleep
            days = 1 + ~~((time+1) / (60 * 12))
        } else {
            //if going to sleep
            days = ~~((time-10) / (12*60)) + 2
            days = firstNightOver ? days : days - 1
        }

        // let fadeOut = days == 1 ? " night-first" : 
        let nightClasses = "night" + (nightFall ? " night-fall" : firstNightOver ? " night-end" : " night-first")
        let easingFn = (t, b, c, d) => {
            return c * Math.sin(t/d * (Math.PI/2)) + b;
        };

        return (
            <div className={nightClasses}>
                <div className={"new-day-wrapper"}>
                    <p className={"new-day-label"}>
                        {days <= 3 ? "Tag " : "Jahr "}
                    </p>
                    {time <= 2*12*60+10 ? <p className={"new-day-count"}>
                        {this.state.dayCount || days}
                    </p> : null}
                    {this.state.dayCount >= 4 && firstNightOver ? <CountUp delay={0.5} start={2019} end={2044} duration={3} easingFn={easingFn}/> : null}
                </div>
            </div>
        );
    }
}

export default Night;
