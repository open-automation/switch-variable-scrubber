# switch-variable-scrubber
Easily sanitize private data values.

## Flow element properties

### Private data tag
The private data tag of the private data value you want to scrub.

### Scrub type
The type of sanitization you would like to perform on the value.
- **Alphabetic** - Alphabetic characters (a-Z) with spaces.
- **Numeric** - Numeric characters (0-9) with spaces.
- **Alphanumeric** - Alphabetic and numeric characters (a-Z, 0-9) with spaces.
- **URL** - Removes characters that would normally need URL encoding. Essentially the same as Alphanumeric without spaces.
- **Directory** - Removes characters for use in directories and file names. Essentially the same as Alphanumeric, with the addition of underscores and hyphens.

### Replacement character
The character to replace if an invalid character is found. If you just want to remove without replacing, leave this blank.
