import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { destinations } from '@/lib/destinations';

export default function DestinationsPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
            Explore Our Destinations
          </h1>
          <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            From bustling cities to tranquil beaches, find your next perfect getaway.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {destinations.map((destination) => (
          <Link href={`/destinations/${destination.slug}`} key={destination.id}>
            <Card className="overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl h-full flex flex-col">
              <Image
                src={destination.images[0]}
                alt={`Image of ${destination.name}`}
                width={600}
                height={400}
                data-ai-hint={destination.aiHint}
                className="object-cover w-full h-56"
              />
              <CardHeader>
                <CardTitle className="font-headline">{destination.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">{destination.shortDescription}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
