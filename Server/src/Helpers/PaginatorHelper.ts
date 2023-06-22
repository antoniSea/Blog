import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const paginate = async (req, modelName, perPage) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || perPage;
  const offset = (page - 1) * limit;

  const data = await prisma[modelName].findMany({
    take: limit,
    skip: offset,
    include: {
      author: true,
    },
  });

  return {
    links: {
      currentPage: page,
      perPage: limit,
      from: offset,
      to: offset + limit,
      nextPageLink: `http://localhost:3000/${modelName}?page=${page + 1}&limit=${limit}`,
      prevPageLink: `http://localhost:3000/${modelName}?page=${page - 1}&limit=${limit}`,
    },
    data: data,
  }
};

export default {
  paginate,
};
