# Autocomplete

Yet another autocomplete/typeahead library. Built with accessibility in mind. An
example implementation can be found in the [example](example) folder.

#### AutoComplete API `options`

 `input`\
 The input Element that is going to use autocomplete. This element must have a valid id attribute.
 
 `lookup`\
 This is the function which will return the autocomplete results. A `name` (the lookup keyword)
 argument is provided. Must return a Promise resolving into a list of {name, value}s.
 
 `onSelect`\
 The function to be executed after an autocomplete result has been selected. A `value`
 (the value specified in lookup) argument is provided.
 
 `highlight`\
 Set this option to true for highlighting.
 
 `silent`\
 If set to true, `noResultsMessage` will not be shown. 
 
 `noResultsMessage`\
 The message to be shown when there are no results found.
 
 #### Styling
 Result list container takes 100% width of the parent element, thus the parent
 element needs to be relatively positioned with a certain width.
 
#### License
MIT
