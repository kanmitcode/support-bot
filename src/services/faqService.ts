import prisma from '../config/db';

const createFAQ = async ({ question, answer }: { question: string; answer: string }) => {
  const newFAQ = await prisma.fAQ.create({
    data: {
      question,
      answer,
    },
  });
  return newFAQ;
};

const getAllFAQs = async () => {
  return await prisma.fAQ.findMany();
};

const getFAQById = async (id: number) => {
  return await prisma.fAQ.findUnique({
    where: { id },
  });
};

const updateFAQ = async (id: number, { question, answer }: { question: string; answer: string }) => {
  const updatedFAQ = await prisma.fAQ.update({
    where: { id },
    data: { question, answer },
  });
  return updatedFAQ;
};

const deleteFAQById = async (id: number) => {
  const deletedFAQ = await prisma.fAQ.delete({
    where: { id },
  });
  return deletedFAQ;
};

const deleteAllFAQs = async () => {
  await prisma.fAQ.deleteMany({});
};

export default {
  getAllFAQs,
  getFAQById,
  createFAQ,
  updateFAQ,
  deleteFAQById,
  deleteAllFAQs,
};
