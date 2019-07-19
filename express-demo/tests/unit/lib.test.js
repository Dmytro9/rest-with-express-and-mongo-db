const lib = require('../../forTests/lib');
const db = require('../../forTests/db');
const mail = require('../../forTests/mail');
const {
  User
} = require('../../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');


// Testing numbers
describe('absolute', () => {
  it('should return a positive number if input is positive', () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });

  it('should return a positive number if input is negative', () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });

  it('should return 0 if input is 0', () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});

// Testing strings
describe('greet', () => {
  it('should return the greeting message', () => {
    const result = lib.greet('Dima');
    expect(result).toMatch(/Dima/);
    expect(result).toContain('Dima');
  });
});

// Testing arrays
describe('getCurrencies', () => {
  it('should return supported currencies', () => {
    const result = lib.getCurrencies();

    // Too general
    expect(result).toBeDefined();
    expect(result).not.toBeNull()

    // Too specific
    expect(result[0]).toBe('USD');
    expect(result[1]).toBe('AUD');
    expect(result[2]).toBe('EUR');
    expect(result.length).toBe(3);

    // Proper way
    expect(result).toContain('USD');
    expect(result).toContain('AUD');

    // Ideal way
    expect(result).toEqual(expect.arrayContaining(['USD', 'AUD', 'EUR']))
  });
});

// Testing objects
describe('getProduct', () => {
  it('should return the product with the given id', () => {
    const result = lib.getProduct(1);

    // expect(result).toEqual({
    //   id: 1,
    //   price: 10
    // });

    expect(result).toMatchObject({
      id: 1,
      price: 10
    });

    expect(result).toHaveProperty('id', 1)
  });
});

// Testing exceptions
describe('registerUser', () => {
  it('should throw if username is falsy', () => {
    // Null
    // undefined
    // NaN
    // ''
    // 0
    // false

    const args = [null, undefined, NaN, '', 0, false];
    args.forEach(a => {
      expect(() => {
        lib.registerUser(a)
      }).toThrow();
    });
  });

  it('should return a user object if valid username is passed', () => {
    const result = lib.registerUser('Dima');
    expect(result).toMatchObject({
      username: 'Dima'
    });
    expect(result).toHaveProperty('username', 'Dima');
    expect(result.id).toBeGreaterThan(0);
  });
});

// Testing exercise
describe('fizzBuzz', () => {
  it('should throw if input is NaN', () => {
    const args = [{}, undefined, 'a', null];
    args.forEach(a => {
      expect(() => {
        lib.fizzBuzz(a)
      }).toThrow();
    });
  });

  it('should return a FizzBuzz if ((input % 3 === 0) && (input % 5) === 0)', () => {
    const result = lib.fizzBuzz(15);
    expect(result).toBe('FizzBuzz');
  });

  it('should return a Fizz if (input % 3 === 0)', () => {
    const result = lib.fizzBuzz(3);
    expect(result).toBe('Fizz');
  });

  it('should return a Buzz if (input % 5 === 0)', () => {
    const result = lib.fizzBuzz(5);
    expect(result).toBe('Buzz');
  });

  it('should return a number if input is number and if (!(input % 3 === 0) && / || (input % 5) === 0)', () => {
    const result = lib.fizzBuzz(1);
    expect(result).toBe(1);
  });
});


// Testing with custom mock fn
describe('applyDiscount', () => {
  it('should apply 10% discount if customer has more than 10 points', () => {
    db.getCustomerSync = function (customerId) {
      console.log('Fake reading customer...');
      return {
        id: customerId,
        points: 20
      };
    };

    const order = {
      customerId: 1,
      totalPrice: 10
    };

    lib.applyDiscount(order);

    expect(order.totalPrice).toBe(9);
  });
});


// Testing with custom mock fn
describe('applyDiscount', () => {
  it('should send an email to the customer', () => {
    db.getCustomerSync = function (customerId) {
      return {
        email: 'email',
      };
    };

    let mailSent = false;
    mail.send = function () {
      mailSent = true
    };

    lib.notifyCustomer({
      customerId: 1
    });

    expect(mailSent).toBe(true);
  });
});


// Testing with jest mock fn
describe('applyDiscount', () => {
  it('should send an email to the customer', () => {

    // const mockFunction = jest.fn();
    // mockFunction.mockReturnValue(1);
    // mockFunction.mockResolvedValue(1);
    // mockFunction.mockRejectedValue(new Error('...'));
    // const result = mockFunction();
    // const result = await mockFunction();

    db.getCustomerSync = jest.fn().mockReturnValue({
      email: 'email',
    });
    mail.send = jest.fn();

    lib.notifyCustomer({
      customerId: 1
    });

    expect(mail.send).toHaveBeenCalled();

    expect(mail.send).toHaveBeenCalledWith('email', 'Your order was placed successfully');

    expect(mail.send.mock.calls[0][0]).toBe('email');
    expect(mail.send.mock.calls[0][1]).toMatch(/order/);
  });
});


// Test generateAuthToken fn
describe('user.generateAuthToken', () => {
  it('should return a valid JWT', () => {
    const payload = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      isAdmin: true
    }
    const user = new User(payload);
    const token = user.generateAuthToken();
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    expect(decoded).toMatchObject(payload);
  });
});