using Application.Errors;
using Application.Interfaces;
using Domain;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Configuration;
using MimeKit;
using System.Net;

namespace Infrastructure
{
    public class EmailSender : IEmailSender
    {
        private readonly string _emailSender;
        private readonly string _displayName;
        private readonly string _host;
        private readonly int _port;
        private readonly string _password;

        public EmailSender(IConfiguration configuration)
        {
            _emailSender = configuration["EmailSettings:Email"]!;
            _displayName = configuration["EmailSettings:DisplayName"]!;
            _host = configuration["EmailSettings:Host"]!;
            _port = int.Parse(configuration["EmailSettings:Port"]!);
            _password = configuration["EmailSettings:Password"]!;
        }

        public async Task SendMailAsync(MailSettings request)
        {
            string emailSender = request.Email ?? _emailSender;
            string displayName = request.DisplayName ?? _displayName;

            MimeMessage email = new()
            {
                Sender = new MailboxAddress(displayName, emailSender),
                Subject = request.Subject
            };

            email.To.Add(MailboxAddress.Parse(request.ToEmail));

            BodyBuilder emailBody = new()
            {
                HtmlBody = request.Body
            };

            email.Body = emailBody.ToMessageBody();

            using SmtpClient smtpClient = new();

            try
            {
                string host = request.Host ?? _host;
                int port = request.Port ?? _port;
                string password = request.Password ?? _password;

                smtpClient.Connect(host, port, SecureSocketOptions.StartTls);
                smtpClient.Authenticate(emailSender, password);

                await smtpClient.SendAsync(email);

                
            }
            catch (SmtpCommandException ex)
            {
                throw new RestException(HttpStatusCode.BadRequest, new { error = $"SMTP command failed: {ex.Message}" });
            }
            catch (SmtpProtocolException ex)
            {
                throw new RestException(HttpStatusCode.BadRequest, new { error = $"SMTP protocol error: {ex.Message}" });
            }
            catch (Exception ex)
            {
                throw new RestException(HttpStatusCode.BadRequest, new { error = $"Failed to send email: {ex.Message}" });
            }
            finally
            {
                smtpClient.Disconnect(true);
            }
        }
    }
}
