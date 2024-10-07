using Domain;

namespace Application.Interfaces
{
    public interface IEmailSender
    {
        Task SendMailAsync(MailSettings request);
    }
}
