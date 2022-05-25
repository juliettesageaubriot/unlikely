import styles from "./styles.module.scss";

document.body.className = styles.app;

console.log("Hello world!");

let app = document.createElement("div");
app.className = "app";
app.textContent = "My Parcel app!";
root.appendChild(app);
