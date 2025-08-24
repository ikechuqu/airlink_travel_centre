import { notFound } from 'next/navigation';
import Image from 'next/image';
import { destinations } from '@/lib/destinations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Suitcase, Sailboat, Star } from 'lucide-react';
import AiRecommendations from '@/components/ai-recommendations';

export async function generateStaticParams() {
  return destinations.map((destination) => ({
    slug: destination.slug,
  }));
}

export default function DestinationPage({ params }: { params: { slug: string } }) {
  const destination = destinations.find((d) => d.slug === params.slug);

  if (!destination) {
    notFound();
  }

  const destinationDetailsForAI = `
    Destination: ${destination.name}
    Description: ${destination.longDescription}
    Available Tours: ${destination.tours.map(t => t.name).join(', ')}
    Available Activities: ${destination.activities.map(a => a.name).join(', ')}
  `;

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">{destination.name}</h1>
      <p className="text-lg text-muted-foreground mb-8">{destination.longDescription}</p>

      <div className="mb-12">
        <Carousel className="w-full">
          <CarouselContent>
            {destination.images.map((src, index) => (
              <CarouselItem key={index}>
                <Image
                  src={src}
                  alt={`Image ${index + 1} of ${destination.name}`}
                  width={1200}
                  height={800}
                  data-ai-hint={destination.aiHint}
                  className="rounded-lg object-cover w-full aspect-[16/9]"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-16" />
          <CarouselNext className="mr-16" />
        </Carousel>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl font-bold font-headline mb-6 flex items-center"><Suitcase className="mr-3 h-8 w-8 text-primary" />Tours</h2>
          <div className="space-y-4">
            {destination.tours.map((tour, index) => (
              <Card key={index} className="bg-background/70">
                <CardHeader>
                  <CardTitle className="font-headline text-xl">{tour.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{tour.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold font-headline mb-6 flex items-center"><Sailboat className="mr-3 h-8 w-8 text-primary" />Activities</h2>
          <div className="space-y-4">
            {destination.activities.map((activity, index) => (
              <Card key={index} className="bg-background/70">
                <CardHeader>
                  <CardTitle className="font-headline text-xl">{activity.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{activity.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-16">
        <Card className="bg-background/70 shadow-lg border-none">
            <CardHeader>
                <CardTitle className="text-3xl font-bold font-headline flex items-center">
                    <Star className="mr-3 h-8 w-8 text-yellow-400 fill-current"/>
                    AI-Powered Recommendations
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-4">
                    Tell us what you're interested in, and our AI will generate personalized travel ideas for {destination.name}!
                </p>
                <AiRecommendations destinationDetails={destinationDetailsForAI} />
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
