# Assumptions and trade-offs

- Sign of operand (eg +x, -x) is not implemented with +- but with functions pos/neg respectively.
```js
// DON'T
+2+(-3)

// DO
pos(2)+neg(3)
```

- Trigonometric functions expect angles in degrees (not in radians)
```js
const ng = 30;

// Native Math.sin
Math.sin(x) // returns sin(30rad), which is -0.9880316240928618

// Implementation with degrees 
sin(x) // returns sin(30 * PI / 180 deg), which is 0.5

```

- Use dot for floating point (not comma)
```js
// DON'T
10,987

// DO
10.987
```

- Spaces in expression are not permitted
