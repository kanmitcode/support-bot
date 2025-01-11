import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: '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' });

export const getAIResponse = async (query: string): Promise<string> => {
    const response = await openai.completions.create({
        model: "text-davinci-003",
        prompt: `Provide an answer for the following query:\n${query}`,
        max_tokens: 100,
    });
    const modelResponse = response.choices[0].text.trim() || "Sorry, I couldn't answer that.";
    console.log(modelResponse);
    return modelResponse;
};
