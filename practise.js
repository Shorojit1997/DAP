

let sleeping = (i) => new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("Yes ->",i);
       return resolve();
    }, 1000);
})

const hello = async () => {
    for (let i = 0; i < 10; i++) {
        await sleeping(i);
    }
}
hello();