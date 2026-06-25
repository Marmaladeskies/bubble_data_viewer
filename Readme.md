The default database admin UX in bubble.io is terrible, and using Bubble to build custom tables to manage your database is not much better. Bubble is not great at building tables for data.

This is a very simple, lightweight file that can be opened in any browser to manage your bubble database, just like you're using a webpage. That's it. This is all frontend code and does not require a python server or any setup beyond editing the bubble_data_viewer.html file to define your website, API key, and the name of the data types you want to access.

Features:
- Setup and connect to your database in less than 5 minutes
- Uses at least 10x less RAM than a bubble editor window in your browser
- Data tables load with columns in the same order every time
- Columns can be reordered and their position can be saved
- No horizontal scroll glitches or bugs
- Better UX for editing data (and type safety is enforced) than anything that can be built in native bubble.
- You have all the code, so adding or making changes to this with your favorite AI is much easier than using bubble

Limitations:
- Search uses bubble's exact keyword search which sucks, the filter has better substring searching but only searches the current page (100 rows). (This could be improved to add pagination caching or even a way to generate a local copy of larger databases to access better search tools.)
- Option sets are not available from the API and would need to be hardcoded. Instead, editing option sets requires typing out option names exactly correct (or else saving changes will fail with an error message)
- yes/no values display as true/false
- Fields where every value in the database is empty are not returned by the bubble API search and will not appear as columns in tables. Therefore it is possible for a completely empty column to appear only in live or test.

Basic Setup:

- Define the DOMAIN_NAME, API TOKEN, and the name of your bubble.io data types in the 'CONFIGURATION' section.
- The bubble data types must have api permission and each field must have privacy permissions. 
- Columns are populated automatically from the data type's fields. 
- Open this file in any browser and it will automatically connect to your database using the bubble API.


Optional Setup:

- If you would like to reorder columns, new fields must be created in your bubble database to store custom column display order data. This requires designating a bubble data type to store these settings under (configured as 'APP_SETTINGS_TYPE') and adding a text list field for each data type that you want to reorder. 
    + To simplify this process start every new text list field name with the same prefix (FIELD_NAME_PREFIX)
    + This script constructs your APP_SETTINGS_TYPE sort order field names using the format 'FIELD_NAME_PREFIX field_name_suffix'
    + You can define custom a 'field_name_suffix' to match your naming convention or this script will use each data type's label (lowercased) as a default suffix
        
Example Usage:
     
  - You want to generate tables for the 'Events' and 'Personal Records' data types.
  - You are storing sort order in the data type 'Special Data Constants' that has one row that is never deleted.
  - You created fields 'column order events' and 'column order records' in 'Special Data Constants'

  ~~~js
  const APP_SETTINGS_TYPE = 'specialdataconstants'; // name (lowercase, remove spaces) of your data type that has fields for storing custom column order
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
          label: 'Events' // no field_name_suffix defined so lowercase label is used by default
      },
      
      ...
  ~~~
