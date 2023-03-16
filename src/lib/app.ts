const MathUtils = {
  // map number x from range [a, b] to [c, d]
  map: (x:number, a:number, b:number, c:number, d:number) => ((x - a) * (d - c)) / (b - a) + c,
  // linear interpolation
  lerp: (a:number, b:number, n:number) => (1 - n) * a + n * b
}


