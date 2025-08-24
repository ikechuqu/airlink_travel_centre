'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Loader2, Wand2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

type Props = {
  destinationDetails: string;
};

export default function AiRecommendations({ destinationDetails }: Props) {
  const [interests, setInterests] = useState('');
  const [recommendations, setRecommendations] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateMockRecommendations = (destinationDetails: string, interests: string): string => {
    const destination = destinationDetails.split('\n')[1]?.replace('Destination: ', '') || 'this destination';
    const interestsList = interests.toLowerCase();
    
    let recommendations = `Based on your interests in ${interests}, here are some personalized recommendations for ${destination}:\n\n`;
    
    if (interestsList.includes('history')) {
      recommendations += `🏛️ **Historical Sites**: Explore ancient temples, museums, and heritage sites that showcase the rich cultural history of the region.\n\n`;
    }
    
    if (interestsList.includes('food') || interestsList.includes('dining') || interestsList.includes('cuisine')) {
      recommendations += `🍽️ **Culinary Experiences**: Try local cooking classes, food tours, and visit authentic restaurants to taste traditional flavors.\n\n`;
    }
    
    if (interestsList.includes('photography')) {
      recommendations += `📸 **Photography Spots**: Visit scenic viewpoints, colorful markets, and architectural marvels perfect for capturing memorable shots.\n\n`;
    }
    
    if (interestsList.includes('adventure') || interestsList.includes('outdoor')) {
      recommendations += `🏔️ **Adventure Activities**: Experience hiking trails, water sports, and outdoor excursions that offer thrilling experiences.\n\n`;
    }
    
    if (interestsList.includes('art') || interestsList.includes('culture')) {
      recommendations += `🎨 **Art & Culture**: Visit local galleries, attend cultural performances, and explore artisan workshops.\n\n`;
    }
    
    if (interestsList.includes('shopping')) {
      recommendations += `🛍️ **Shopping**: Discover local markets, boutique stores, and specialty shops for unique souvenirs and local crafts.\n\n`;
    }
    
    recommendations += `✨ **Special Tip**: Consider visiting during local festivals or events to experience authentic cultural celebrations!\n\n`;
    recommendations += `📅 **Best Time**: Plan your activities during optimal weather conditions for the most enjoyable experience.`;
    
    return recommendations;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setRecommendations('');

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockRecommendations = generateMockRecommendations(destinationDetails, interests);
      setRecommendations(mockRecommendations);
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          placeholder="e.g., interested in history, fine dining, and photography..."
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          className="min-h-[100px]"
          aria-label="Your interests"
        />
        <Button type="submit" disabled={loading || !interests}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" />
              Generate Ideas
            </>
          )}
        </Button>
      </form>

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {recommendations && (
        <Card className="mt-6 bg-background/50">
          <CardHeader>
             <CardTitle className="font-headline text-2xl">Personalized Travel Ideas</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="prose prose-blue dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: recommendations.replace(/\n/g, '<br />') }}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}