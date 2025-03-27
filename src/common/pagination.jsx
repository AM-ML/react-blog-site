const filterPaginationData = async ({
  create_new_array = false, current_data, new_data, page, totalDocs
}) => {
  let obj;

  if (current_data != null && !create_new_array) {
    obj = { ...current_data, results: [...(current_data.results), ...new_data], page };
  } else {
      obj = { results: new_data, page: 1, totalDocs };
  }

  return obj;
};

export default filterPaginationData;
