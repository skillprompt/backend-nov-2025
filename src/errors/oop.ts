// class, object

class LivingThing {
  doesBreathe: boolean;

  canWalk: boolean;

  constructor(doesBreathe: boolean, canWalk: boolean) {
    this.canWalk = canWalk;
    this.doesBreathe = doesBreathe;
  }

  grow() {
    console.log("living thing grow!");
  }
}

class Animal extends LivingThing {
  name: string;
  numOfLegs: number;
  hasTail: boolean;

  constructor(
    name: string,
    numOfLegs: number,
    hasTail: boolean,
    doesBreathe: boolean,
    canWalk: boolean
  ) {
    super(doesBreathe, canWalk);
    this.name = name;
    this.numOfLegs = numOfLegs;
    this.hasTail = hasTail;
  }

  walk: () => void = () => {
    console.log(`${this.name} walk using ${this.numOfLegs} legs.`); // Cat walk using 4 legs
  };
}

const cat = new Animal("cat", 4, true, true, false);
console.log("cat legs", cat.numOfLegs, cat.name);

const dog = new Animal("dog", 4, true, true, false);
dog.walk();

class Plant extends LivingThing {
  makeFood: boolean;

  constructor(makeFood: boolean, doesBreathe: boolean, canWalk: boolean) {
    super(doesBreathe, canWalk);
    this.makeFood = makeFood;
  }
}

const mangoTree = new Plant(true, true, false);

abstract class AbsAnimal {
  name: string;
  numOfLegs: number;

  constructor(name: string, numOfLegs: number) {
    this.name = name;
    this.numOfLegs = numOfLegs;
  }

  abstract makeSound(): void;

  walk: () => void = () => {
    console.log(`${this.name} walk using ${this.numOfLegs} legs.`); // Cat walk using 4 legs
  };
}

class Dog implements AbsAnimal {
  name: string;
  numOfLegs: number;

  constructor(name: string, numOfLegs: number) {
    this.name = name;
    this.numOfLegs = numOfLegs;
  }
  walk() {}

  makeSound(): void {
    console.log("Dog barks");
  }
}

class Cat implements AbsAnimal {
  name: string;
  numOfLegs: number;

  constructor(name: string, numOfLegs: number) {
    this.name = name;
    this.numOfLegs = numOfLegs;
  }

  walk() {}

  makeSound(): void {
    console.log("Dog barks");
  }
}

// notification service

// app.route("/send-message?medium=email", (req, res) => {
//   // const notService = new NotificationService();

//   // notService.sendMessage()

//   if (medium === "email") {
//     const emailService = new EmailService();
//     emailService.sendMessage();
//   } else if (medium == "sms") {
//     const smsService = new SmSService();
//     smsService.sendMessage();
//   }
// });
