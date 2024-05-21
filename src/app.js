const name = 'gustavo'

const person = {
    name:'antonio',
    Hablar () {
        console.log(person.name)
    }
}

const person1 = {
    name: 'antonio',
    Hablar() {
        console.log(person.name);
    }
};

const person2 = {
    name: 'maria',
    Hablar() {
        console.log(person.name);
    }
};

person.Hablar()
person1.Hablar(); // salida: antonio
person2.Hablar(); // salida: maria