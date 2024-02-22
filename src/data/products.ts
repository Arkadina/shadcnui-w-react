interface GetProductsFilter {
  id: string | null;
  name: string | null;
}

export async function getProducts({ id, name }: GetProductsFilter) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  let products = [
    { id: "1", name: "Produto1", price: 56.78 },
    { id: "2", name: "Produto2", price: 23.45 },
    { id: "3", name: "Produto3", price: 78.91 },
    { id: "4", name: "Produto4", price: 34.67 },
    { id: "5", name: "Produto5", price: 45.12 },
    { id: "6", name: "Produto6", price: 67.89 },
    { id: "7", name: "Produto7", price: 12.34 },
    { id: "8", name: "Produto8", price: 89.56 },
    { id: "9", name: "Produto9", price: 21.78 },
    { id: "10", name: "Produto10", price: 56.23 },
    { id: "11", name: "Produto11", price: 34.89 },
    { id: "12", name: "Produto12", price: 67.45 },
    { id: "13", name: "Produto13", price: 43.21 },
    { id: "14", name: "Produto14", price: 78.9 },
    { id: "15", name: "Produto15", price: 32.56 },
    { id: "16", name: "Produto16", price: 54.78 },
    { id: "17", name: "Produto17", price: 76.89 },
    { id: "18", name: "Produto18", price: 23.45 },
    { id: "19", name: "Produto19", price: 45.67 },
    { id: "20", name: "Produto20", price: 89.12 },
  ];

  if (id) {
    products = products.filter((product) => product.id.includes(id));
  }

  if (name) {
    products = products.filter((product) => product.name.includes(name));
  }

  return products;
}

interface CreateProductRequest {
  name: string;
  price: number;
}

export async function createProduct(data: CreateProductRequest) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return;
}
