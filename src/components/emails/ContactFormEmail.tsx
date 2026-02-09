import * as React from 'react';

interface ContactFormEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: Date;
}

export default function ContactFormEmail({
  name,
  email,
  subject,
  message,
  submittedAt,
}: ContactFormEmailProps) {
  const formattedDate = submittedAt.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  });

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>New Contact Form Submission</title>
      </head>
      <body
        style={{
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          backgroundColor: '#f4f4f5',
          margin: 0,
          padding: '40px 20px',
          lineHeight: 1.6,
        }}
      >
        <table
          role="presentation"
          style={{
            maxWidth: '600px',
            margin: '0 auto',
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
          cellPadding="0"
          cellSpacing="0"
          width="100%"
        >
          {/* Header */}
          <tr>
            <td
              style={{
                backgroundColor: '#1e3a5f',
                padding: '32px 40px',
                textAlign: 'center',
              }}
            >
              <h1
                style={{
                  color: '#ffffff',
                  fontSize: '24px',
                  fontWeight: 700,
                  margin: 0,
                  letterSpacing: '-0.5px',
                }}
              >
                Jewish Obits
              </h1>
              <p
                style={{
                  color: '#94a3b8',
                  fontSize: '14px',
                  margin: '8px 0 0 0',
                }}
              >
                New Contact Form Submission
              </p>
            </td>
          </tr>

          {/* Content */}
          <tr>
            <td style={{ padding: '40px' }}>
              {/* Timestamp */}
              <p
                style={{
                  color: '#64748b',
                  fontSize: '13px',
                  margin: '0 0 24px 0',
                  textAlign: 'right',
                }}
              >
                {formattedDate}
              </p>

              {/* Subject */}
              <div
                style={{
                  backgroundColor: '#f8fafc',
                  borderLeft: '4px solid #1e3a5f',
                  padding: '16px 20px',
                  marginBottom: '32px',
                  borderRadius: '0 8px 8px 0',
                }}
              >
                <p
                  style={{
                    color: '#64748b',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    margin: '0 0 4px 0',
                  }}
                >
                  Subject
                </p>
                <p
                  style={{
                    color: '#1e293b',
                    fontSize: '18px',
                    fontWeight: 600,
                    margin: 0,
                  }}
                >
                  {subject}
                </p>
              </div>

              {/* Contact Details */}
              <table
                role="presentation"
                style={{
                  width: '100%',
                  marginBottom: '32px',
                }}
                cellPadding="0"
                cellSpacing="0"
              >
                <tr>
                  <td style={{ paddingBottom: '16px' }}>
                    <p
                      style={{
                        color: '#64748b',
                        fontSize: '12px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        margin: '0 0 4px 0',
                      }}
                    >
                      From
                    </p>
                    <p
                      style={{
                        color: '#1e293b',
                        fontSize: '16px',
                        fontWeight: 500,
                        margin: 0,
                      }}
                    >
                      {name}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p
                      style={{
                        color: '#64748b',
                        fontSize: '12px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        margin: '0 0 4px 0',
                      }}
                    >
                      Email
                    </p>
                    <a
                      href={`mailto:${email}`}
                      style={{
                        color: '#1e3a5f',
                        fontSize: '16px',
                        textDecoration: 'none',
                      }}
                    >
                      {email}
                    </a>
                  </td>
                </tr>
              </table>

              {/* Message */}
              <div>
                <p
                  style={{
                    color: '#64748b',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    margin: '0 0 12px 0',
                  }}
                >
                  Message
                </p>
                <div
                  style={{
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '20px',
                  }}
                >
                  <p
                    style={{
                      color: '#334155',
                      fontSize: '15px',
                      margin: 0,
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                    }}
                  >
                    {message}
                  </p>
                </div>
              </div>

              {/* Reply Button */}
              <div style={{ textAlign: 'center', marginTop: '32px' }}>
                <a
                  href={`mailto:${email}?subject=Re: ${encodeURIComponent(subject)}`}
                  style={{
                    display: 'inline-block',
                    backgroundColor: '#1e3a5f',
                    color: '#ffffff',
                    fontSize: '14px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    padding: '14px 32px',
                    borderRadius: '8px',
                  }}
                >
                  Reply to {name}
                </a>
              </div>
            </td>
          </tr>

          {/* Footer */}
          <tr>
            <td
              style={{
                backgroundColor: '#f8fafc',
                borderTop: '1px solid #e2e8f0',
                padding: '24px 40px',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  color: '#64748b',
                  fontSize: '13px',
                  margin: 0,
                }}
              >
                This email was sent from the contact form on{' '}
                <a
                  href="https://jewishobituary.com"
                  style={{ color: '#1e3a5f', textDecoration: 'none' }}
                >
                  jewishobituary.com
                </a>
              </p>
              <p
                style={{
                  color: '#94a3b8',
                  fontSize: '12px',
                  margin: '8px 0 0 0',
                }}
              >
                You can reply directly to this email to respond to the sender.
              </p>
            </td>
          </tr>
        </table>
      </body>
    </html>
  );
}
