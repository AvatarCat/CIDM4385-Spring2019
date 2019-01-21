const name = "Johnny Rotten";
const element = <h1>Hello, {name}</h1>


ReactDOM.render(
    element,
    document.getElementById('hello')
);


function formatName(name) {
    return user.firstName + ' ' + user.lastName;
}

const user = {
    firstName: 'Don',
    lastName: 'Juan'
};

const elementname = (
    <h1>
        Hello, {formatName(user)};
    </h1>
);

/* const helloroot = document.getElementById('hellofunc');
ReactDOM.render(
    elementname,
    helloroot
); */

function getGreeting(user) {
    if(user) {
        return <h1>Hello, {formatName(user)}!</h1>
    } else {
        return <h1>Hello, Stranger.</h1>
    }
}

const elementgreeting = getGreeting(user);

const greetroot = document.getElementById('hellogreeting');
ReactDOM.render(
    elementgreeting,
    greetroot
)