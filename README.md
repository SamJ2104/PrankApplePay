# Apple Pay Prank

Uses a fake apple pay popup to troll people who click on the link.

## Parameters

#### amount
Chooses Amount of Money. Default - £50

#### label
Chooses the message shown above the amount. Default - SamJ

#### iframe
Only on iframe version, chooses iframe src. Default - https://google.com/webhp?igu=1

## Versions

#### Default (Index.html)

https://pay.samj.app/

Displays text that says click anywhere

#### Button

https://pay.samj.app/button

Shows a button saying click me

#### Alert

https://pay.samj.app/alert

Shows an alert saying to double click

#### Iframe

https://pay.samj.app/iframe

Shows an iframe with the src in the "url" parameter (https://pay.samj.app/iframe?url=https://example.com) when clicked, it shows the apple pay pop up.

#### Import as Script

Makes the page the script is imported onto pop-up when clicked

Import the following script and change the parameters

``` <script src="https://pay.samj.app/import.min.js?amount=420&label=example"></script> ```

See unminified js at import.js


