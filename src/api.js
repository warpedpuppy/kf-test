// .map used to create array with only locations
// removes all duplicates by creating another new array using the spread operator and spreading a Set
// Set will removes all duplicates from array:

export const extractLocations = (events) => {
    var extractLocations = events.map((event) => event.location);
    var locations = [...new Set(extractLocations)];
    return locations;
};