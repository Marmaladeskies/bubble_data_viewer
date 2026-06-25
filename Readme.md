The default database admin UX (Data>App Data) in bubble.io editor is terrible, and using Bubble to build admin pages with custom tables to manage your database is not much better. Bubble is not great at building tables for data.

This is a very simple, lightweight file that can be opened in any browser to manage your bubble database, just like you're using a webpage. That's it. This is all frontend code and does not require a python server or any setup beyond editing the bubble_data_viewer.html file to define your website, API key, and the name of the data types you want to access.

Features:
- Setup and connect to your database in less than 5 minutes
- Uses at least 10x less RAM than a bubble editor window in your browser.
- Data tables load with columns in the same order every time
- Columns can be reordered and their position can be saved permanently
- No horizontal scroll glitches or bugs
- Better UX for editing data (and type safety is enforced) than native bubble
- And most importantly, you have all of this code, with no weird front-end limitations, so adding or making changes to this (with your favorite AI) is easier, faster, and more customizable than using bubble

Limitations:
- Search uses bubble's exact keyword search which sucks, the filter has better substring searching but only searches the current page (100 rows). (This could be improved to add pagination caching or even a way to generate a local copy of larger databases to access better search tools.)
- Option sets are not available from the API and would need to be hardcoded. Instead, editing option sets requires typing out option names exactly correct (or else saving changes will fail with an error message)
- yes/no values display as true/false
- If every row of a given field on the page is empty, that field is not returned by the bubble API search and will not appear as a column in tables. Therefore it is possible for a completely empty column to disappear from one page to the next, or when switching from the live database to the test database.
- Table data changes need to be refreshed manually unless you want to add webhooks and a python server to this.


Basic Setup:

- Define the DOMAIN_NAME, API TOKEN (Bubble Settings>API>Admin API Tokens), and the name of your bubble.io data types in the 'CONFIGURATION' section:

~~~javascript
        // --- CONFIGURATION ---
        let VERSION = ''; // Default database to load: test = '/version-test' ; live = ''
        const DOMAIN_NAME = 'yourdomain.com';
        let API_BASE_URL = `https://${DOMAIN_NAME}${VERSION}/api/1.1/obj/`;
        const API_TOKEN = '<your_API_key>';

        // Optional Configuration...
        // Skip this for now...

// Define your base table configurations
        const baseDataTypes = [
            {
                value: 'events', // Name of your bubble data type, but lowercase and no spaces. This must exactly match the value Bubble uses for the API
                label: 'Events',
            },
            {
                value: 'specialdataconstants',
                label: 'Special Data Constants',
            },
            {
                value: 'discountcodes',
                label: 'Discount Codes',
            },
            {
                value: 'personalrecords',
                label: 'Personal Records',
            }
        ];   
~~~

- The bubble data types must have api permission and each field must have privacy permissions. 
- Columns are populated automatically from the data type's fields. 
- Open the bubble_data_viewer.html in any browser and it will automatically connect to your database using the bubble API. It will behave near exactly as if the page was part of your bubble app, but you will not need to login as your API authentication is hardcoded.


Optional Setup:

- If you would like to reorder columns, new fields must be created in your bubble database to store custom column display order data. This requires designating a bubble data type to store these settings under (configured as 'APP_SETTINGS_TYPE') and adding a text list field for each data type that you want to reorder. 
    + To simplify this process start every new text list field name with the same prefix (FIELD_NAME_PREFIX)
    + This script constructs your APP_SETTINGS_TYPE sort order field names using the format 'FIELD_NAME_PREFIX field_name_suffix'
    + You can define custom a 'field_name_suffix' to match your naming convention or this script will use each data type's label (lowercased) as a default suffix
        
Example Usage:
     
  - You want to generate tables for the 'Events' and 'Personal Records' data types.
  - You are storing sort order in the data type 'Special Data Constants' that has one row that is never deleted.
  - You created fields 'column order events' and 'column order records' in 'Special Data Constants'

The following configuration of the bubble_data_viewer.html is all you need to save custom column ordering:
  ~~~js
        // Optional Configuration for storing persisent column order
        let originalHeadersRaw = [];
        const APP_SETTINGS_TYPE = 'specialdataconstants'; // data type that stores custom column data (lowercase, remove spaces)
        const FIELD_NAME_PREFIX = 'column order'; // arbitrary prefix all of the column sorting data field names in your database begin with

        // Define your base table configurations
        const baseDataTypes = [
            {
              value: 'personalrecords', // Lowercase, remove spaces. Must match bubble API
              label: 'Personal Records',
              field_name_suffix: 'records' // 'FIELD_NAME_PREFIX field_name_suffix' = 'column order records'
            },
            {
              value: 'events',
              label: 'Events', // No 'field_name_suffix' defined so lowercase label (including spaces) is used by default
            }
        ];
  ~~~
