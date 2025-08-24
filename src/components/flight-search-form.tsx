'use client';

import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format, addDays } from 'date-fns';
import { Calendar as CalendarIcon, Loader2, ArrowRight, X, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { searchFlights } from '@/app/server-actions';
import type { SearchFlightsOutput } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SearchFlightsInputSchema } from '@/app/actions';

type SearchFormData = z.infer<typeof SearchFlightsInputSchema>;

export default function FlightSearchForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchFlightsOutput | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const form = useForm<SearchFormData>({
    resolver: zodResolver(SearchFlightsInputSchema),
    defaultValues: {
      adults: 1,
      children: 0,
      infants: 0,
      tripType: 'return',
      legs: [
        { origin: '', destination: '' },
      ],
      cabinClass: 'economy',
    },
  });

  useEffect(() => {
    setIsMounted(true);
    // Set date-based defaults after mounting to avoid hydration mismatch
    form.reset({
      ...form.getValues(),
      legs: [
        { origin: '', destination: '', departureDate: new Date() },
      ],
      returnDate: addDays(new Date(), 7),
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'legs',
  });

  const tripType = form.watch('tripType');
  
  useEffect(() => {
    if (!isMounted) return; // Don't run this logic on initial server render
    
    if (tripType === 'multi-city') {
      if (fields.length < 2) {
        // remove all legs to start fresh
        remove();
        append({ origin: '', destination: '', departureDate: new Date() });
        append({ origin: '', destination: '', departureDate: new Date() });
      }
    } else {
       if (fields.length > 1) {
         const firstLeg = form.getValues('legs')[0] || { origin: '', destination: '', departureDate: new Date() };
         remove();
         append(firstLeg);
       }
    }
  }, [tripType, isMounted, append, fields.length, form, remove]);


  const onSubmit = async (data: SearchFormData) => {
    setLoading(true);
    setResults(null);
    
    try {
      const response = await searchFlights(data);
      setResults(response);
    } catch (error) {
      console.error('Flight search error:', error);
      toast({
        title: 'Search Failed',
        description: 'We could not retrieve flight information at this time. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  if (!isMounted) {
    return (
        <div className="w-full">
            <Card className="bg-background/80 backdrop-blur-sm shadow-lg">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold font-headline">Search for Flights</CardTitle>
                    <CardDescription>Find the best deals for your next adventure.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6 animate-pulse">
                        <div className="h-10 bg-muted rounded-md"></div>
                        <div className="h-24 bg-muted rounded-md"></div>
                        <div className="h-10 bg-muted rounded-md"></div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
  }


  return (
    <div className="w-full">
      <Card className="bg-background/80 backdrop-blur-sm shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold font-headline">Search for Flights</CardTitle>
          <CardDescription>Find the best deals for your next adventure.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="tripType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 justify-center"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl><RadioGroupItem value="return" /></FormControl>
                          <FormLabel className="font-normal">Return</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl><RadioGroupItem value="one-way" /></FormControl>
                          <FormLabel className="font-normal">One-way</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl><RadioGroupItem value="multi-city" /></FormControl>
                          <FormLabel className="font-normal">Multi-city</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <div className="space-y-4">
                {fields.map((item, index) => (
                  <div
                    key={item.id}
                    className={cn(
                      "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 items-end gap-x-4 gap-y-4",
                      tripType === 'multi-city' && "p-4 border rounded-md relative",
                    )}
                  >
                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                      <FormField control={form.control} name={`legs.${index}.origin`} render={({ field }) => (
                        <FormItem>
                          <FormLabel>From</FormLabel>
                          <FormControl><Input placeholder="e.g., Lagos (LOS)" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name={`legs.${index}.destination`} render={({ field }) => (
                        <FormItem>
                          <FormLabel>To</FormLabel>
                          <FormControl><Input placeholder="e.g., London (LHR)" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>

                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                      <FormField control={form.control} name={`legs.${index}.departureDate`} render={({ field }) => (
                        <FormItem>
                          <FormLabel>{tripType === 'multi-city' ? `Leg ${index + 1} Date` : 'Departure'}</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button variant={'outline'} className={cn('w-full justify-start text-left font-normal', !field.value && 'text-muted-foreground')}>
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {field.value ? format(field.value as Date, 'PPP') : <span>Pick a date</span>}
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={field.value as Date} onSelect={field.onChange} initialFocus /></PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )} />

                      {tripType === 'return' && index === 0 && (
                        <FormField control={form.control} name="returnDate" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Return</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button variant={'outline'} className={cn('w-full justify-start text-left font-normal', !field.value && 'text-muted-foreground')}>
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus /></PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )} />
                      )}
                    </div>
                     {tripType === 'multi-city' && fields.length > 2 && (
                        <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 h-6 w-6" onClick={() => remove(index)}>
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remove leg</span>
                        </Button>
                      )}
                  </div>
                ))}
                 {tripType === 'multi-city' && (
                  <Button type="button" variant="outline" className="w-full" onClick={() => append({ origin: '', destination: '', departureDate: new Date() })}>
                    <Plus className="mr-2 h-4 w-4" /> Add another flight
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-4 items-end">
                  <FormField control={form.control} name="adults" render={({field}) => (
                      <FormItem>
                          <FormLabel>Adults</FormLabel>
                          <FormControl><Input type="number" min="1" {...field} /></FormControl>
                          <FormMessage />
                      </FormItem>
                  )} />
                   <FormField control={form.control} name="children" render={({field}) => (
                      <FormItem>
                          <FormLabel>Children</FormLabel>
                          <FormControl><Input type="number" min="0" {...field} /></FormControl>
                          <FormMessage />
                      </FormItem>
                  )} />
                   <FormField control={form.control} name="infants" render={({field}) => (
                      <FormItem>
                          <FormLabel>Infants</FormLabel>
                          <FormControl><Input type="number" min="0" {...field} /></FormControl>
                          <FormMessage />
                      </FormItem>
                  )} />
                   <FormField control={form.control} name="cabinClass" render={({ field }) => (
                      <FormItem>
                          <FormLabel className="sr-only">Cabin Class</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                  <SelectTrigger>
                                  <SelectValue placeholder="Select a cabin class" />
                                  </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                  <SelectItem value="economy">Economy</SelectItem>
                                  <SelectItem value="premium-economy">Premium Economy</SelectItem>
                                  <SelectItem value="business">Business</SelectItem>
                                  <SelectItem value="first">First</SelectItem>
                              </SelectContent>
                          </Select>
                          <FormMessage />
                      </FormItem>
                  )} />
              </div>
              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Search Flights
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {loading && (
        <div className="text-center mt-8">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="mt-2 text-muted-foreground">Searching for the best flights...</p>
        </div>
      )}

      {results && (
        <div className="mt-12">
          <h2 className="text-3xl font-bold font-headline text-center mb-8">Available Flights</h2>
          {results.flights.length > 0 ? (
            <div className="space-y-4">
              {results.flights.map((flight, index) => (
                <Card key={index} className="shadow-md hover:shadow-lg transition-shadow bg-background/80 backdrop-blur-sm">
                  <CardContent className="p-6 grid grid-cols-5 items-center gap-4">
                    <div className="col-span-2">
                      <p className="text-lg font-semibold">{flight.airline}</p>
                      <p className="text-sm text-muted-foreground">Flight {flight.flightNumber}</p>
                    </div>
                    <div>
                      <p className="font-bold text-xl">{flight.departureTime}</p>
                      <p className="text-muted-foreground">{flight.origin}</p>
                    </div>
                    <div className="text-center">
                      <ArrowRight className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-bold text-xl">{flight.arrivalTime}</p>
                      <p className="text-muted-foreground">{flight.destination}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="mt-8 bg-background/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center text-muted-foreground">
                No flights found for the selected criteria. Try adjusting your search.
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
