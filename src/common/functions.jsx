import axios from "axios";

const formatDate = (timestamp) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  let date = new Date(timestamp);

  return `${date.getDate()} ${months[date.getMonth()]}. ${date.getFullYear()}`;

}

const updateAccount = (id, access_token, info) => {
  const config = {
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + access_token
    }
  };

  axios.put(import.meta.env.VITE_SERVER_DOMAIN + "/update-account/" + id, info, config)
  .then(({ data }) => {
      console.log(data);
      return data;
    })
  .catch(err => {
      console.log(err)
      return err;
    })
}

export {formatDate, updateAccount};
