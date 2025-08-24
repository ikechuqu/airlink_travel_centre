import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Briefcase, Globe, Heart } from 'lucide-react';

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'John Adebayo',
      role: 'Founder & CEO',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100&h=100&fit=crop',
      aiHint: "man professional headshot",
      bio: "With over 20 years in the travel industry, John's passion is creating unforgettable experiences."
    },
    {
      name: 'Chioma Nwosu',
      role: 'Head of Operations',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=100&fit=crop',
      aiHint: "woman professional headshot",
      bio: 'Chioma ensures every trip is seamless, from booking to the final touchdown.'
    },
    {
      name: 'Tunde Oladipo',
      role: 'Lead Travel Consultant',
      avatar: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=100&h=100&fit=crop',
      aiHint: "man smiling headshot",
      bio: 'Tunde specializes in crafting bespoke international adventures for our clients.'
    },
  ];

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">About Airlink Travel Centre</h1>
        <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
          Your trusted partner in crafting unforgettable journeys. We are a premier travel agency based in Abuja, Nigeria, dedicated to providing bespoke travel experiences both locally and across the globe.
        </p>
      </section>

      <section className="relative mb-16 h-80 w-full">
         <Image
          src="https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?q=80&w=1200&h=400&fit=crop"
          alt="A diverse group of happy travelers"
          layout="fill"
          objectFit="cover"
          data-ai-hint="diverse travel group"
          className="rounded-lg shadow-xl"
        />
      </section>

      <section className="grid md:grid-cols-3 gap-8 mb-16 text-center">
        <Card className="bg-background/70 border-none shadow-lg">
          <CardHeader>
            <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit">
                <Briefcase className="h-8 w-8" />
            </div>
            <CardTitle className="font-headline text-2xl pt-4">Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To deliver personalized and seamless travel solutions that inspire discovery and create lasting memories for every client.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-background/70 border-none shadow-lg">
          <CardHeader>
            <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit">
                <Globe className="h-8 w-8" />
            </div>
            <CardTitle className="font-headline text-2xl pt-4">Our Vision</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To be Nigeria's leading travel agency, renowned for exceptional service, innovative solutions, and a passion for connecting people to the world.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-background/70 border-none shadow-lg">
          <CardHeader>
            <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit">
                <Heart className="h-8 w-8" />
            </div>
            <CardTitle className="font-headline text-2xl pt-4">Our Values</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Customer-centricity, integrity, and a commitment to excellence are at the heart of everything we do.
            </p>
          </CardContent>
        </Card>
      </section>

      <section>
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Meet Our Team</h2>
            <p className="max-w-[900px] mx-auto text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                The passionate experts behind your next great adventure.
            </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
            <Card key={member.name} className="text-center bg-background/70 border-none shadow-lg">
                <CardContent className="pt-6 flex flex-col items-center">
                    <Avatar className="h-24 w-24 mb-4">
                        <AvatarImage src={member.avatar} alt={member.name} data-ai-hint={member.aiHint}/>
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-bold font-headline">{member.name}</h3>
                    <p className="text-primary font-semibold mb-2">{member.role}</p>
                    <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
            </Card>
            ))}
        </div>
      </section>
    </div>
  );
}
