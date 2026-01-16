import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ThumbsUp, MessageSquare } from 'lucide-react';
import RatingStars from './RatingStars';
import { toast } from 'sonner';

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verified: boolean;
  helpful: number;
}

interface ProductReviewsProps {
  productId: number;
  averageRating: number;
  totalReviews: number;
}

const ProductReviews = ({ productId, averageRating, totalReviews }: ProductReviewsProps) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewContent, setReviewContent] = useState('');
  const [reviewerName, setReviewerName] = useState('');

  // Mock reviews data - in production, this would come from your backend
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      author: 'Sarah M.',
      rating: 5,
      date: '2024-10-15',
      title: 'Absolutely beautiful arrangement',
      content: 'The flowers were even more stunning than the photo. They arrived fresh and perfectly arranged. The funeral home staff were so impressed. Thank you for helping us honor our loved one with such beauty.',
      verified: true,
      helpful: 12
    },
    {
      id: 2,
      author: 'David K.',
      rating: 5,
      date: '2024-10-10',
      title: 'Perfect for a difficult time',
      content: 'Ordering was easy and the delivery was right on time. The quality exceeded expectations. Highly recommend for anyone needing sympathy flowers.',
      verified: true,
      helpful: 8
    },
    {
      id: 3,
      author: 'Rachel L.',
      rating: 4,
      date: '2024-10-05',
      title: 'Beautiful and respectful',
      content: 'The arrangement was lovely and appropriate. Only minor issue was the delivery was about an hour late, but the funeral home was understanding. Overall very satisfied.',
      verified: true,
      helpful: 5
    }
  ]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!rating) {
      toast.error('Please select a rating');
      return;
    }

    if (!reviewTitle.trim() || !reviewContent.trim() || !reviewerName.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    const newReview: Review = {
      id: reviews.length + 1,
      author: reviewerName,
      rating,
      date: new Date().toISOString().split('T')[0],
      title: reviewTitle,
      content: reviewContent,
      verified: false,
      helpful: 0
    };

    setReviews([newReview, ...reviews]);
    setShowReviewForm(false);
    setRating(0);
    setReviewTitle('');
    setReviewContent('');
    setReviewerName('');
    
    toast.success('Review submitted', {
      description: 'Thank you for sharing your experience'
    });
  };

  const ratingDistribution = [
    { stars: 5, count: Math.floor(totalReviews * 0.7) },
    { stars: 4, count: Math.floor(totalReviews * 0.2) },
    { stars: 3, count: Math.floor(totalReviews * 0.05) },
    { stars: 2, count: Math.floor(totalReviews * 0.03) },
    { stars: 1, count: Math.floor(totalReviews * 0.02) }
  ];

  return (
    <div className="space-y-8">
      {/* Reviews Summary */}
      <Card className="border-border/50 shadow-subtle">
        <CardHeader>
          <CardTitle className="text-2xl font-serif">Customer Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Overall Rating */}
            <div className="text-center md:text-left">
              <div className="text-5xl font-bold text-foreground mb-2">{averageRating.toFixed(1)}</div>
              <RatingStars rating={averageRating} size="lg" showNumber={false} className="justify-center md:justify-start mb-2" />
              <p className="text-sm text-muted-foreground">{totalReviews} reviews</p>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              {ratingDistribution.map(({ stars, count }) => (
                <div key={stars} className="flex items-center gap-3">
                  <span className="text-sm font-medium w-12">{stars} star</span>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-yellow-400 transition-all duration-500"
                      style={{ width: `${(count / totalReviews) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-8 text-right">{count}</span>
                </div>
              ))}
            </div>
          </div>

          <Button 
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="w-full mt-6 gap-2"
            variant="outline"
          >
            <MessageSquare className="h-4 w-4" />
            Write a Review
          </Button>
        </CardContent>
      </Card>

      {/* Review Form */}
      {showReviewForm && (
        <Card className="border-primary/20 shadow-subtle">
          <CardHeader>
            <CardTitle className="text-xl font-serif">Share Your Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitReview} className="space-y-6">
              <div className="space-y-2">
                <Label>Your Rating *</Label>
                <RatingStars
                  rating={rating}
                  interactive
                  onRate={setRating}
                  size="lg"
                  showNumber={false}
                  className="justify-start"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reviewer-name">Your Name *</Label>
                <Input
                  id="reviewer-name"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="review-title">Review Title *</Label>
                <Input
                  id="review-title"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  placeholder="Sum up your experience"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="review-content">Your Review *</Label>
                <Textarea
                  id="review-content"
                  value={reviewContent}
                  onChange={(e) => setReviewContent(e.target.value)}
                  placeholder="Share your thoughts about this product..."
                  rows={5}
                  required
                />
              </div>

              <div className="flex gap-3">
                <Button type="submit" className="flex-1">Submit Review</Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowReviewForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <Card key={review.id} className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12 border-2 border-primary/10">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {review.author.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-foreground">{review.author}</p>
                        {review.verified && (
                          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      <RatingStars rating={review.rating} size="sm" showNumber={false} />
                    </div>
                    <time className="text-sm text-muted-foreground whitespace-nowrap">
                      {new Date(review.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </time>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{review.title}</h4>
                    <p className="text-muted-foreground leading-relaxed">{review.content}</p>
                  </div>

                  <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
                    <ThumbsUp className="h-3 w-3" />
                    Helpful ({review.helpful})
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;
