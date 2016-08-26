# switch-variable-scrubber
Easily sanitize private data values. 

<img src="https://i.imgur.com/amdb9eR.png" width="500">

This is useful when archiving/injecting files or directories, where your source variable may contain characters not well supported by the filesystem. For example, in the flow above, if I was archiving files in my archive with the pattern "*{job_number}_{customer_name}*" and the customer name in my database was "*J.P. & Son's Barbershop*", it would result in  "*/Live Jobs/123456_J.P. & Son's Barbershop/*". 

Strange things can happen when including special characters within directory names. For example, periods are allowed in most filesystems for directory names, but if you attempt to end a directory name with a period, Switch will replace the period with a bullet character when archiving.

By scrubbing, we can normalize the *{customer_name}* variable before archiving, resulting in the following path: "*/Live Jobs/123456_JP Sons Barbershop/*"

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
