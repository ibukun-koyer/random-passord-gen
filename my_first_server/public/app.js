const container = document.querySelectorAll(".container");
for (let contain of container) {
    const newContain = document.createElement("section");
    newContain.classList.add("mainContainer");
    const temp = contain.parentElement;
    newContain.append(contain);
    temp.append(newContain);
}
const wide = document.querySelectorAll(".container-wide");
for (let contain of wide) {
    const newContain = document.createElement("section");
    newContain.classList.add("mainContainer");
    const temp = contain.parentElement;
    newContain.append(contain);
    temp.append(newContain);
}
const post = document.querySelectorAll(".post");
for (let contain of post) {
    const newContain = document.createElement("section");
    newContain.classList.add("mainContainer");
    const temp = contain.parentElement;
    newContain.append(contain);
    temp.append(newContain);
}