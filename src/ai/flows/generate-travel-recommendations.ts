'use server';

/**
 * @fileOverview AI-powered travel recommendation generator.
 *
 * - generateTravelRecommendations - A function that generates personalized travel recommendations.
 * - GenerateTravelRecommendationsInput - The input type for the generateTravelRecommendations function.
 * - GenerateTravelRecommendationsOutput - The return type for the generateTravelRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTravelRecommendationsInputSchema = z.object({
  destinationDetails: z
    .string()
    .describe('Detailed information about the destination.'),
  trendingInterests: z
    .string()
    .describe('Trending interests of the user or current popular trends.'),
});
export type GenerateTravelRecommendationsInput = z.infer<
  typeof GenerateTravelRecommendationsInputSchema
>;

const GenerateTravelRecommendationsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe('Personalized travel recommendations based on the destination details and trending interests.'),
});
export type GenerateTravelRecommendationsOutput = z.infer<
  typeof GenerateTravelRecommendationsOutputSchema
>;

export async function generateTravelRecommendations(
  input: GenerateTravelRecommendationsInput
): Promise<GenerateTravelRecommendationsOutput> {
  return generateTravelRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTravelRecommendationsPrompt',
  input: {schema: GenerateTravelRecommendationsInputSchema},
  output: {schema: GenerateTravelRecommendationsOutputSchema},
  prompt: `You are a travel expert providing personalized travel recommendations.

  Based on the following destination details and trending interests, generate relevant tour and activity recommendations.

  Destination Details: {{{destinationDetails}}}
  Trending Interests: {{{trendingInterests}}}

  Provide specific and actionable recommendations that users can easily explore and book.
  Consider a variety of activities, tours and attractions that might be relevant. Format the output as a list of suggestions.`,
});

const generateTravelRecommendationsFlow = ai.defineFlow(
  {
    name: 'generateTravelRecommendationsFlow',
    inputSchema: GenerateTravelRecommendationsInputSchema,
    outputSchema: GenerateTravelRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
