'use server';

import {
  generateTravelRecommendations,
  type GenerateTravelRecommendationsInput,
  type GenerateTravelRecommendationsOutput
} from '@/ai/flows/generate-travel-recommendations';
import { searchFlightsFlow } from '@/ai/flows/search-flights-flow';
import type { SearchFlightsInput, SearchFlightsOutput } from '@/app/actions';
import { format } from 'date-fns';

export async function runGenerateTravelRecommendations(
  input: GenerateTravelRecommendationsInput
): Promise<GenerateTravelRecommendationsOutput> {
  return await generateTravelRecommendations(input);
}

export async function searchFlights(
  input: SearchFlightsInput
): Promise<SearchFlightsOutput> {
  const formattedInput = {
    ...input,
    legs: input.legs.map(leg => ({
      ...leg,
      departureDate: format(leg.departureDate, 'yyyy-MM-dd'),
    })),
    returnDate: input.returnDate ? format(input.returnDate, 'yyyy-MM-dd') : undefined,
  };
  return await searchFlightsFlow(formattedInput);
}
