import { z } from 'zod';

export const FlightLegSchema = z.object({
  origin: z.string().min(3, { message: 'Please enter a valid origin' }),
  destination: z.string().min(3, { message: 'Please enter a valid destination' }),
  departureDate: z.date({ required_error: 'A departure date is required.' }),
});
export type FlightLeg = z.infer<typeof FlightLegSchema>;

export const SearchFlightsBaseSchema = z.object({
  tripType: z.enum(['one-way', 'return', 'multi-city']).default('return'),
  legs: z.array(FlightLegSchema).min(1),
  returnDate: z.date().optional(),
  adults: z.coerce.number().int().min(1, 'At least one adult is required.'),
  children: z.coerce.number().int().min(0).optional(),
  infants: z.coerce.number().int().min(0).optional(),
  cabinClass: z.enum(['economy', 'premium-economy', 'business', 'first']).default('economy'),
});

export const SearchFlightsInputSchema = SearchFlightsBaseSchema.refine(data => {
    if (data.tripType === 'return') {
      return !!data.returnDate;
    }
    return true;
  }, {
    message: 'Return date is required for a return trip.',
    path: ['returnDate'],
  });

export type SearchFlightsInput = z.infer<typeof SearchFlightsInputSchema>;

export const FlightSchema = z.object({
    airline: z.string().describe("The name of the airline."),
    flightNumber: z.string().describe("The flight number."),
    origin: z.string().describe("The origin airport code."),
    destination: z.string().describe("The destination airport code."),
    departureTime: z.string().describe("The departure time (e.g., '08:30')."),
    arrivalTime: z.string().describe("The arrival time (e.g., '14:45')."),
});

export const SearchFlightsOutputSchema = z.object({
  flights: z.array(FlightSchema).describe('A list of available flights.'),
});
export type SearchFlightsOutput = z.infer<typeof SearchFlightsOutputSchema>;
