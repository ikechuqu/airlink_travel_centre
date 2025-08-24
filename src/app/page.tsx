import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { destinations } from '@/lib/destinations';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import FlightSearchForm from '@/components/flight-search-form';

export default function Home() {
  const testimonials = [
    {
      name: 'Sarah L.',
      quote: "An absolutely unforgettable trip to Tokyo! Airlink's recommendations were spot on. The AI tool helped us discover hidden gems we would've otherwise missed. Highly recommended!",
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&h=100&fit=crop',
      aiHint: "woman smiling"
    },
    {
      name: 'David R.',
      quote: "Our family vacation to the Swiss Alps was seamless thanks to Airlink. The inquiry process was simple, and they handled everything with such professionalism. We felt so cared for.",
      avatar: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=100&h=100&fit=crop',
      aiHint: "man smiling"
    },
    {
      name: 'Priya K.',
      quote: "I was looking for a unique solo travel experience, and Airlink delivered. The destination hub for Bali was incredibly detailed and helped me plan the perfect adventure.",
      avatar: 'https://images.unsplash.com/photo-1594744800847-93616616a534?q=80&w=100&h=100&fit=crop',
      aiHint: "woman hiking"
    },
  ];

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <section className="relative w-full pt-12 md:pt-24 lg:pt-32">
        <Image
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1920&h=1080&fit=crop"
          data-ai-hint="tropical beach sunset"
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-[-1] opacity-30"
        />
        <div className="container px-4 md:px-6 space-y-10 xl:space-y-16 relative">
          <div className="grid max-w-[800px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:gap-16">
            <div className="text-center">
              <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] font-headline">
                Your Journey Begins Here
              </h1>
              <p className="mx-auto max-w-[700px] text-foreground/80 md:text-xl mt-4">
                Discover and book amazing travel experiences with Airlink. Let our smart tools and expert insights guide you to your next adventure.
              </p>
            </div>
            <FlightSearchForm />
          </div>
        </div>
      </section>

      <section id="destinations" className="py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Popular Destinations</h2>
              <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explore our curated selection of top travel spots around the globe.
              </p>
            </div>
          </div>
          <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-12">
            {destinations.slice(0, 3).map((destination) => (
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
          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href="/destinations">
                View All Destinations <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-12 md:py-24 lg:py-32 bg-background/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Customer Love</h2>
              <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Hear what our happy travelers have to say about their experiences with Airlink.
              </p>
            </div>
          </div>
          <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-12">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="bg-background/80 shadow-lg">
                <CardContent className="pt-6 flex flex-col h-full">
                  <div className="flex items-center mb-4">
                     <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.aiHint} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <div className="flex text-yellow-400 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-current" />
                          ))}
                        </div>
                    </div>
                  </div>
                  <blockquote className="text-lg leading-relaxed flex-grow">
                    "{testimonial.quote}"
                  </blockquote>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
