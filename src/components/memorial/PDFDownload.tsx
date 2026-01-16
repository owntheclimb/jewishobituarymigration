import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';
import { toast } from 'sonner';

interface PDFDownloadProps {
  obituary: {
    full_name: string;
    date_of_birth?: string | null;
    date_of_death?: string | null;
    biography?: string | null;
    funeral_details?: string | null;
    location?: string | null;
    photo_url?: string | null;
  };
}

const PDFDownload = ({ obituary }: PDFDownloadProps) => {
  const generatePDF = () => {
    // For now, create a simple HTML version that can be printed
    // In production, you'd use a library like jsPDF or call a server endpoint
    
    const formatDate = (date: string | null | undefined) => {
      if (!date) return '';
      return new Date(date).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    };

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>${obituary.full_name} - Obituary</title>
          <style>
            @media print {
              @page { margin: 1in; }
              body { margin: 0; }
            }
            body {
              font-family: Georgia, 'Times New Roman', serif;
              max-width: 8.5in;
              margin: 0 auto;
              padding: 1in;
              line-height: 1.6;
              color: #333;
            }
            .header {
              text-align: center;
              margin-bottom: 2rem;
              padding-bottom: 1rem;
              border-bottom: 2px solid #7A2CC6;
            }
            h1 {
              font-size: 2rem;
              margin-bottom: 0.5rem;
              color: #7A2CC6;
            }
            .dates {
              font-size: 1.2rem;
              color: #666;
              margin-bottom: 0.5rem;
            }
            .location {
              color: #888;
              font-style: italic;
            }
            .photo {
              text-align: center;
              margin: 2rem 0;
            }
            .photo img {
              max-width: 400px;
              max-height: 500px;
              border-radius: 8px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .section {
              margin: 2rem 0;
            }
            .section h2 {
              color: #7A2CC6;
              border-bottom: 1px solid #ddd;
              padding-bottom: 0.5rem;
              margin-bottom: 1rem;
            }
            .biography {
              text-align: justify;
              white-space: pre-wrap;
            }
            .footer {
              margin-top: 3rem;
              padding-top: 1rem;
              border-top: 1px solid #ddd;
              text-align: center;
              color: #888;
              font-size: 0.9rem;
            }
            .logo {
              margin-top: 1rem;
              color: #7A2CC6;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${obituary.full_name}</h1>
            <div class="dates">
              ${formatDate(obituary.date_of_birth)} - ${formatDate(obituary.date_of_death)}
            </div>
            ${obituary.location ? `<div class="location">${obituary.location}</div>` : ''}
          </div>

          ${obituary.photo_url ? `
            <div class="photo">
              <img src="${obituary.photo_url}" alt="${obituary.full_name}" />
            </div>
          ` : ''}

          ${obituary.biography ? `
            <div class="section">
              <h2>Life Story</h2>
              <div class="biography">${obituary.biography}</div>
            </div>
          ` : ''}

          ${obituary.funeral_details ? `
            <div class="section">
              <h2>Service Information</h2>
              <div class="biography">${obituary.funeral_details}</div>
            </div>
          ` : ''}

          <div class="footer">
            <p>May their memory be a blessing</p>
            <div class="logo">Neshama • Jewish Memorial Platform</div>
          </div>
        </body>
      </html>
    `;

    // Open in new window for printing
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      
      // Wait for images to load before printing
      setTimeout(() => {
        printWindow.print();
      }, 500);

      toast.success('Opening print dialog...', {
        description: 'You can save as PDF from the print dialog',
      });
    } else {
      toast.error('Please allow pop-ups to download the PDF');
    }
  };

  return (
    <div className="space-y-2">
      <Button
        onClick={generatePDF}
        variant="outline"
        className="w-full gap-2 border-dashed"
      >
        <FileText className="h-4 w-4" />
        Print / Save as PDF
      </Button>
      <p className="text-xs text-muted-foreground text-center">
        Download a formatted copy of this obituary
      </p>
    </div>
  );
};

export default PDFDownload;
