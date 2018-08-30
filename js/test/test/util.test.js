let add = require('../util.js')

test('adds 1 + 2 to equal 3', () => {
  expect(add(1, 2)).toBe(3);
});

test('두 객체를 toEqual matcher를 이용해 비교한다', () => {
  let obj = {'a': 1, 'b': 2}
  expect(obj).toEqual({'a': 1, 'b': 2});
})

test('not을 사용한다', () => {
  let obj = {'a': 1, 'b': 2}
  expect(obj).not.toEqual({'a': 1, 'b': 3});
})

test('null', () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});

function execCallback(callback){
  callback('mando');
}

test.only('mock test', () => {
  let mockCallback = jest.fn();
  execCallback(mockCallback);

  expect(mockCallback.mock.calls.length).toBe(1);
  expect(mockCallback.mock.calls[0][0]).toBe('mando');
})