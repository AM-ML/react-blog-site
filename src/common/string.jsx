function TitleCase(str) {
  return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
}

function removeLastName(fullName) {
  // Split the full name into an array of words
  const nameParts = fullName.trim().split(" ");
  
  // If there's only one part, return it as is
  if (nameParts.length <= 1) {
    return fullName;
  }

  // Remove the last part (last name)
  nameParts.pop();

  // Join the remaining parts back into a single string
  return nameParts.join(" ");
}

export {TitleCase, removeLastName};