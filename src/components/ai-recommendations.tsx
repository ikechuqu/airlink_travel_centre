'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { runGenerateTravelRecommendations } from '@/app/server-actions';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setRecommendations('');

    try {
      const result = await runGenerateTravelRecommendations({
        destinationDetails,
        trendingInterests: interests,
      });
      if (result.recommendations) {
        setRecommendations(result.recommendations);
      } else {
        setError('Could not generate recommendations. Please try again.');
      }
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
