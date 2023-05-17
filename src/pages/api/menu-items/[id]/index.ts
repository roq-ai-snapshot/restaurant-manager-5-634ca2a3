import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getMenu_items();
    case 'PUT':
      return updateMenu_items();
    case 'DELETE':
      return deleteMenu_items();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getMenu_items() {
    const data = await prisma.menu_items.findFirst({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }

  async function updateMenu_items() {
    const data = await prisma.menu_items.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(data);
  }
  async function deleteMenu_items() {
    const data = await prisma.menu_items.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}