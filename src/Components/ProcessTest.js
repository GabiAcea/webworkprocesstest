import React from 'react';
import ProcessWorker from '../Workers/ProcessWorker';
import WebWorker from '../Workers/WebWorker';

export default class ProcessTest extends React.PureComponent {
    static defaultProps = {
        power: 5,
        numberOfWorkers: 4
    }
    
    generateColor = () => {
        const rgb = [];
        let color = '';

        for (var i = 0; i < 3; i++) {
            rgb.push(Math.floor(Math.random() * 255));
            color = 'rgb('+ rgb.join(',') +')';
        }

        return color;
    }

    generateWorkers(count) {
        let workersAtRest = 0;

        for (let i = 1; i <= count; i++) {
            const worker = new WebWorker(ProcessWorker)
            worker.postMessage({
                commandId: i,
                title: `Start process ${i}`,
                power: this.props.power,
                color: this.generateColor()
            });

            worker.onmessage = (e) => {
                workersAtRest++;
                console.log(e.data.status);
                if (workersAtRest === this.props.numberOfWorkers) {
                    console.log("Workers terminated");
                    worker.terminate();
                }
            }
        }
    }

    commandWorker = () => {
        this.generateWorkers(this.props.numberOfWorkers);

        for (let i = 0; i < Math.pow(10, this.props.power); i++) {
            console.log(` ${i} main thread`);
        }

        // this.handleWorkersResponse();
    }

    render() {
        return <button onClick={this.commandWorker}>Start process</button>;
    }
}