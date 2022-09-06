module.exports = () => {
  const data = {
    products: []
  }

  for (let i = 1; i < 1001; i++) {
    data.products.push({
      id: i,
      price: 70 + i,
      title: `Camiseta ${i}`
    })
  }

  return data;
}