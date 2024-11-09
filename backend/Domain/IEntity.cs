namespace Domain
{
    public interface IEntity
    {
        Guid Id { get; }
        public DateTime CreatedDate { get; set; }
        public string CreatedUser { get; set; }
        public DateTime UpdatedDate { get; set; }
        public string UpdatedUser { get; set; }
        public Guid CompanyId { get; set; }
    }
}
