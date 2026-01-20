'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  Search,
  Download,
  ExternalLink,
  Mail,
  Building,
  MapPin,
  Calendar,
  Eye,
  RefreshCw,
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Lead {
  id: string;
  rb2b_id: string | null;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  full_name: string | null;
  linkedin_url: string | null;
  job_title: string | null;
  company_name: string | null;
  company_domain: string | null;
  company_industry: string | null;
  company_size: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  page_url: string | null;
  referrer: string | null;
  visit_count: number | null;
  first_seen_at: string | null;
  last_seen_at: string | null;
  status: string | null;
  notes: string | null;
  created_at: string | null;
}

const statusColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-yellow-100 text-yellow-800',
  qualified: 'bg-green-100 text-green-800',
  converted: 'bg-purple-100 text-purple-800',
  archived: 'bg-gray-100 text-gray-800',
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  useEffect(() => {
    fetchLeads();
  }, [statusFilter]);

  async function fetchLeads() {
    setLoading(true);
    try {
      let query = supabase
        .from('rb2b_leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateLeadStatus(leadId: string, newStatus: string) {
    try {
      const { error } = await supabase
        .from('rb2b_leads')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', leadId);

      if (error) throw error;

      // Update local state
      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === leadId ? { ...lead, status: newStatus } : lead
        )
      );

      if (selectedLead?.id === leadId) {
        setSelectedLead({ ...selectedLead, status: newStatus });
      }
    } catch (error) {
      console.error('Error updating lead status:', error);
    }
  }

  function exportToCSV() {
    const headers = [
      'Name',
      'Email',
      'Company',
      'Job Title',
      'Location',
      'Status',
      'First Seen',
      'Last Seen',
      'Visits',
    ];

    const rows = leads.map((lead) => [
      lead.full_name || '',
      lead.email || '',
      lead.company_name || '',
      lead.job_title || '',
      [lead.city, lead.state].filter(Boolean).join(', '),
      lead.status || '',
      lead.first_seen_at ? new Date(lead.first_seen_at).toLocaleDateString() : '',
      lead.last_seen_at ? new Date(lead.last_seen_at).toLocaleDateString() : '',
      (lead.visit_count ?? 0).toString(),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rb2b-leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const filteredLeads = leads.filter((lead) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      lead.full_name?.toLowerCase().includes(query) ||
      lead.email?.toLowerCase().includes(query) ||
      lead.company_name?.toLowerCase().includes(query)
    );
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Users className="h-8 w-8" />
          Lead Management
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage and track visitors identified by RB2B
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="qualified">Qualified</SelectItem>
                <SelectItem value="converted">Converted</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={fetchLeads}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" onClick={exportToCSV}>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            {filteredLeads.length} Lead{filteredLeads.length !== 1 ? 's' : ''}
          </CardTitle>
          <CardDescription>
            Click on a lead to view details and update status
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">
              Loading leads...
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No leads found. Leads will appear here once RB2B identifies visitors.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Name</th>
                    <th className="text-left p-3 font-medium">Company</th>
                    <th className="text-left p-3 font-medium">Location</th>
                    <th className="text-left p-3 font-medium">Status</th>
                    <th className="text-left p-3 font-medium">Visits</th>
                    <th className="text-left p-3 font-medium">Last Seen</th>
                    <th className="text-left p-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="border-b hover:bg-muted/50 cursor-pointer"
                      onClick={() => setSelectedLead(lead)}
                    >
                      <td className="p-3">
                        <div>
                          <p className="font-medium">
                            {lead.full_name || 'Unknown'}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {lead.email || 'No email'}
                          </p>
                        </div>
                      </td>
                      <td className="p-3">
                        <div>
                          <p>{lead.company_name || '-'}</p>
                          <p className="text-sm text-muted-foreground">
                            {lead.job_title || ''}
                          </p>
                        </div>
                      </td>
                      <td className="p-3">
                        {[lead.city, lead.state].filter(Boolean).join(', ') || '-'}
                      </td>
                      <td className="p-3">
                        <Badge className={statusColors[lead.status || 'new']}>
                          {lead.status || 'new'}
                        </Badge>
                      </td>
                      <td className="p-3">{lead.visit_count ?? 0}</td>
                      <td className="p-3">
                        {lead.last_seen_at ? new Date(lead.last_seen_at).toLocaleDateString() : '-'}
                      </td>
                      <td className="p-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedLead(lead);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Lead Detail Dialog */}
      <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Lead Details</DialogTitle>
            <DialogDescription>
              Full information about this identified visitor
            </DialogDescription>
          </DialogHeader>

          {selectedLead && (
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">
                    {selectedLead.full_name || 'Unknown'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Select
                    value={selectedLead.status || 'new'}
                    onValueChange={(value) =>
                      updateLeadStatus(selectedLead.id, value)
                    }
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="qualified">Qualified</SelectItem>
                      <SelectItem value="converted">Converted</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Contact Information
                </h4>
                <div className="grid grid-cols-2 gap-4 pl-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p>{selectedLead.email || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">LinkedIn</p>
                    {selectedLead.linkedin_url ? (
                      <a
                        href={selectedLead.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1"
                      >
                        View Profile
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      <p>-</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Company Info */}
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Company Information
                </h4>
                <div className="grid grid-cols-2 gap-4 pl-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Company</p>
                    <p>{selectedLead.company_name || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Job Title</p>
                    <p>{selectedLead.job_title || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Industry</p>
                    <p>{selectedLead.company_industry || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Company Size</p>
                    <p>{selectedLead.company_size || '-'}</p>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Location
                </h4>
                <div className="pl-6">
                  <p>
                    {[selectedLead.city, selectedLead.state, selectedLead.country]
                      .filter(Boolean)
                      .join(', ') || '-'}
                  </p>
                </div>
              </div>

              {/* Visit Info */}
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Visit Information
                </h4>
                <div className="grid grid-cols-2 gap-4 pl-6">
                  <div>
                    <p className="text-sm text-muted-foreground">First Seen</p>
                    <p>
                      {selectedLead.first_seen_at ? new Date(selectedLead.first_seen_at).toLocaleString() : '-'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Last Seen</p>
                    <p>
                      {selectedLead.last_seen_at ? new Date(selectedLead.last_seen_at).toLocaleString() : '-'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Visits</p>
                    <p>{selectedLead.visit_count ?? 0}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Last Page</p>
                    <p className="truncate">{selectedLead.page_url || '-'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
