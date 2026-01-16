import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Heart, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface MemorialDonationProps {
  deceasedName: string;
  preferredCharities?: Array<{
    name: string;
    url: string;
  }>;
}

const suggestedCharities = [
  { name: 'American Jewish Joint Distribution Committee (JDC)', url: 'https://www.jdc.org' },
  { name: 'Jewish National Fund (JNF)', url: 'https://www.jnf.org' },
  { name: 'Hadassah Medical Organization', url: 'https://www.hadassah.org' },
  { name: 'Yad Vashem', url: 'https://www.yadvashem.org' },
  { name: 'Magen David Adom', url: 'https://www.afmda.org' },
  { name: 'American Cancer Society', url: 'https://www.cancer.org' },
  { name: 'American Heart Association', url: 'https://www.heart.org' },
];

const MemorialDonation = ({ deceasedName, preferredCharities }: MemorialDonationProps) => {
  const [open, setOpen] = useState(false);
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedCharity, setSelectedCharity] = useState('');
  const [message, setMessage] = useState('');
  const [notifyFamily, setNotifyFamily] = useState(true);

  const handleDonation = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In production, this would integrate with payment processing
    toast.success('Donation initiated', {
      description: `Thank you for honoring ${deceasedName}'s memory`,
    });
    
    setOpen(false);
    // Reset form
    setDonorName('');
    setDonorEmail('');
    setAmount('');
    setSelectedCharity('');
    setMessage('');
  };

  const displayCharities = preferredCharities && preferredCharities.length > 0 
    ? preferredCharities 
    : suggestedCharities;

  return (
    <Card className="p-6 bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200/50 dark:border-green-800/50 shadow-subtle">
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <Heart className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-1">
              Make a Memorial Donation
            </h3>
            <p className="text-sm text-muted-foreground">
              Honor {deceasedName}'s memory by supporting a cause they cared about
            </p>
          </div>
        </div>

        {preferredCharities && preferredCharities.length > 0 && (
          <div className="bg-background/50 rounded-lg p-4 space-y-2">
            <p className="text-sm font-medium text-foreground">Family's Preferred Charities:</p>
            <ul className="space-y-1">
              {preferredCharities.map((charity, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                  <Heart className="h-3 w-3 text-green-600" />
                  {charity.name}
                </li>
              ))}
            </ul>
          </div>
        )}

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white">
              <Heart className="mr-2 h-4 w-4" />
              Donate in Memory
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Donate in Memory of {deceasedName}</DialogTitle>
              <DialogDescription>
                Your donation will honor their memory and support meaningful causes
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleDonation} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="charity">Select Charity</Label>
                <Select value={selectedCharity} onValueChange={setSelectedCharity} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a charity..." />
                  </SelectTrigger>
                  <SelectContent>
                    {displayCharities.map((charity, index) => (
                      <SelectItem key={index} value={charity.name}>
                        {charity.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Donation Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="amount"
                    type="number"
                    min="1"
                    step="0.01"
                    placeholder="0.00"
                    className="pl-8"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>
                <div className="flex gap-2">
                  {[18, 36, 100, 180].map((preset) => (
                    <Button
                      key={preset}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setAmount(preset.toString())}
                    >
                      ${preset}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="donor-name">Your Name</Label>
                <Input
                  id="donor-name"
                  placeholder="Enter your name"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="donor-email">Email Address</Label>
                <Input
                  id="donor-email"
                  type="email"
                  placeholder="your@email.com"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message (Optional)</Label>
                <Textarea
                  id="message"
                  placeholder="Share a memory or message of condolence..."
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="notify-family"
                  checked={notifyFamily}
                  onChange={(e) => setNotifyFamily(e.target.checked)}
                  className="rounded border-border"
                />
                <Label htmlFor="notify-family" className="text-sm cursor-pointer">
                  Notify family of this donation
                </Label>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Complete Donation
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        <Button variant="link" className="w-full" asChild>
          <a href="/charities" target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-3 w-3" />
            View All Charities
          </a>
        </Button>
      </div>
    </Card>
  );
};

export default MemorialDonation;