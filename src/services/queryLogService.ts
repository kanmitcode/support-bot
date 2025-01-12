import prisma from '../config/db';

const createQueryLog = async (userName: string, query: string, response: string) => {
  return await prisma.queryLog.create({
    data: {
      userName,
      query,
      response,
    },
  });
};

const getAllQueryLogs = async () => {
  return await prisma.queryLog.findMany();
};

export default {
  getAllQueryLogs,
  createQueryLog,
};
