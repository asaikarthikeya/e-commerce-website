import { Request, Response } from 'express';

const products = {
  kitchen: {
    featured: ['f1.png', 'f2.png', 'f3.png'],
    new: ['n1.png', 'n2.png', 'n3.png']
  },
  electronics: {
    featured: ['e1.png', 'e2.png', 'e3.png'],
    new: ['ne1.png', 'ne2.png', 'ne3.png']
  },
  fashion: {
    featured: ['c1.png', 'c2.png', 'c3.png'],
    new: ['nc1.png', 'nc2.png', 'nc3.png']
  }
};

export const getProductsByCategory = (req: Request, res: Response) => {
  const category = req.params.category as keyof typeof products;

  if (!products[category]) {
    return res.status(404).json({ error: 'Category not found' });
  }

  return res.json(products[category]);
};
