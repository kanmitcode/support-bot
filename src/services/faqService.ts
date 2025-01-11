import prisma from '../config/db';

const getAllFAQs = async () => {
  return await prisma.fAQ.findMany();
};

const getFAQById = async (id: number) => {
  return await prisma.fAQ.findUnique({
    where: {
      id: id,
    },
  });
};

const createFAQ = async ({ question, answer }: { question: string, answer: string }) => {
    try {
      const newFAQ = await prisma.fAQ.create({
        data: {
          question,
          answer,
        },
      });
      return newFAQ;
    } catch (error) {
      console.error('Error creating FAQ in service:', error);
      throw new Error('Failed to create FAQ');
    }
};

export default {
  getAllFAQs,
  getFAQById,
  createFAQ,
};
