using Domain.Core;
using Domain.Identity;

namespace Domain.Picker;

public sealed class PickerUserSession : Entity
{
    public AppUser? User { get; set; } = null;
}