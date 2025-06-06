const formatDate = (timestamp) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  let date = new Date(timestamp);

  return `${date.getDate()} ${months[date.getMonth()]}. ${date.getFullYear()}`;

}

const scrollDown = (px) => {
  window.scrollBy({
    top: px,
    left: 0,
    behaviour: "smooth"
  })
}
export {formatDate, scrollDown};
