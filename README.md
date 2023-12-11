# Simple Autofill Extension

Simple Chrome Extension to autofill

## How to Use

1. Open the options page for this extension.
2. Set autofill options.
3. Enjoy.

### Options

#### Debug

|  Option  |                Description                |
| :------: | :---------------------------------------: |
|   None   |          Do not show debug logs           |
| Modeless | Display debug log in the modeless dialog  |
| Console  | Display debug logs in the browser console |
|  Modal   |   Display debug log in the modal dialog   |

#### Autofill

|  Option   |                      Description                       |
| :-------: | :----------------------------------------------------: |
|   Host    |               [URL Filter](#url-filter)                |
|   Path    |               [URL Filter](#url-filter)                |
| Selector  |     CSS selector for the element to be auto-filled     |
| Attribute |                Attribute to be changed                 |
|   Value   |                     Autofill value                     |
|  Timeout  | Maximum search time since the document was loaded (ms) |

#### URL Filter

| Option  |                                              Description                                              |
| :-----: | :---------------------------------------------------------------------------------------------------: |
|   Raw   |                                         Test as plain string                                          |
|  Regex  |                                      Test as regular expression                                       |
| Pattern | Test as glob pattern (using [minimatch](https://github.com/isaacs/minimatch) with dot option enabled) |

## Build

1. `npm install`
2. `npm run build`
