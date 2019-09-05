export default () => {
    self.addEventListener('message', e => { // eslint-disable-line no-restricted-globals
        for (let i = 0; i < Math.pow(10, e.data.power); i++) {
            console.log(`%c ${i} worker ${e.data.commandId} thread!`, `color: ${e.data.color}`);
        }

        postMessage({
            status: `Process ${e.data.commandId} finished`,
            data: []
        });
    })
}