import prisma from '../config/db';

const createQueryLog = async (userName: string, query: string, response: string) => {
  return await prisma.queryLog.create({
    data: { userName, query, response },
  });
};

const getAllQueryLogs = async () => {
  return await prisma.queryLog.findMany();
};

const deleteQueryLogById = async (id: number) => {
  return await prisma.queryLog.delete({
    where: { id },
  });
};

const deleteAllQueryLogs = async () => {
  await prisma.queryLog.deleteMany({});
};

export default {
  getAllQueryLogs,
  createQueryLog,
  deleteQueryLogById,
  deleteAllQueryLogs,
};
