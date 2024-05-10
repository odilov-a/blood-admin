function gen4() {
  return Math.random()
    .toString(16)
    .slice(-4);
}

export { gen4 }