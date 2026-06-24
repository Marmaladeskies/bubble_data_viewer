The default database admin UX in bubble.io is terrible, and using Bubble to build custom tables to manage your database is not much better. Bubble is not great at building tables for data.

This is a very simple, lightweight file that can be opened in any browser to manage your bubble database, just like you're using a webpage. That's it. This is all frontend code and does not require a python server or any setup beyond editing the bubble_data_viewer.html file to define your website, API key, and the name of the data types you want to access.

Features:
- Setup and connect to your database in less than 5 minutes
- Uses 10x less RAM than a bubble editor window in your browser
- Data tables load with columns in the same order every time
- Columns can be reordered and their position can be saved
- No horizontal scroll glitches or bugs
- Better UX for editing data (and type safety is enforced) than anything that can be built in native bubble.

Limitations:
- Option sets are not available from the API and would need to be hardcoded, so editing option sets requires typing out option names exactly correct (or else saving changes will fail with an error message)
- yes/no values display as true/false
- Fields where every value in the database is empty are not returned by the bubble API search and will not appear as columns in tables.

Basic Setup:

- Define the DOMAIN_NAME, API TOKEN, and the name of your bubble.io data types in the 'CONFIGURATION' section.
- The bubble data types must have api permission and each field must have privacy permissions. 
- Columns are populated automatically from the data type's fields. 
- Open this file in any browser and it will automatically connect to your database using the bubble API.

Optional Setup:

- FIELD_NAME_PREFIX and FIELD_NAME_PREFIX_TEST may be used if you want to change the default display order of columns for each data type:
  + This requires a central settings data type (APP_SETTINGS_TYPE) in your Bubble database to store custom column order fields.
  + Bubble does not serve data in the same order for live and test data, and columns that contain no data are not returned by the API, so they may appear in one version but not the other.
  + Separate live and test sort order fields must be created if you want to customize column order for both.
  + Use FIELD_NAME_PREFIX and FIELD_NAME_PREFIX_TEST to define the prefix used for all of the APP_SETTINGS_TYPE sort order field names.
  + Define a field_name_suffix for each data type or the data type's label (lowercased) is added as a suffix to form the name of each field in the APP_SETTINGS_TYPE. 
  + This script assumes that all of your sort order field names in the APP_SETTINGS_TYPE follow the format 'FIELD_NAME_PREFIX field_name_suffix'
        
Example Usage:
     
  - You want to generate tables for the 'Events' and 'Personal Records' data types.
  - You are storing sort order in the data type 'Special Data Constants' that has one row that is never deleted.
  - You created fields 'column order [live] events', 'column order [test] events', 'column order [test] records', and 'column order [live] records' in 'Special Data Constants'

  ~~~js
  const APP_SETTINGS_TYPE = 'specialdataconstants'; // data type that stores custom column orders (lowercase, remove spaces)
  const FIELD_NAME_PREFIX = 'column order [live]';
  const FIELD_NAME_PREFIX_TEST = 'column order [test]';

  // Define your base table configurations
  const baseDataTypes = [
      {
          value: 'events',
          label: 'Events' // no field_name_suffix defined so lowercase label is used by default
      },
      {
          value: 'personalrecords',
          label: 'Personal Records',
          field_name_suffix: 'records' // 'FIELD_NAME_PREFIX field_name_suffix' = 'column order [live] records'
      },
      
      ...
  ~~~
