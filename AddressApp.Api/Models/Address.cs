namespace AddressApp.Api.Models;

public class Address
{
    public int Id { get; set; }
    public string Region { get; set; } 
    public string City { get; set; } 
    public string BranchInfo { get; set; } 
    public string StreetAddress { get; set; } 
    public string Phone { get; set; } 
    public string WorkingHours { get; set; } 
}