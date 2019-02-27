console.log('Starting App.');

// Node provides setTimeout.
// Takes 2 Arguments: a Callback Function, and delay in milliseconds.
setTimeout(() => {
    console.log('Inside of callback.');
}, 2000);

setTimeout(() => {
    console.log('No Delay.')
}, 0);

console.log('Finishing Up.');