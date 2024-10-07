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
        private readonly IConfiguration _configuration;

        public EmailSender(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendMailAsync(MailSettings request)
        {
            string emailSender = request.Email ?? _configuration["EmailSettings:Email"]!;
            string displayName = request.DisplayName ?? _configuration["EmailSettings:DisplayName"]!;

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
                string host = request.Host ?? _configuration["EmailSettings:Host"]!;
                int port = request.Port ?? int.Parse(_configuration["EmailSettings:Port"]!);
                string password = request.Password ?? _configuration["EmailSettings:Password"]!;

                smtpClient.Connect(host, port, SecureSocketOptions.StartTls);
                smtpClient.Authenticate(emailSender, password);

                await smtpClient.SendAsync(email);

                smtpClient.Disconnect(true);
            }
            catch (Exception)
            {
                throw new RestException(HttpStatusCode.BadRequest, new { error = $"Failed to send email to {request.ToEmail}!" });
            }
        }
    }
}
