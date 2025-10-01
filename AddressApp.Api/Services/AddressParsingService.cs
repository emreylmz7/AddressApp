using AddressApp.Api.Models;
using System.Text.RegularExpressions;

namespace AddressApp.Api.Services;

public class AddressParsingService
{
    private const string Pattern = @"^(?<region>.+? обл\.), (?<city>.+?), (?<branch>.+?): (?<street>.+?), (?<phone>\+\d+), (?<hours>.+)$";
    private static readonly Regex AddressRegex = new Regex(Pattern, RegexOptions.Compiled);

    public Address Parse(string rawAddress)
    {
        var match = AddressRegex.Match(rawAddress);

        if (!match.Success)
        {
            return null;
        }

        return new Address
        {
            Region = match.Groups["region"].Value.Trim(),
            City = match.Groups["city"].Value.Trim(),
            BranchInfo = match.Groups["branch"].Value.Trim(),
            StreetAddress = match.Groups["street"].Value.Trim(),
            Phone = match.Groups["phone"].Value.Trim(),
            WorkingHours = match.Groups["hours"].Value.Trim()
        };
    }
}
