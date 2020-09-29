function changeColor() {
    /*
        Change color scheme to use the following colors:
        Russian Green #658361
        Yellow Green Crayola #D0DD97
        Lavender Blush #EEE8EC
        Russian Violet #470040
        Honey Yellow #FFB845
    */

    document.querySelector("body").style.backgroundColor = "#D0DD97";
    document.querySelector("nav").style.backgroundColor = "#658361";
    document.querySelectorAll("#content, header").forEach(el => el.style.backgroundColor="#EEE8EC")
    document.querySelectorAll("a:hover").forEach(el => el.style.color = "#FFB845");
    document.querySelectorAll("h1, h2, h3, p").forEach(el => el.style.color ="470040");
    document.querySelector("button").style.border = "none";
    document.querySelector("button").style.borderRadius = ".5em";
    document.querySelector("button").style.backgroundColor = "#FFB845";
    document.querySelector("button").style.padding = ".5em 1em";
    document.querySelector("button").style.fontSize = "1.25em";
    document.querySelectorAll("a:visited").forEach(el => el.style.color = "#470040");
    document.querySelectorAll("main a, footer a").forEach(el => el.style.color = "#658361");
    document.querySelectorAll("a:hover").forEach(el => el.style.backgroundColor = "#D0DD97");
    document.querySelectorAll("a:hover").forEach(el => el.style.color = "#D0DD97");
    document.querySelectorAll("footer a:hover").forEach(el => el.style.backgroundColor = "#D0DD97");
    document.querySelectorAll("footer a:hover").forEach(el => el.style.color = "#D0DD97");
}