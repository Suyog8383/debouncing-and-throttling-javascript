function debonce(func, timeOut = 3000) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeOut);
  };
}

const onUserSearch = debonce((e) => callNetworkApi(e.target.value));

function callNetworkApi(query) {
  fetch(`https://dummyjson.com/products/search?q=${query}`)
    .then((data) => data.json())
    .then((res) => console.log("@SN ", res));
}

const btnSubmit = document.getElementById("btn");
const throttleFun = (func, delay) => {
  let prev = 0;
  return (...args) => {
    let now = new Date().getTime();
    if (now - prev > delay) {
      prev = now;
      return func(...args);
    }
  };
};
btnSubmit.addEventListener(
  "click",
  throttleFun(() => {
    console.log("@SN clicked");
  }, 3000)
);
