import prisma from '../config/db';

const getAllQueryLogs = async () => {
  return await prisma.queryLog.findMany();
};

const createQueryLog = async (userName: string, query: string, response: string) => {
  return await prisma.queryLog.create({
    data: {
      userName,
      query,
      response,
    },
  });
};

export default {
  getAllQueryLogs,
  createQueryLog,
};
