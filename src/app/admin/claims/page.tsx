'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ClipboardCheck,
  RefreshCw,
  Search,
  MoreHorizontal,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Building2,
  Phone,
  Mail,
  Globe,
  MapPin,
  User,
  FileText,
  ExternalLink,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

interface VendorClaim {
  id: string;
  vendor_id: string | null;
  business_name: string;
  business_type: string | null;
  website: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  contact_name: string | null;
  contact_title: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  description: string | null;
  services: string[] | null;
  verification_method: string | null;
  additional_notes: string | null;
  status: string;
  admin_notes: string | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
  created_at: string;
  updated_at: string;
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  in_review: 'bg-blue-100 text-blue-800',
};

const statusIcons: Record<string, React.ElementType> = {
  pending: Clock,
  approved: CheckCircle,
  rejected: XCircle,
  in_review: Eye,
};

export default function VendorClaimsAdmin() {
  const [loading, setLoading] = useState(true);
  const [claims, setClaims] = useState<VendorClaim[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedClaim, setSelectedClaim] = useState<VendorClaim | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('vendor_claims' as any)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setClaims(data as unknown as VendorClaim[]);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load vendor claims',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  function openClaimDetail(claim: VendorClaim) {
    setSelectedClaim(claim);
    setAdminNotes(claim.admin_notes || '');
    setIsDetailOpen(true);
  }

  async function updateClaimStatus(claimId: string, newStatus: string) {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('vendor_claims' as any)
        .update({
          status: newStatus,
          admin_notes: adminNotes || null,
          reviewed_by: user?.id || null,
          reviewed_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', claimId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: `Claim ${newStatus === 'approved' ? 'approved' : newStatus === 'rejected' ? 'rejected' : 'updated'} successfully`,
      });
      setIsDetailOpen(false);
      fetchData();
    } catch (error) {
      console.error('Error updating claim:', error);
      toast({
        title: 'Error',
        description: 'Failed to update claim status',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  }

  const filteredClaims = claims.filter((c) => {
    const matchesSearch =
      c.business_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.contact_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.contact_email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <ClipboardCheck className="h-8 w-8" />
            Vendor Claims
          </h1>
          <p className="text-muted-foreground mt-1">
            Review and process vendor registration requests
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by business name, contact..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_review">In Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={fetchData}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">{claims.length}</p>
                <p className="text-sm text-muted-foreground">Total Claims</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">
                  {claims.filter((c) => c.status === 'pending').length}
                </p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">
                  {claims.filter((c) => c.status === 'approved').length}
                </p>
                <p className="text-sm text-muted-foreground">Approved</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-2xl font-bold">
                  {claims.filter((c) => c.status === 'rejected').length}
                </p>
                <p className="text-sm text-muted-foreground">Rejected</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Claims Table */}
      <Card>
        <CardHeader>
          <CardTitle>Vendor Claims</CardTitle>
          <CardDescription>
            {filteredClaims.length} claim{filteredClaims.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Loading...</div>
          ) : filteredClaims.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Business</th>
                    <th className="text-left p-3 font-medium">Contact</th>
                    <th className="text-left p-3 font-medium">Type</th>
                    <th className="text-left p-3 font-medium">Submitted</th>
                    <th className="text-left p-3 font-medium">Status</th>
                    <th className="text-left p-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClaims.map((claim) => {
                    const StatusIcon = statusIcons[claim.status] || Clock;
                    return (
                      <tr key={claim.id} className="border-b hover:bg-muted/50">
                        <td className="p-3">
                          <div>
                            <p className="font-medium">{claim.business_name}</p>
                            {claim.city && claim.state && (
                              <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {claim.city}, {claim.state}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="text-sm">
                            <p className="font-medium">{claim.contact_name || 'N/A'}</p>
                            <p className="text-muted-foreground">{claim.contact_email || claim.email}</p>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge variant="outline">{claim.business_type || 'Not specified'}</Badge>
                        </td>
                        <td className="p-3">
                          <span className="text-sm text-muted-foreground">
                            {formatDate(claim.created_at)}
                          </span>
                        </td>
                        <td className="p-3">
                          <Badge className={statusColors[claim.status] || 'bg-gray-100'}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {claim.status}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => openClaimDetail(claim)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              {claim.status === 'pending' && (
                                <>
                                  <DropdownMenuItem
                                    onClick={() => updateClaimStatus(claim.id, 'approved')}
                                    className="text-green-600"
                                  >
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Quick Approve
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => updateClaimStatus(claim.id, 'rejected')}
                                    className="text-red-600"
                                  >
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Quick Reject
                                  </DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No vendor claims found.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Claim Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Vendor Claim Details</DialogTitle>
            <DialogDescription>
              Review claim submitted on {selectedClaim && formatDate(selectedClaim.created_at)}
            </DialogDescription>
          </DialogHeader>
          {selectedClaim && (
            <div className="space-y-6 py-4">
              {/* Business Info */}
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Business Information
                </h3>
                <div className="grid grid-cols-2 gap-4 pl-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Business Name</p>
                    <p className="font-medium">{selectedClaim.business_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Type</p>
                    <p className="font-medium">{selectedClaim.business_type || 'Not specified'}</p>
                  </div>
                  {selectedClaim.website && (
                    <div className="col-span-2">
                      <p className="text-sm text-muted-foreground">Website</p>
                      <a
                        href={selectedClaim.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1"
                      >
                        {selectedClaim.website}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Location */}
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Location
                </h3>
                <div className="pl-6">
                  <p>
                    {selectedClaim.address && `${selectedClaim.address}, `}
                    {selectedClaim.city}, {selectedClaim.state} {selectedClaim.zip}
                  </p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Contact Information
                </h3>
                <div className="grid grid-cols-2 gap-4 pl-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">{selectedClaim.contact_name || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Title</p>
                    <p className="font-medium">{selectedClaim.contact_title || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Mail className="h-3 w-3" /> Email
                    </p>
                    <p className="font-medium">{selectedClaim.contact_email || selectedClaim.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Phone className="h-3 w-3" /> Phone
                    </p>
                    <p className="font-medium">{selectedClaim.contact_phone || selectedClaim.phone || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              {selectedClaim.description && (
                <div className="space-y-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Description
                  </h3>
                  <p className="pl-6 text-sm">{selectedClaim.description}</p>
                </div>
              )}

              {/* Verification Method */}
              <div className="space-y-3">
                <h3 className="font-semibold">Verification Method</h3>
                <Badge variant="outline" className="ml-6">
                  {selectedClaim.verification_method || 'Not specified'}
                </Badge>
              </div>

              {/* Additional Notes from Vendor */}
              {selectedClaim.additional_notes && (
                <div className="space-y-3">
                  <h3 className="font-semibold">Additional Notes from Vendor</h3>
                  <p className="pl-6 text-sm bg-muted/50 p-3 rounded">
                    {selectedClaim.additional_notes}
                  </p>
                </div>
              )}

              {/* Admin Notes */}
              <div className="space-y-3 border-t pt-4">
                <Label htmlFor="admin_notes">Admin Notes</Label>
                <Textarea
                  id="admin_notes"
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Add internal notes about this claim..."
                  rows={3}
                />
              </div>

              {/* Current Status */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Current Status:</span>
                <Badge className={statusColors[selectedClaim.status]}>
                  {selectedClaim.status}
                </Badge>
                {selectedClaim.reviewed_at && (
                  <span className="text-xs text-muted-foreground">
                    (Reviewed {formatDate(selectedClaim.reviewed_at)})
                  </span>
                )}
              </div>
            </div>
          )}
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
              Close
            </Button>
            {selectedClaim?.status !== 'rejected' && (
              <Button
                variant="destructive"
                onClick={() => selectedClaim && updateClaimStatus(selectedClaim.id, 'rejected')}
                disabled={saving}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Reject
              </Button>
            )}
            {selectedClaim?.status !== 'approved' && (
              <Button
                onClick={() => selectedClaim && updateClaimStatus(selectedClaim.id, 'approved')}
                disabled={saving}
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
