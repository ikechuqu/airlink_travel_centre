'use server';

/**
 * @fileOverview A flow for searching flights.
 *
 * - searchFlightsFlow - A function that searches for flights based on user input.
 */

import { ai } from '@/ai/genkit';
import { SearchFlightsOutputSchema, FlightSchema, SearchFlightsBaseSchema } from '@/app/actions';
import { z } from 'zod';
import { format } from 'date-fns';

const MockFlightDetailsSchema = z.object({
  airline: z.string(),
  flightNumberPrefix: z.string(),
  origin: z.string(),
  destination: z.string(),
});

const mockAirlines: z.infer<typeof MockFlightDetailsSchema>[] = [
    { airline: 'Air Peace', flightNumberPrefix: 'P4', origin: 'LOS', destination: 'ABV' },
    { airline: 'British Airways', flightNumberPrefix: 'BA', origin: 'LHR', destination: 'JFK' },
    { airline: 'Emirates', flightNumberPrefix: 'EK', origin: 'DXB', destination: 'LHR' },
    { airline: 'Qatar Airways', flightNumberPrefix: 'QR', origin: 'DOH', destination: 'CDG' },
    { airline: 'United Airlines', flightNumberPrefix: 'UA', origin: 'SFO', destination: 'NRT' },
];


function generateMockFlight(origin: string, destination: string): z.infer<typeof FlightSchema> {
    const randomAirline = mockAirlines[Math.floor(Math.random() * mockAirlines.length)];
    const flightNumber = `${randomAirline.flightNumberPrefix}${Math.floor(100 + Math.random() * 900)}`;
    
    const departureHour = Math.floor(Math.random() * 24);
    const departureMinute = Math.floor(Math.random() * 60);
    const arrivalHour = (departureHour + Math.floor(Math.random() * 8) + 2) % 24;
    const arrivalMinute = Math.floor(Math.random() * 60);

    return {
        airline: randomAirline.airline,
        flightNumber: flightNumber,
        origin: origin,
        destination: destination,
        departureTime: `${String(departureHour).padStart(2, '0')}:${String(departureMinute).padStart(2, '0')}`,
        arrivalTime: `${String(arrivalHour).padStart(2, '0')}:${String(arrivalMinute).padStart(2, '0')}`,
    };
}


/**
 * This is a placeholder function. In a real application, this function would
 * call a third-party flight booking API (e.g., Skyscanner, Amadeus) to get
 * real flight data. For now, it returns mock data.
 */
async function getFlightDataFromApi(input: z.infer<typeof SearchFlightsInputSchema>) {
  console.log("Searching for flights with (mock) API for:", input);
  
  const allFlights: z.infer<typeof FlightSchema>[] = [];
  
  input.legs.forEach(leg => {
    const numberOfFlightsForLeg = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < numberOfFlightsForLeg; i++) {
        allFlights.push(generateMockFlight(leg.origin, leg.destination));
    }
  });

  // If it's a return trip, add mock flights for the return leg
  if (input.tripType === 'return' && input.legs.length > 0) {
    const returnLeg = {
        origin: input.legs[0].destination,
        destination: input.legs[0].origin,
    };
    const numberOfFlightsForLeg = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < numberOfFlightsForLeg; i++) {
        allFlights.push(generateMockFlight(returnLeg.origin, returnLeg.destination));
    }
  }

  return {
    flights: allFlights
  };
}

const SearchFlightsInputSchema = SearchFlightsBaseSchema.extend({
    legs: z.array(z.object({
        origin: z.string(),
        destination: z.string(),
        departureDate: z.string(),
    })),
    returnDate: z.string().optional(),
});


export const searchFlightsFlow = ai.defineFlow(
  {
    name: 'searchFlightsFlow',
    inputSchema: SearchFlightsInputSchema,
    outputSchema: SearchFlightsOutputSchema,
  },
  async (input) => {
    const flightResults = await getFlightDataFromApi(input);
    
    if (!flightResults.flights.length) {
        return { flights: [] };
    }

    return flightResults;
  }
);
